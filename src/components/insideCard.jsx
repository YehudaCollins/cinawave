import React, { useState, useEffect, memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay,faPlus,faCircle,faCheck,} from "@fortawesome/free-solid-svg-icons";
import "../style/insideCard.css";

const apiKey = "3d3bdf59fe98f22449ae9f0c6c3727f6";
const baseUrl = "https://api.themoviedb.org/3/";

const fetchMovieTrailer = async (movieId) => {
  const url = `${baseUrl}movie/${movieId}/videos?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
      return data.results[0].key;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching movie trailer:", error);
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

const InsideCard = memo(
  ({ filteredMovies }) => {
    const [liked, setLiked] = useState(false);
    const [trailerKey, setTrailerKey] = useState(null);
    const [showFullText, setShowFullText] = useState(false); // State to track whether to show full text
    const { insideCard } = useParams();
    const selectedMovie = filteredMovies.find(
      (movie) => movie.original_title === decodeURIComponent(insideCard),
    );

    const fetchMovieTrailerMemoized = useCallback(async (movieId) => {
      const key = await fetchMovieTrailer(movieId);
      setTrailerKey(key);
    }, []);

    useEffect(() => {
      console.log("Selected movie:", selectedMovie);
      if (selectedMovie) {
        const likedMovies =
          JSON.parse(localStorage.getItem("likedMovies")) || [];
        const isLiked = likedMovies.some(
          (movie) => movie.original_title === selectedMovie.original_title,
        );
        setLiked(isLiked);

        fetchMovieTrailerMemoized(selectedMovie.id);
      }
    }, [selectedMovie, fetchMovieTrailerMemoized]);

    const toggleLike = () => {
      setLiked(!liked);
      const likedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
      if (!liked) {
        localStorage.setItem(
          "likedMovies",
          JSON.stringify([...likedMovies, selectedMovie]),
        );
      } else {
        const updatedLikedMovies = likedMovies.filter(
          (movie) => movie.original_title !== selectedMovie.original_title,
        );
        localStorage.setItem("likedMovies", JSON.stringify(updatedLikedMovies));
      }
    };

    if (!selectedMovie) {
      console.log("Movie not found for title:", insideCard);
      return <div className="Movie-not-found">Movie not found</div>;
    }

    const backgroundImageStyle = {
      backgroundImage: `url(https://image.tmdb.org/t/p/w500/${selectedMovie.backdropUrl})`,
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

    const movieLength = selectedMovie.runtime;
    const formattedLength = movieLength
      ? `${Math.floor(movieLength / 60)}h ${movieLength % 60}m`
      : "";

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
                src={selectedMovie.logo}
                alt={selectedMovie.original_title}
              />
            </div>
            <div className="movie-inside-description">
              <div className="mis-year">{selectedMovie.releaseYear}</div>
              <div className="circle-inside">
                <FontAwesomeIcon icon={faCircle} />
              </div>
              <div className="mis-length">{formattedLength}</div>
              <div className="circle-inside">
                <FontAwesomeIcon icon={faCircle} />
              </div>
              <div className="mis-Language">
                {selectedMovie.original_language}
              </div>
            </div>
            <div className="movie-inside-genre">
              {selectedMovie.genres.map((genre, index) => (
                <div key={index} className="genre">
                  {genre}
                </div>
              ))}
            </div>
            <div className="text-description">
              {showFullText
                ? selectedMovie.overview
                : truncateOverview(selectedMovie.overview, 100)}
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
    return prevProps.filteredMovies === nextProps.filteredMovies;
  },
);

export default InsideCard;
