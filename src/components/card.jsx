import React from "react";
import { FaHeart } from "react-icons/fa";
import "../style/card.css";


function Card({ movie, isInMyList }) {
  // console.log('isInMyList:', isInMyList);
  return (
    <div className="cards">
      <div className="img-card">
        <img
          className="movie-img"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      {/* <div className="likes"> <FaHeart /> </div> */}
      {isInMyList && (
        <div className="likes">
          <FaHeart />
        </div>
      )}
      <div className="movie-description">
        <div className="main-info-movie">
          <div className="cube-info">
            <h1 className="cube-text">{movie.vote_average.toFixed(1)}</h1>
          </div>
          <div className="cube-info">
            <h1 className="cube-text">{movie.releaseYear}</h1>
          </div>
        </div>
        <h1 className="movie-name">{movie.title}</h1>
      </div>
    </div>
  );
}

export default Card;
