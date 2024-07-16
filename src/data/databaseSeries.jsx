const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const baseUrl = "https://api.themoviedb.org/3/";
const logoBaseUrl = "https://image.tmdb.org/t/p/original";

const fetchTrendingSeries = async (page = 1) => {
  const url = `${baseUrl}trending/tv/week?api_key=${apiKey}&page=${page}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending series:", error);
    return [];
  }
};

const fetchSeriesDetails = async (seriesId) => {
  const url = `${baseUrl}tv/${seriesId}?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      overview: data.overview,
      poster_path: data.poster_path ? data.poster_path : null,
      // posterPath: data.poster_path ? `${logoBaseUrl}${data.poster_path}` : null,
      firstAirDate: data.first_air_date,
      voteAverage: data.vote_average,
      numberOfSeasons: data.number_of_seasons,
      genres: data.genres.map(genre => genre.name),
    };
  } catch (error) {
    console.error("Error fetching series details:", error);
    return null;
  }
};

const getAllTrendingSeries = async (page = 1) => {
  const series = await fetchTrendingSeries(page);
  const seriesDetailsPromises = series.map(show => fetchSeriesDetails(show.id));
  const seriesDetails = await Promise.all(seriesDetailsPromises);
  return seriesDetails.filter(show => show !== null);
};

export default getAllTrendingSeries;