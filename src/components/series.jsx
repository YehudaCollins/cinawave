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
    console.log('Fetched Series:', newSeries);
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
      <h1 style={{color:"white", textAlign:"center", fontSize:"xxx-large"}}>series</h1>
      <div className="series-grid">
        {series.map(show => (
          <Link key={show.id} to={`/series/${encodeURIComponent(show.name)}`}>
            <SeriesCard series={show} isInMyList={true} />
          </Link>
        ))}
      </div>
      {!isLoading && (
        <button onClick={loadMore} className="load-more-btn">
          Load More
        </button>
      )}
    </div>
  );
}

export default Series;
