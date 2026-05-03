import React, { useEffect, useState } from "react";
import axios from "axios";
import Movie from "./Movie";
import { FaStar, FaFire, FaFilm, FaSearch, FaGlasses } from "react-icons/fa";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const API_KEY = process.env.REACT_APP_API_KEY || "d5689bbae1737c3b9062e710a1909402";

  useEffect(() => {
    // Fetch Popular Movies
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => setPopularMovies(response.data.results.slice(0, 4)))
      .catch((error) => console.log(error));

    // Fetch Upcoming Movies
    axios
      .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => setUpcomingMovies(response.data.results.slice(0, 4)))
      .catch((error) => console.log(error));

    // Fetch Top Rated Movies
    axios
      .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => setTopRatedMovies(response.data.results.slice(0, 4)))
      .catch((error) => console.log(error));
  }, [API_KEY]);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <FaFilm size={60} color="#e50914" />
          </div>
          <h1 className="hero-title">CineScope</h1>
          <p className="hero-subtitle" style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.5rem" }}>
            PURE DISCOVERY
          </p>
          <p className="hero-subtitle">
            Your ultimate destination for discovering movies. Explore upcoming releases,
            popular hits, and top-rated classics.
          </p>
        </div>
        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--bg-card)", padding: "0.75rem 1.5rem", borderRadius: "50px", boxShadow: "var(--shadow)" }}>
            <FaFilm color="#e50914" />
            <span>Latest Movies</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--bg-card)", padding: "0.75rem 1.5rem", borderRadius: "50px", boxShadow: "var(--shadow)" }}>
            <FaStar color="#ffd700" />
            <span>Top Ratings</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--bg-card)", padding: "0.75rem 1.5rem", borderRadius: "50px", boxShadow: "var(--shadow)" }}>
            <FaFire color="#e50914" />
            <span>Trending Now</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--bg-card)", padding: "0.75rem 1.5rem", borderRadius: "50px", boxShadow: "var(--shadow)" }}>
            <FaSearch color="#4caf50" />
            <span>Easy Search</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--bg-card)", padding: "0.75rem 1.5rem", borderRadius: "50px", boxShadow: "var(--shadow)" }}>
            <FaGlasses color="#2196f3" />
            <span>No Downloads</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="section-header">
          <h1>🎬 Upcoming Movies</h1>
        </div>
        <div className="row">
          <Movie record={upcomingMovies} />
        </div>

        <div className="section-header">
          <h1>🔥 Popular Movies</h1>
        </div>
        <div className="row">
          <Movie record={popularMovies} />
        </div>

        <div className="section-header">
          <h1>⭐ Top Rated Movies</h1>
        </div>
        <div className="row">
          <Movie record={topRatedMovies} />
        </div>
      </div>
    </div>
  );
}
