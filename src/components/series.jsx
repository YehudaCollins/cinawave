import React, { useState, useEffect, useCallback  } from 'react';
import getAllTrendingSeries from '../data/databaseSeries';
import { Link } from 'react-router-dom';
import SeriesCard from './SeriesCard';  

function Series() {
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   fetchSeries();
  // }, []);

  // const fetchSeries = async () => {
  //   setIsLoading(true);
  //   const newSeries = await getAllTrendingSeries(page);
  //   console.log('Fetched Series:', newSeries);
  //   setSeries(prevSeries => [...prevSeries, ...newSeries]);
  //   setPage(prevPage => prevPage + 1);
  //   setIsLoading(false);
  // };

  const fetchSeries = useCallback(async () => {
    setIsLoading(true);
    const newSeries = await getAllTrendingSeries(page);
    console.log('Fetched Series:', newSeries);
    setSeries(prevSeries => [...prevSeries, ...newSeries]);
    setPage(prevPage => prevPage + 1);
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    console.log('Series component mounted');
    fetchSeries();
  }, [fetchSeries]);

  const loadMore = () => {
    fetchSeries();
  };

  if (isLoading && series.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-cards">
        {series.map((show) => (
          <Link 
            key={show.id} 
            to={`/series/${encodeURIComponent(show.name)}`}
          >
            <SeriesCard series={show} isInMyList={true} />
          </Link>
        ))}
      <div>
        <div className="btn-space"></div>
            <button onClick={loadMore} className="load-more-btn">
            {isLoading ? 'Loading...' : 'Load More'}
            </button>
        </div>
  </div>
  );
}

export default Series;
