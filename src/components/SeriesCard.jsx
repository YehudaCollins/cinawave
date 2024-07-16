import React from "react";
import { FaHeart } from "react-icons/fa";
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
            <p className="series-overview">{series.overview ? series.overview.slice(0, 100) : 'No overview available'}...</p>
            <p className="series-seasons">Seasons: {series.number_of_seasons || 'N/A'}</p>
          </div>
        </div>
      </div>
      <div className="likes">
        <FaHeart />
      </div>
      <div className="series-description">
        <div className="main-info-series">
          <div className="rating">
            <FaHeart className="star-icon" />
            <span>{series.vote_average ? series.vote_average.toFixed(1) : 'N/A'}</span>
          </div>
          <div className="year">
            <span>{series.first_air_date ? new Date(series.first_air_date).getFullYear() : 'N/A'}</span>
          </div>
        </div>
        <h2 className="series-name">{series.name || 'No name available'}</h2>
        <div className="genres">
          {series.genres ? series.genres.slice(0, 2).map((genre, index) => (
            <span key={index} className="genre-tag">{genre}</span>
          )) : 'No genres available'}
        </div>
      </div>
    </div>
  );
}

export default SeriesCard;
