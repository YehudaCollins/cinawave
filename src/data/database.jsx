const apiKey = process.env.REACT_APP_TMDB_API_KEY;
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