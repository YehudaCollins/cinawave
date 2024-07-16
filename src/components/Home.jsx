// import React from "react";
// import { Link } from "react-router-dom";
// import Card from "./card";

// function Home({ filteredMovies, loadMoreMovies, isLoading }) {
//   return (
//     <div className="main-cards">
//       {filteredMovies.map((movie, index) => (
//         <Link
//           key={index}
//           to={`/card/${encodeURIComponent(movie.original_title)}`}
//         >
//           <Card movie={movie} />
//         </Link>
//       ))}
//       <div>
//         <div className="btn-space"></div>
//         <button 
//           className="load-more-btn" 
//           onClick={loadMoreMovies}
//           disabled={isLoading}
//           id="movies"
//         >
//           {isLoading ? 'Loading...' : 'Load More'}
//         </button>
//       </div>
//     </div>
//   );
// }
  
// export default Home;








import React from 'react';
import { Link } from 'react-router-dom';
import Card from './card';

function Home({ filteredMovies,  loadMoreMovies,  isLoading, noResults }) {
  return (
    <div className="main-cards">
      {noResults ? (
        <div className="no-results">No results found</div>
      ) : (
        <>
          {filteredMovies.map((movie, index) => (
            <Link
              key={index}
              to={`/card/${encodeURIComponent(movie.original_title)}`}
            >
              <Card movie={movie} />
            </Link>
          ))}
        </>
      )}
      <div>
        <div className="btn-space"></div>
        {filteredMovies.length > 0 && (
          <button 
            className="load-more-btn" 
            id='movies'
            onClick={loadMoreMovies}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;

