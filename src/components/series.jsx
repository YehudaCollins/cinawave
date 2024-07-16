// // Series.js
// import React, { useState, useEffect } from "react";
// import Card from "./card"; // Update the import to match your file name
// import { fetchTrendingSeries } from "../data/databaseSeries"; // Import the function to fetch series data

// function Series() {
//   const [trendingSeries, setTrendingSeries] = useState([]);

//   useEffect(() => {
//     const fetchSeries = async () => {
//       try {
//         const series = await getAllTrendingSeries(); // Use the imported function
//         setTrendingSeries(series);
//       } catch (error) {
//         console.error("Error fetching trending series:", error);
//       }
//     };

//     fetchSeries();
//   }, []);

//   return (
//     <div className="main-cards">
//       {trendingSeries.map((serie) => (
//         <Card key={serie.id} serie={serie} />
//       ))}
//     </div>
//   );
// }

// export default Series;







//claude
// series.jsx

// import React, { useState, useEffect } from 'react';
// import getAllTrendingSeries from '../data/databaseSeries';
// import { Link } from 'react-router-dom';
// import SeriesCard from './SeriesCard';  // Assuming you have a Card component

// function Series() {
//   const [series, setSeries] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     fetchSeries();
//   }, []);

//   const fetchSeries = async () => {
//     setIsLoading(true);
//     const newSeries = await getAllTrendingSeries(page);
//     setSeries(prevSeries => [...prevSeries, ...newSeries]);
//     setPage(prevPage => prevPage + 1);
//     setIsLoading(false);
//   };

//   const loadMore = () => {
//     fetchSeries();
//   };

//   if (isLoading && series.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="series-container">
//       <h1>Trending Series</h1>
//       <div className="series-grid">
//         {series.map(show => (
//           <Link key={show.id} to={`/series/${show.id}`}>
//             <SeriesCard
//               title={show.name}
//               image={show.posterPath}
//               releaseYear={new Date(show.firstAirDate).getFullYear()}
//               rating={show.voteAverage}
//             />
//           </Link>
//         ))}
//       </div>
//       {!isLoading && (
//         <button onClick={loadMore} className="load-more-btn">
//           Load More
//         </button>
//       )}
//     </div>
//   );
// }

// export default Series;



import React, { useState, useEffect } from 'react';
import getAllTrendingSeries from '../data/databaseSeries';
import { Link } from 'react-router-dom';
import SeriesCard from './SeriesCard';  

function Series() {
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    setIsLoading(true);
    const newSeries = await getAllTrendingSeries(page);
    console.log("hi")
    console.log('Fetched Series:', newSeries); // Add this line to print the series
    setSeries(prevSeries => [...prevSeries, ...newSeries]);
    setPage(prevPage => prevPage + 1);
    setIsLoading(false);
  };

  const loadMore = () => {
    fetchSeries();
  };

  if (isLoading && series.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="series-container">
      <h2>Series</h2>
      <div className="series-grid">
        {series.map(show => (
          <SeriesCard key={show.id} series={show} />
        ))}
      </div>
    </div>
  );
}

export default Series;
