import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NotFoundPage from "./components/NotFound";
import getAllTrendingMovies from "./data/database";
import getAllTrendingSeries from "./data/databaseSeries"; 
import Top from "./components/top";
import Home from "./components/Home";
import MyList from "./components/myList";
import InsideCard from "./components/insideCard";
import Series from "./components/series";
import SeriesCard from "./components/SeriesCard";
import InsideSeriesCard from "./components/InsideSeriesCard";
import "./style/App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [series, setSeries] = useState([]); // Add state for series
  const [filteredSeries, setFilteredSeries] = useState([]); // Add state for filtered series
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 
    fetchMovies(3); //כמות דפים למשיכה בעת טעינה ראשונית 
    fetchSeries(3); // Fetch series data
  }, []);

  const fetchMovies = async (pagesToFetch = 1) => {
    setIsLoading(true);
    let newMovies = [];
    for (let i = 0; i < pagesToFetch; i++) {
      const movies = await getAllTrendingMovies(currentPage + i);
      newMovies = [...newMovies, ...movies];
    }
    setMovies(prevMovies => [...prevMovies, ...newMovies]);
    setFilteredMovies(prevMovies => [...prevMovies, ...newMovies]);
    setCurrentPage(prevPage => prevPage + pagesToFetch);
    setIsLoading(false);
  };

  const fetchSeries = async (pagesToFetch = 1) => {
    setIsLoading(true);
    let newSeries = [];
    for (let i = 0; i < pagesToFetch; i++) {
      const series = await getAllTrendingSeries(currentPage + i);
      newSeries = [...newSeries, ...series];
    }
    setSeries(prevSeries => [...prevSeries, ...newSeries]);
    setFilteredSeries(prevSeries => [...prevSeries, ...newSeries]);
    setCurrentPage(prevPage => prevPage + pagesToFetch);
    setIsLoading(false);
  };

  // const handleSearch = (searchQuery) => {
  //   if (searchQuery.trim() === "") {
  //     setFilteredMovies(movies);
  //   } else {
  //     const filtered = movies.filter(
  //       (movie) =>
  //         movie.original_title &&
  //         movie.original_title
  //           .toLowerCase()
  //           .includes(searchQuery.toLowerCase())
  //     );
  //     setFilteredMovies(filtered);
  //   }
  // };

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim() === "") {
      setFilteredMovies(movies);
      setFilteredSeries(series); // Add this to reset series
    } else {
      const filtered = movies.filter(
        (movie) =>
          movie.original_title &&
          movie.original_title
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filtered);

      const filteredSeries = series.filter(
        (serie) =>
          serie.name &&
          serie.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredSeries(filteredSeries); // Add this to filter series
    }
  };

  const loadMoreMovies = () => {
    fetchMovies(5);
  };

  const loadMoreSeries = () => {
    fetchSeries(5);
  };

  return (
    <Router>
      <div className="Main">
        <Top onSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                filteredMovies={filteredMovies}
                loadMoreMovies={loadMoreMovies}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/card/:insideCard"
            element={<InsideCard filteredMovies={filteredMovies} />}
          />
          <Route
            path="/my-list"
            element={<MyList filteredMovies={filteredMovies} />}
          />
          <Route path="/series" element={<Series />} />
          <Route
            path="/series/:insideSeriesCard"
            element={<InsideSeriesCard filteredSeries={filteredSeries}  />} // New route
          />
          {/* <Route path="/SeriesCard" element={<SeriesCard />} /> */}
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;