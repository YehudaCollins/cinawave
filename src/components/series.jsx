// Series.js
import React, { useState, useEffect } from "react";
import Card from "./card"; // Update the import to match your file name
import { fetchTrendingSeries } from "../data/databaseSeries"; // Import the function to fetch series data

function Series() {
  const [trendingSeries, setTrendingSeries] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const series = await getAllTrendingSeries(); // Use the imported function
        setTrendingSeries(series);
      } catch (error) {
        console.error("Error fetching trending series:", error);
      }
    };

    fetchSeries();
  }, []);

  return (
    <div className="main-cards">
      {trendingSeries.map((serie) => (
        <Card key={serie.id} serie={serie} />
      ))}
    </div>
  );
}

export default Series;
