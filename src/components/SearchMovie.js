import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Movie from "./Movie";
import { setMovieName } from "../redux/slices/datatransferslice";
import { getErrorMessage } from "../utils/apiHelper";

export default function SearchMovie() {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [searchTerm, setSearchTerm] = useState("");
  let answer = useSelector((state) => state.transfer.movieName);
  let dispatch = useDispatch();

  const API_KEY = process.env.REACT_APP_API_KEY || "d5689bbae1737c3b9062e710a1909402";

  useEffect(() => {
    setSearchTerm(answer);
  }, [answer]);

  useEffect(() => {
    // Don't search if answer is empty or the default "John Wick"
    if (answer && answer !== "John Wick" && answer.trim() !== "") {
      const searchMovies = async () => {
        setLoading(true);
        setError(null);

        try {
          // CORRECT API URL for searching movies
          const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(answer)}&page=1`;
          console.log("Search URL:", url);

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000);

          const response = await axios.get(url, {
            signal: controller.signal,
            timeout: 15000
          });

          clearTimeout(timeoutId);
          console.log("Search results:", response.data);

          if (response.data.results && response.data.results.length > 0) {
            setData(response.data.results);
            setError(null);
          } else {
            setData([]);
            setError({
              title: "🔍 No Results Found",
              message: `No movies found for "${answer}". Please try a different movie name.`,
              suggestions: [
                "Check the spelling of the movie name",
                "Try using a different movie title",
                "Search for a popular movie like 'Inception' or 'The Dark Knight'",
                "Use fewer words or a shorter title"
              ]
            });
          }

        } catch (err) {
          console.error("Error searching movies:", err);

          let errorType = "UNKNOWN";

          if (err.code === "ECONNABORTED" || err.message.includes("timeout")) {
            errorType = "TIMEOUT";
          } else if (err.message.includes("Network Error")) {
            errorType = "NETWORK";
          }

          const errorMessage = getErrorMessage(errorType);

          if (err.code === "ECONNABORTED" || err.message.includes("timeout")) {
            errorType = "TIMEOUT";
            errorMessage = getErrorMessage("TIMEOUT");
          } else if (err.message.includes("Network Error")) {
            errorType = "NETWORK";
            errorMessage = getErrorMessage("NETWORK");
          } else {
            errorMessage = {
              title: "🔍 Search Failed",
              message: "Unable to search for movies at this time.",
              suggestions: [
                "Check your internet connection",
                "Try using a VPN (TMDB API may be blocked in your region)",
                "Wait a few minutes and try again",
                "Try searching for a different movie"
              ]
            };
          }

          setError(errorMessage);
          setData([]);
        } finally {
          setLoading(false);
        }
      };

      searchMovies();
    } else if (answer === "John Wick") {
      // If "John Wick" is the default, show a message instead of searching
      setError({
        title: "📝 Enter a Movie Name",
        message: "Please enter a movie name to search.",
        suggestions: [
          "Type a movie name in the search box above",
          "Try searching for 'Inception', 'The Dark Knight', or 'Avatar'",
          "Click on any suggested movie button below"
        ]
      });
      setData([]);
      setLoading(false);
    } else if (!answer || answer.trim() === "") {
      setError({
        title: "📝 No Search Query",
        message: "Please enter a movie name to search.",
        suggestions: [
          "Type a movie name in the search box",
          "Try popular movies like 'Inception' or 'Titanic'",
          "Click on any suggested movie button below"
        ]
      });
      setData([]);
      setLoading(false);
    }
  }, [answer, API_KEY]);

  // Function to handle new search from within the page
  const handleNewSearch = (e) => {
    e.preventDefault();
    const input = e.target.searchInput.value;
    if (input && input.trim() !== "") {
      dispatch(setMovieName(input.trim()));
    }
  };

  if (loading) {
    return (
      <div className="container text-center" style={{ padding: "3rem" }}>
        <div className="spinner-border text-danger" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="mt-3">Searching for "{searchTerm}"...</h3>
        <p style={{ color: "var(--text-secondary)", marginTop: "1rem" }}>
          Please wait while we find movies for you...
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="section-header">
        <h1>🔍 Search Movies</h1>
      </div>

      {/* Search Form */}
      <div className="row mb-4">
        <div className="col-md-8 mx-auto">
          <form onSubmit={handleNewSearch} className="d-flex gap-2">
            <input
              type="text"
              name="searchInput"
              className="form-control"
              placeholder="Search for a movie... (e.g., Inception, The Dark Knight)"
              defaultValue={searchTerm}
              style={{
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
                fontSize: "1rem",
                padding: "0.75rem"
              }}
            />
            <button type="submit" className="btn-movie" style={{ width: "auto", padding: "0.75rem 1.5rem" }}>
              🔍 Search
            </button>
          </form>
        </div>
      </div>

      {/* Error Display with VPN/Network Message */}
      {error ? (
        <div className="text-center" style={{ padding: "2rem" }}>
          <div style={{
            background: "var(--bg-card)",
            borderRadius: "16px",
            padding: "2rem",
            maxWidth: "600px",
            margin: "0 auto",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow)"
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
              {error.title?.includes("No Results") ? "🔍" : error.title?.includes("Enter") ? "📝" : "🌐"}
            </div>
            <h3 style={{ color: "#e50914", marginBottom: "1rem" }}>
              {error.title || "Connection Issue"}
            </h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", lineHeight: "1.6" }}>
              {error.message || "Unable to search for movies. Please check your connection."}
            </p>

            {/* Troubleshooting Box */}
            <div style={{
              background: "rgba(229, 9, 20, 0.1)",
              padding: "1.5rem",
              borderRadius: "12px",
              marginBottom: "1.5rem",
              textAlign: "left"
            }}>
              <h4 style={{ fontSize: "1rem", marginBottom: "0.75rem", color: "#e50914", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>💡</span> Troubleshooting Tips:
              </h4>
              <ul style={{ color: "var(--text-secondary)", fontSize: "0.9rem", paddingLeft: "1.2rem", margin: 0 }}>
                {(error.suggestions || [
                  "Check your internet connection",
                  "Try using a VPN (Jio/Airtel users may need this)",
                  "Wait a few moments and try again",
                  "Try searching for a different movie"
                ]).map((suggestion, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>{suggestion}</li>
                ))}
                <li style={{ marginTop: "0.5rem", color: "#e50914" }}>
                  🔹 <strong>Note:</strong> TMDB API may be blocked on some Indian networks (Jio/Airtel/Vi). Using a VPN solves this.
                </li>
              </ul>
            </div>

            {/* Suggested Movies */}
            <div className="mt-3">
              <p style={{ color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
                Try searching for:
              </p>
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                {["Inception", "The Dark Knight", "Avatar", "Titanic", "Gladiator", "Interstellar", "John Wick", "The Matrix"].map((movie) => (
                  <button
                    key={movie}
                    onClick={() => dispatch(setMovieName(movie))}
                    className="btn-movie"
                    style={{ width: "auto", padding: "0.5rem 1rem", fontSize: "0.85rem" }}
                  >
                    {movie}
                  </button>
                ))}
              </div>
            </div>

            {/* Retry Button */}
            <button
              onClick={() => window.location.reload()}
              className="btn-movie"
              style={{
                width: "auto",
                padding: "0.75rem 1.5rem",
                marginTop: "1.5rem",
                background: "#666",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              🔄 Refresh Page
            </button>
          </div>
        </div>
      ) : data.length === 0 && !loading ? (
        <div className="text-center" style={{ padding: "3rem" }}>
          <p>No movies found. Try searching for something else!</p>
          <div className="d-flex flex-wrap gap-2 justify-content-center mt-3">
            {["Inception", "The Dark Knight", "Avatar", "Titanic", "Gladiator"].map((movie) => (
              <button
                key={movie}
                onClick={() => dispatch(setMovieName(movie))}
                className="btn-movie"
                style={{ width: "auto", padding: "0.5rem 1rem", fontSize: "0.9rem" }}
              >
                {movie}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
            Found {data.length} movie{data.length !== 1 ? 's' : ''} matching your search
          </p>
          <div className="row">
            <Movie record={data} />
          </div>
        </>
      )}
    </div>
  );
}
