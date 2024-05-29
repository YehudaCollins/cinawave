import React, { useEffect, useState } from "react";
import Card from "./card";
import { Link } from "react-router-dom";
import "../style/MyList.css";


function MyList({ filteredMovies }) {
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    const storedLikedMovies =
      JSON.parse(localStorage.getItem("likedMovies")) || [];
    const availableLikedMovies = storedLikedMovies.filter((movie) =>
      filteredMovies.some(
        (filteredMovie) =>
          filteredMovie.original_title === movie.original_title,
      ),
    );
    setLikedMovies(availableLikedMovies);
  }, [filteredMovies]);

  if (likedMovies.length === 0) {
    return <div className="Movie-not-found">No liked movies found</div>;
  }

  return (
    <div className="main-cards">
      {likedMovies.map((movie, index) => (
        <Link
          key={index}
          to={`/card/${encodeURIComponent(movie.original_title)}`}
        >
          <Card movie={movie} />
        </Link>
      ))}
    </div>
  );
}

export default MyList;
