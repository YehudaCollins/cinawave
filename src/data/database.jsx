// const apiKey = "3d3bdf59fe98f22449ae9f0c6c3727f6";
// const baseUrl = "https://api.themoviedb.org/3/";
// const logoBaseUrl = "https://image.tmdb.org/t/p/original";

// const fetchTrendingMovies = async (page) => {
//   const url = `${baseUrl}trending/all/day?api_key=${apiKey}&page=${page}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error(`Error fetching data for page ${page}:`, error);
//     return [];
//   }
// };

// const getAllTrendingMovies = async () => {
//   let allMovies = [];
//   let movieIdsSet = new Set();

//   for (let page = 1; page <= 15; page++) {
//     const movies = await fetchTrendingMovies(page);

//     const filteredMovies = movies.filter((movie) => {
//       return movie.original_title && !movieIdsSet.has(movie.id);
//     });

//     filteredMovies.forEach((movie) => {
//       movieIdsSet.add(movie.id);
//     });

//     allMovies = [...allMovies, ...filteredMovies];
//   }

//   const movieDetailsPromises = allMovies.map((movie) =>
//     fetchMovieDetails(movie.original_title),
//   );
//   const movieDetails = await Promise.all(movieDetailsPromises);

//   allMovies.forEach((movie, index) => {
//     movie.logo = movieDetails[index].logo;
//     movie.runtime = movieDetails[index].runtime;
//     movie.backdropUrl = movieDetails[index].backdropUrl;
//     movie.releaseYear = movieDetails[index].releaseYear;
//     movie.genres = movieDetails[index].genres;
//     movie.shorterOverview = truncateOverview(movieDetails[index].overview, 100);
//   });

//   return allMovies;
// };

// const fetchMovieDetails = async (title) => {
//   const url = `${baseUrl}search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     if (data.results.length > 0) {
//       const movieId = data.results[0].id;
//       const movieDetailsResponse = await fetch(
//         `${baseUrl}movie/${movieId}?api_key=${apiKey}`,
//       );
//       const movieDetailsData = await movieDetailsResponse.json();

//       const genresResponse = await fetch(
//         `${baseUrl}movie/${movieId}?api_key=${apiKey}&append_to_response=genres`,
//       );
//       const genresData = await genresResponse.json();
//       const genres = genresData.genres.map((genre) => genre.name);

//       const runtimeResponse = await fetch(
//         `${baseUrl}movie/${movieId}?api_key=${apiKey}&append_to_response=credits`,
//       );
//       const runtimeData = await runtimeResponse.json();
//       const runtime = runtimeData.runtime;

//       const backdropUrl = movieDetailsData.backdrop_path
//         ? `${logoBaseUrl}${movieDetailsData.backdrop_path}`
//         : null;

//       const shorterDescriptionResponse = await fetch(
//         `${baseUrl}movie/${movieId}?api_key=${apiKey}&language=en-US`,
//       );
//       const shorterDescriptionData = await shorterDescriptionResponse.json();
//       const shorterOverview = shorterDescriptionData.overview; 

//       return {
//         logo: await fetchMovieLogo(movieId),
//         releaseYear: movieDetailsData.release_date
//           ? new Date(movieDetailsData.release_date).getFullYear()
//           : null,
//         runtime: runtime,
//         backdropUrl: backdropUrl,
//         genres: genres, 
//         overview: movieDetailsData.overview,
//         shorterOverview: truncateOverview(shorterOverview, 100), 
//       };
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching movie details:", error);
//     return null;
//   }
// };

// const truncateOverview = (overview, maxLength) => {
//   if (overview.length > maxLength) {
//     return overview.substring(0, maxLength) + "...";
//   } else {
//     return overview;
//   }
// };

// const fetchMovieLogo = async (movieId) => {
//   const url = `${baseUrl}movie/${movieId}/images?api_key=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     if (data.logos.length > 0) {
//       return `${logoBaseUrl}${data.logos[0].file_path}`;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching movie logo:", error);
//     return null;
//   }
// };

// getAllTrendingMovies().then((movies) => {
//   console.log(
//     "All trending movies with original_title, appearing only once:",
//     movies,
//   );
// });

// export default getAllTrendingMovies;



//זה עובד
// const apiKey = "3d3bdf59fe98f22449ae9f0c6c3727f6";
// const baseUrl = "https://api.themoviedb.org/3/";
// const logoBaseUrl = "https://image.tmdb.org/t/p/original";

// const fetchTrendingMovies = async (page) => {
//   const url = `${baseUrl}trending/all/day?api_key=${apiKey}&page=${page}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error(`Error fetching data for page ${page}:`, error);
//     return [];
//   }
// };

