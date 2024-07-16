import React from "react";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/SeriesCard.css";

function SeriesCard({ series }) {
  return (
    <div className="series-card">
      <div className="img-container">
        <img
          className="series-img"
          src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`}
          alt={series.name}
        />
        <div className="overlay">
          <div className="series-info">
            <p className="series-overview">{series.overview.slice(0, 100)}...</p>
            <p className="series-seasons">Seasons: {series.number_of_seasons}</p>
          </div>
        </div>
      </div>
      <div className="likes">
        <FontAwesomeIcon icon={faHeart} />
      </div>
      <div className="series-description">
        <div className="main-info-series">
          <div className="rating">
            <FontAwesomeIcon icon={faStar} className="star-icon" />
            <span>{series.vote_average.toFixed(1)}</span>
          </div>
          <div className="year">
            <span>{new Date(series.first_air_date).getFullYear()}</span>
          </div>
        </div>
        <h2 className="series-name">{series.name}</h2>
        <div className="genres">
          {series.genres.slice(0, 2).map((genre, index) => (
            <span key={index} className="genre-tag">{genre}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SeriesCard;