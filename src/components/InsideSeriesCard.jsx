import React, { useState, useEffect, memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus, faCircle, faCheck } from "@fortawesome/free-solid-svg-icons";
import "../style/insideCard.css"; // שימוש באותו קובץ CSS

const apiKey = "3d3bdf59fe98f22449ae9f0c6c3727f6";
const baseUrl = "https://api.themoviedb.org/3/";

const fetchSeriesTrailer = async (seriesId) => {
  const url = `${baseUrl}tv/${seriesId}/videos?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
      return data.results[0].key;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching series trailer:", error);
    return null;
  }
};

const truncateOverview = (overview, maxLength) => {
  if (overview.length > maxLength) {
    return overview.substring(0, maxLength) + "...";
  } else {
    return overview;
  }
};

const InsideSeriesCard = memo(({ filteredSeries }) => {
  const [liked, setLiked] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showFullText, setShowFullText] = useState(false);
  const { insideSeriesCard } = useParams();
  const selectedSeries = filteredSeries.find(
    (series) => series.name === decodeURIComponent(insideSeriesCard)
  );

  const fetchSeriesTrailerMemoized = useCallback(async (seriesId) => {
    const key = await fetchSeriesTrailer(seriesId);
    setTrailerKey(key);
  }, []);

  useEffect(() => {
    console.log("Selected series:", selectedSeries);
    if (selectedSeries) {
      const likedSeries =
        JSON.parse(localStorage.getItem("likedSeries")) || [];
      const isLiked = likedSeries.some(
        (series) => series.name === selectedSeries.name
      );
      setLiked(isLiked);

      fetchSeriesTrailerMemoized(selectedSeries.id);
    }
  }, [selectedSeries, fetchSeriesTrailerMemoized]);

  const toggleLike = () => {
    setLiked(!liked);
    const likedSeries = JSON.parse(localStorage.getItem("likedSeries")) || [];
    if (!liked) {
      localStorage.setItem(
        "likedSeries",
        JSON.stringify([...likedSeries, selectedSeries])
      );
    } else {
      const updatedLikedSeries = likedSeries.filter(
        (series) => series.name !== selectedSeries.name
      );
      localStorage.setItem("likedSeries", JSON.stringify(updatedLikedSeries));
    }
  };

  if (!selectedSeries) {
    console.log("Series not found for name:", insideSeriesCard);
    return <div className="Movie-not-found">Series not found</div>;
  }

  const backgroundImageStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${selectedSeries.poster_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    boxShadow:
      "inset 500px 0 400px -50px rgba(0, 0, 0, 1), inset 0 -300px 200px -50px rgba(0, 0, 0, 1)",
  };

  const trailerURL = trailerKey
    ? `https://www.youtube.com/watch?v=${trailerKey}`
    : null;

  return (
    <div className="insideCard">
      <div style={backgroundImageStyle}></div>
      <div className="top-inside">
        <div className="inside-info">
          <div className="movie-inside-logo-div">
          <img
                className="movie-inside-logo"
                src={selectedSeries.logo}
                alt={selectedSeries.original_title}
              />
          </div>
          <div className="movie-inside-description">
            <div className="mis-year">{selectedSeries.first_air_date ? new Date(selectedSeries.first_air_date).getFullYear() : 'N/A'}</div>
            <div className="circle-inside">
              <FontAwesomeIcon icon={faCircle} />
            </div>
            <div className="mis-seasons">{selectedSeries.number_of_seasons ? `${selectedSeries.number_of_seasons} Seasons` : 'N/A'}</div>
            <div className="circle-inside">
              <FontAwesomeIcon icon={faCircle} />
            </div>
            <div className="mis-Language">
              {selectedSeries.original_language}
            </div>
          </div>
          <div className="movie-inside-genre">
            {selectedSeries.genres.map((genre, index) => (
              <div key={index} className="genre">
                {genre}
              </div>
            ))}
          </div>
          <div className="text-description">
            {showFullText
              ? selectedSeries.overview
              : truncateOverview(selectedSeries.overview, 100)}
            <button
              className="button-More-less"
              onClick={() => setShowFullText(!showFullText)}
            >
              {showFullText ? "Show Less" : "Show More"}
            </button>
          </div>
          <div className="movie-inside-buttons">
            <div className="mib-bt-div">
              {trailerURL && (
                <a
                  href={trailerURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="mib-play-btn">
                    <plBt>
                      <FontAwesomeIcon icon={faPlay} />
                    </plBt>
                    <txt>Watch Trailer</txt>
                  </button>
                </a>
              )}
            </div>
            <div>
              <button className="add-favorite-btn" onClick={toggleLike}>
                <div className="like">
                  <FontAwesomeIcon icon={liked ? faCheck : faPlus} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
},
(prevProps, nextProps) => {
  return prevProps.filteredSeries === nextProps.filteredSeries;
});

export default InsideSeriesCard;
