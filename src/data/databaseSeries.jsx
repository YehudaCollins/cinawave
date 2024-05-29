const apiKey = "3d3bdf59fe98f22449ae9f0c6c3727f6";
const baseUrl = "https://api.theseriedb.org/3/trending/all/day";

export const fetchTrendingSeries = async (page) => {
  const url = `${baseUrl}?api_key=${apiKey}&page=${page}&media_type=tv`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching series data for page ${page}:`, error);
    return [];
  }
};

const getAllTrendingSeries = async () => {
  let allseries = [];
  let serieIdsSet = new Set();

  for (let page = 1; page <= 25; page++) {
    const series = await fetchTrendingSeries(page);

    const filteredseries = series.filter((serie) => {
      return serie.original_title && !serieIdsSet.has(serie.id);
    });

    filteredseries.forEach((serie) => {
      serieIdsSet.add(serie.id);
    });

    allseries = [...allseries, ...filteredseries];
  }

  return allseries;
};

getAllTrendingSeries().then((series) => {
  console.log(
    "All trending series with original_title, appearing only once:",
    series,
  );
});

export default getAllTrendingSeries;
