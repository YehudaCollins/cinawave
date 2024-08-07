import React from "react";
import { FaHeart } from "react-icons/fa"; // Updated to match card.jsx
import "../style/card.css"; // Using the same CSS as card.css

function SeriesCard({ series, isInMyList }) { // Added isInMyList to match card.jsx
  return (
    <div className="cards"> {/* Using the same class name as card.jsx */}
      <div className="img-card">
          <img
            className="movie-img" // Using the same class name as card.jsx
            src={`https://image.tmdb.org/t/p/w500/${series.poster_path}`}
            alt={series.name}
          />
     </div>
      {isInMyList && (
        <div className="likes">
          <FaHeart />
        </div>
      )}
      <div className="movie-description">
        <div className="main-info-movie"> 
          <div className="cube-info">
            <h1 className="cube-text">{series.vote_average ? series.vote_average.toFixed(1) : 'N/A'}</h1>
          </div>
          <div className="cube-info">
            <h1 className="cube-text">{series.first_air_date ? new Date(series.first_air_date).getFullYear() : 'N/A'}</h1>
          </div>
        </div>
        <h1 className="movie-name">{series.name || 'No name available'}</h1>
      </div>
    </div>
  );
}

export default SeriesCard;
