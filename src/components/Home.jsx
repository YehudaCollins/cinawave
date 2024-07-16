import React from "react";
import Card from "./card";
import { Link } from "react-router-dom";

function Home({ filteredMovies, loadMoreMovies, isLoading }) {
    return (
      <div className="main-cards">
        {filteredMovies.map((movie) => (
          <Link
            key={movie.id}
            to={`/card/${encodeURIComponent(movie.original_title)}`}
          >
            <Card movie={movie} />
          </Link>
        ))}
        <div>
          <div className="btn-space"></div>
          <button 
            className="load-more-btn" 
            onClick={loadMoreMovies}
            disabled={isLoading}
            id="movies"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      </div>
    );
  }
  
  export default Home;