// const getAllTrendingMovies = async () => {
//   let allMovies = [];
//   let movieIdsSet = new Set();

//   for (let page = 1; page <= 15; page++) {
//     const movies = await fetchTrendingMovies(page);

//     const filteredMovies = movies.filter((movie) => {
//       return movie.original_title && !movieIdsSet.has(movie.id);
//     });

//     filteredMovies.forEach((movie) => {
//       movieIdsSet.add(movie.id);
//     });

//     allMovies = [...allMovies, ...filteredMovies];
//   }

//   const movieDetailsPromises = allMovies.map((movie) =>
//     fetchMovieDetails(movie.original_title)
//   );
//   let movieDetails = await Promise.all(movieDetailsPromises);

//   // Filter out null details and ensure alignment between movieDetails and allMovies
//   movieDetails = movieDetails.map((details, index) => (details ? { details, index } : null)).filter(item => item !== null);

//   // Update allMovies and movieDetails to be in sync
//   allMovies = movieDetails.map(item => allMovies[item.index]);
//   movieDetails = movieDetails.map(item => item.details);

//   allMovies.forEach((movie, index) => {
//     movie.logo = movieDetails[index].logo;
//     movie.runtime = movieDetails[index].runtime;
//     movie.backdropUrl = movieDetails[index].backdropUrl;
//     movie.releaseYear = movieDetails[index].releaseYear;
//     movie.genres = movieDetails[index].genres;
//     movie.shorterOverview = truncateOverview(movieDetails[index].overview, 100);
//   });

//   return allMovies;
// };

// const fetchMovieDetails = async (title) => {
//   const url = `${baseUrl}search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     if (data.results.length > 0) {
//       const movieId = data.results[0].id;
//       const movieDetailsResponse = await fetch(
//         `${baseUrl}movie/${movieId}?api_key=${apiKey}`
//       );
//       const movieDetailsData = await movieDetailsResponse.json();

//       const genres = movieDetailsData.genres.map((genre) => genre.name);

//       const backdropUrl = movieDetailsData.backdrop_path
//         ? `${logoBaseUrl}${movieDetailsData.backdrop_path}`
//         : null;

//       return {
//         logo: await fetchMovieLogo(movieId),
//         releaseYear: movieDetailsData.release_date
//           ? new Date(movieDetailsData.release_date).getFullYear()
//           : null,
//         runtime: movieDetailsData.runtime,
//         backdropUrl: backdropUrl,
//         genres: genres,
//         overview: movieDetailsData.overview,
//         shorterOverview: truncateOverview(movieDetailsData.overview, 100),
//       };
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching movie details:", error);
//     return null;
//   }
// };

// const truncateOverview = (overview, maxLength) => {
//   if (overview.length > maxLength) {
//     return overview.substring(0, maxLength) + "...";
//   } else {
//     return overview;
//   }
// };

// const fetchMovieLogo = async (movieId) => {
//   const url = `${baseUrl}movie/${movieId}/images?api_key=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     if (data.logos.length > 0) {
//       return `${logoBaseUrl}${data.logos[0].file_path}`;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching movie logo:", error);
//     return null;
//   }
// };

// getAllTrendingMovies().then((movies) => {
//   console.log(
//     "All trending movies with original_title, appearing only once:",
//     movies
//   );
// });

// export default getAllTrendingMovies;













//claude optimized
// const apiKey = "3d3bdf59fe98f22449ae9f0c6c3727f6";
// const baseUrl = "https://api.themoviedb.org/3/";
// const logoBaseUrl = "https://image.tmdb.org/t/p/original";

// // Use Promise.all to fetch multiple pages concurrently
// const fetchTrendingMovies = async (pages) => {
//   const requests = pages.map(page => 
//     fetch(`${baseUrl}trending/all/day?api_key=${apiKey}&page=${page}`)
//       .then(response => response.json())
//       .then(data => data.results)
//       .catch(error => {
//         console.error(`Error fetching data for page ${page}:`, error);
//         return [];
//       })
//   );
//   return Promise.all(requests).then(results => results.flat());
// };

// const getAllTrendingMovies = async () => {
//   const pages = Array.from({length: 15}, (_, i) => i + 1);
//   const allMovies = await fetchTrendingMovies(pages);
  
//   const movieIdsSet = new Set();
//   const filteredMovies = allMovies.filter(movie => {
//     if (movie.original_title && !movieIdsSet.has(movie.id)) {
//       movieIdsSet.add(movie.id);
//       return true;
//     }
//     return false;
//   });

