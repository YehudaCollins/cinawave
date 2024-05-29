// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Card from "./card";
// import InsideCard from "./insideCard";
// import getAllTrendingMovies from "./database";
// import MyList from "./myList";
// import Top from "./top";
// import "./App.css";
// import "./top.css";
// import "./card.css";
// import "./insideCard.css";
// import "./MyList.css";

// function App() {
//   const [originalMovies, setOriginalMovies] = useState([]);
//   const [filteredMovies, setFilteredMovies] = useState([]);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       const result = await getAllTrendingMovies();
//       setOriginalMovies(result);
//       setFilteredMovies(result);
//     };

//     fetchMovies();
//   }, []);

//   const handleSearch = (searchQuery) => {
//     console.log("Search query:", searchQuery);

//     if (!originalMovies || !Array.isArray(originalMovies)) {
//       return;
//     }

//     if (searchQuery.trim() === "") {
//       setFilteredMovies(originalMovies);
//     } else {
//       const filtered = originalMovies.filter(
//         (movie) =>
//           movie.original_title &&
//           movie.original_title
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase()),
//       );
//       console.log("Filtered movies:", filtered);
//       setFilteredMovies(filtered);
//     }
//   };

//   return (
//     <Router>
//       <div className="Main">
//         <Top onSearch={handleSearch} />
//         <Routes>
//           <Route path="/" element={<Home filteredMovies={filteredMovies} />} />
//           <Route
//             path="/card/:insideCard"
//             element={<InsideCard filteredMovies={filteredMovies} />}
//           />
//           <Route
//             path="/my-list"
//             element={<MyList filteredMovies={filteredMovies} />}
//           />
//           <Route path="/series" element={<Series />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// function Series() {
//   return <h2>This is the Series page</h2>;
// }

// function Home({ filteredMovies }) {
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
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Card from "./components/card";
import InsideCard from "./components/insideCard";
import getAllTrendingMovies from "./data/database";
import MyList from "./components/myList";
import Top from "./components/top";
import "./style/App.css";
import NotFoundPage from "./components/NotFound";

function App() {
  const [originalMovies, setOriginalMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [remainingMovies, setRemainingMovies] = useState([]);
  const [initialLoadCount] = useState(72); // Initial number of movies to display

  useEffect(() => {
    const fetchMovies = async () => {
      const result = await getAllTrendingMovies();
      setOriginalMovies(result);
      setFilteredMovies(result);
      setDisplayedMovies(result.slice(0, initialLoadCount));
      setRemainingMovies(result.slice(initialLoadCount));
    };
    fetchMovies();
  }, [initialLoadCount]);

  const handleSearch = (searchQuery) => {
    console.log("Search query:", searchQuery);

    if (!originalMovies || !Array.isArray(originalMovies)) {
      return;
    }

    if (searchQuery.trim() === "") {
      setFilteredMovies(originalMovies);
      setDisplayedMovies(originalMovies.slice(0, initialLoadCount));
      setRemainingMovies(originalMovies.slice(initialLoadCount));
    } else {
      const filtered = originalMovies.filter(
        (movie) =>
          movie.original_title &&
          movie.original_title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
      console.log("Filtered movies:", filtered);
      setFilteredMovies(filtered);
      setDisplayedMovies(filtered.slice(0, initialLoadCount));
      setRemainingMovies(filtered.slice(initialLoadCount));
    }
  };

  const loadMoreMovies = () => {
    const nextBatch = remainingMovies.slice(0, initialLoadCount);
    setDisplayedMovies((prevMovies) => [...prevMovies, ...nextBatch]);
    setRemainingMovies((prevRemaining) =>
      prevRemaining.slice(initialLoadCount),
    );
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
                displayedMovies={displayedMovies}
                remainingMovies={remainingMovies}
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
          <Route path="*" element={<NotFoundPage/>} />

        </Routes>
      </div>
    </Router>
  );
}

function Series() {
  return <h2>This is the Series page</h2>;
}

function Home({
  filteredMovies,
  loadMoreMovies,
  displayedMovies,
  remainingMovies,
}) {
  return (
    <div className="main-cards">
      {displayedMovies.map((movie, index) => (
        <Link
          key={index}
          to={`/card/${encodeURIComponent(movie.original_title)}`}
        >
          <Card movie={movie} />
        </Link>
      ))}
      {remainingMovies.length > 0 && (
        <div>
          <div className="btn-space"></div>
          <button className="load-more-btn" onClick={loadMoreMovies}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
