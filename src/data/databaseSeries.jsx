// const apiKey = "3d3bdf59fe98f22449ae9f0c6c3727f6";
// const baseUrl = "https://api.theseriedb.org/3/trending/all/day";

// export const fetchTrendingSeries = async (page) => {
//   const url = `${baseUrl}?api_key=${apiKey}&page=${page}&media_type=tv`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error(`Error fetching series data for page ${page}:`, error);
//     return [];
//   }
// };

// const getAllTrendingSeries = async () => {
//   let allseries = [];
//   let serieIdsSet = new Set();

//   for (let page = 1; page <= 25; page++) {
//     const series = await fetchTrendingSeries(page);

//     const filteredseries = series.filter((serie) => {
//       return serie.original_title && !serieIdsSet.has(serie.id);
//     });

//     filteredseries.forEach((serie) => {
//       serieIdsSet.add(serie.id);
//     });

//     allseries = [...allseries, ...filteredseries];
//   }

//   return allseries;
// };

// getAllTrendingSeries().then((series) => {
//   console.log(
//     "All trending series with original_title, appearing only once:",
//     series,
//   );
// });

// export default getAllTrendingSeries;




//claude
// databaseSeries.jsx

const apiKey = "3d3bdf59fe98f22449ae9f0c6c3727f6";
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
      posterPath: data.poster_path ? `${logoBaseUrl}${data.poster_path}` : null,
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