//   const movieDetailsPromises = filteredMovies.map(movie => 
//     fetchMovieDetails(movie.original_title, movie.id)
//   );
//   const movieDetails = await Promise.all(movieDetailsPromises);

//   return filteredMovies.map((movie, index) => ({
//     ...movie,
//     ...movieDetails[index]
//   })).filter(movie => movie.logo);
// };

// const fetchMovieDetails = async (title, movieId) => {
//   try {
//     const [movieDetailsResponse, movieImagesResponse] = await Promise.all([
//       fetch(`${baseUrl}movie/${movieId}?api_key=${apiKey}`),
//       fetch(`${baseUrl}movie/${movieId}/images?api_key=${apiKey}`)
//     ]);

//     const [movieDetailsData, movieImagesData] = await Promise.all([
//       movieDetailsResponse.json(),
//       movieImagesResponse.json()
//     ]);

//     const logo = movieImagesData.logos.length > 0 ? 
//       `${logoBaseUrl}${movieImagesData.logos[0].file_path}` : null;

//     return {
//       logo,
//       releaseYear: movieDetailsData.release_date ? 
//         new Date(movieDetailsData.release_date).getFullYear() : null,
//       runtime: movieDetailsData.runtime,
//       backdropUrl: movieDetailsData.backdrop_path ? 
//         `${logoBaseUrl}${movieDetailsData.backdrop_path}` : null,
//       genres: movieDetailsData.genres.map(genre => genre.name),
//       overview: movieDetailsData.overview,
//       shorterOverview: truncateOverview(movieDetailsData.overview, 100)
//     };
//   } catch (error) {
//     console.error("Error fetching movie details:", error);
//     return null;
//   }
// };

// const truncateOverview = (overview, maxLength) => 
//   overview.length > maxLength ? `${overview.substring(0, maxLength)}...` : overview;

// getAllTrendingMovies().then(movies => {
//   console.log("All trending movies with original_title, appearing only once:", movies);
// });

// export default getAllTrendingMovies;












const apiKey = "3d3bdf59fe98f22449ae9f0c6c3727f6";
const baseUrl = "https://api.themoviedb.org/3/";
const logoBaseUrl = "https://image.tmdb.org/t/p/original";

// Use Promise.all to fetch multiple pages concurrently
const fetchTrendingMovies = async (page) => {
  const url = `${baseUrl}trending/all/day?api_key=${apiKey}&page=${page}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching data for page ${page}:`, error);
    return [];
  }
};

const getAllTrendingMovies = async (page = 1) => {
  const movies = await fetchTrendingMovies(page);
  
  const movieIdsSet = new Set();
  const filteredMovies = movies.filter(movie => {
    if (movie.original_title && !movieIdsSet.has(movie.id)) {
      movieIdsSet.add(movie.id);
      return true;
    }
    return false;
  });

  const movieDetailsPromises = filteredMovies.map(movie => 
    fetchMovieDetails(movie.original_title, movie.id)
  );
  const movieDetails = await Promise.all(movieDetailsPromises);

  return filteredMovies.map((movie, index) => ({
    ...movie,
    ...movieDetails[index]
  })).filter(movie => movie.logo);
};

const fetchMovieDetails = async (title, movieId) => {
  try {
    const [movieDetailsResponse, movieImagesResponse] = await Promise.all([
      fetch(`${baseUrl}movie/${movieId}?api_key=${apiKey}`),
      fetch(`${baseUrl}movie/${movieId}/images?api_key=${apiKey}`)
    ]);

    const [movieDetailsData, movieImagesData] = await Promise.all([
      movieDetailsResponse.json(),
      movieImagesResponse.json()
    ]);

    const logo = movieImagesData.logos.length > 0 ? 
      `${logoBaseUrl}${movieImagesData.logos[0].file_path}` : null;

    return {
      logo,
      releaseYear: movieDetailsData.release_date ? 
        new Date(movieDetailsData.release_date).getFullYear() : null,
      runtime: movieDetailsData.runtime,
      backdropUrl: movieDetailsData.backdrop_path ? 
        `${logoBaseUrl}${movieDetailsData.backdrop_path}` : null,
      genres: movieDetailsData.genres.map(genre => genre.name),
      overview: movieDetailsData.overview,
      shorterOverview: truncateOverview(movieDetailsData.overview, 100)
    };
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

const truncateOverview = (overview, maxLength) => 
  overview.length > maxLength ? `${overview.substring(0, maxLength)}...` : overview;

getAllTrendingMovies().then(movies => {
  console.log("All trending movies with original_title, appearing only once:", movies);
});

export default getAllTrendingMovies;