import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ErrorBoundary from "./../ErrorBoundary";
import ApiError from "./ApiError";
import { checkAPIAccessibility, getErrorMessage } from "../utils/apiHelper";

export default function SingleMovie() {
  let { id } = useParams();
  let [info, setInfo] = useState(null);
  let [cast, setCast] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);
  let [showAllCast, setShowAllCast] = useState(false);
  let [apiAccessible, setApiAccessible] = useState(null);

  const API_KEY = process.env.REACT_APP_API_KEY || "d5689bbae1737c3b9062e710a1909402";

  // Check API accessibility on component mount
  useEffect(() => {
    const checkApi = async () => {
      const result = await checkAPIAccessibility();
      setApiAccessible(result);

      if (!result.accessible) {
        const errorMsg = getErrorMessage(result.error);
        setError(errorMsg);
        setLoading(false);
      }
    };

    checkApi();
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [id]);

  useEffect(() => {
    if (!id || (apiAccessible && !apiAccessible.accessible)) {
      return;
    }

    if (apiAccessible === null) return;

    setLoading(true);
    setError(null);

    let api1 = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
    let api2 = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;

    const fetchMovieDetails = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await axios.get(api1, {
          signal: controller.signal,
          timeout: 15000
        });

        clearTimeout(timeoutId);
        setInfo(response.data);

      } catch (err) {
        console.error("Error fetching movie details:", err);

        let errorType = "UNKNOWN";
        if (err.code === "ECONNABORTED" || err.message.includes("timeout")) {
          errorType = "TIMEOUT";
        } else if (err.message.includes("Network Error")) {
          errorType = "NETWORK";
        }

        const errorMsg = getErrorMessage(errorType);
        setError(errorMsg);
      }
    };

    const fetchCast = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await axios.get(api2, {
          signal: controller.signal,
          timeout: 15000
        });

        clearTimeout(timeoutId);
        setCast(response.data.cast);

      } catch (err) {
        console.error("Error fetching cast:", err);
        setCast([]);
      }
    };

    Promise.all([fetchMovieDetails(), fetchCast()]).finally(() => {
      setLoading(false);
    });
  }, [id, apiAccessible, API_KEY]);

  const displayedCast = showAllCast ? cast : cast.slice(0, 12);

  // Show API accessibility error
  if (error && !loading) {
    return (
      <ApiError
        error={error}
        onRetry={() => window.location.reload()}
        onGoHome={() => window.location.href = '/'}
      />
    );
  }

  if (loading) {
    return (
      <div className="container text-center" style={{ padding: "4rem" }}>
        <div className="spinner-border text-danger" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="mt-3">Loading movie details...</h3>
        <p style={{ color: "var(--text-secondary)", marginTop: "1rem" }}>
          This may take a few moments...
        </p>
      </div>
    );
  }

  if (!info) {
    return (
      <ApiError
        error={getErrorMessage("UNKNOWN")}
        onRetry={() => window.location.reload()}
        onGoHome={() => window.location.href = '/'}
      />
    );
  }

  return (
    <div className="container">
      {/* Movie Poster and Overview Section */}
      <div className="row my-4">
        <div className="col-md-4 text-center mb-4 mb-md-0">
          <div style={{
            background: "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)",
            borderRadius: "16px",
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "450px"
          }}>
            {info.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
                alt={info.title}
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div style="text-align:center; padding:2rem;">🎬<br />Poster Not Available</div>';
                }}
              />
            ) : (
              <div style={{
                textAlign: "center",
                color: "var(--text-secondary)",
                padding: "2rem"
              }}>
                🎬<br />
                No Poster Available
              </div>
            )}
          </div>
        </div>

        <div className="col-md-8">
          <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "1rem", color: "var(--text-primary)" }}>
            {info.title}
          </h1>

          {info.tagline && (
            <p style={{ fontStyle: "italic", color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: "1rem" }}>
              "{info.tagline}"
            </p>
          )}

          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <span className="rating-badge">⭐ {info.vote_average ? info.vote_average.toFixed(1) : "N/A"}/10</span>
            {info.release_date && <span className="rating-badge">📅 {new Date(info.release_date).getFullYear()}</span>}
            {info.runtime && <span className="rating-badge">⏱️ {info.runtime} min</span>}
            {info.vote_count && <span className="rating-badge">👍 {info.vote_count.toLocaleString()} votes</span>}
            {info.status && <span className="rating-badge">🎬 {info.status}</span>}
          </div>

          <h3 style={{ marginTop: "1rem", color: "#e50914", fontSize: "1.5rem", fontWeight: "600" }}>Overview</h3>
          <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-secondary)" }}>
            {info.overview || "No overview available."}
          </p>

          <div style={{ marginTop: "1.5rem" }}>
            {info.genres && info.genres.length > 0 && (
              <div style={{ marginBottom: "0.75rem" }}>
                <strong style={{ color: "var(--text-primary)", fontSize: "1rem" }}>Genres:</strong>{' '}
                <span style={{ color: "var(--text-secondary)" }}>
                  {info.genres.map(g => g.name).join(", ")}
                </span>
              </div>
            )}
            {info.production_companies && info.production_companies.length > 0 && (
              <div style={{ marginBottom: "0.75rem" }}>
                <strong style={{ color: "var(--text-primary)", fontSize: "1rem" }}>Production:</strong>{' '}
                <span style={{ color: "var(--text-secondary)" }}>
                  {info.production_companies.slice(0, 3).map(c => c.name).join(", ")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {cast.length > 0 ? (
        <>
          <div style={{ marginTop: "4rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
            <div className="section-header">
              <h1 style={{ fontSize: "2rem", fontWeight: "700" }}>🎭 Cast & Crew ({cast.length} actors)</h1>
            </div>
            {cast.length > 12 && (
              <button
                onClick={() => setShowAllCast(!showAllCast)}
                className="btn-movie"
                style={{ width: "auto", padding: "0.5rem 1.5rem", fontSize: "0.9rem" }}
              >
                {showAllCast ? "Show Less" : `Show All ${cast.length} Cast Members`}
              </button>
            )}
          </div>

          <div className="row">
            {displayedCast.map((actor) => (
              <div className="col-lg-2 col-md-3 col-sm-4 col-6 cast-card" key={actor.cast_id || actor.id}>
                <ErrorBoundary>
                  {actor.profile_path ? (
                    <img
                      className="cast-image"
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="cast-placeholder"><div>🎭<br />No Image</div></div>';
                      }}
                    />
                  ) : (
                    <div className="cast-placeholder">
                      <div>
                        🎭<br />
                        No Image
                      </div>
                    </div>
                  )}
                </ErrorBoundary>
                <h4 className="cast-name">{actor.name}</h4>
                <p className="cast-character">as {actor.character}</p>
              </div>
            ))}
          </div>

          {!showAllCast && cast.length > 12 && (
            <div style={{ textAlign: "center", marginTop: "2rem", marginBottom: "2rem" }}>
              <p style={{ color: "var(--text-secondary)" }}>
                And {cast.length - 12} more actors... Click "Show All" to see the complete cast.
              </p>
            </div>
          )}
        </>
      ) : (
        <div style={{ marginTop: "4rem", textAlign: "center" }}>
          <p style={{ color: "var(--text-secondary)" }}>No cast information available.</p>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "3rem", marginBottom: "2rem" }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="btn-movie"
          style={{ width: "auto", padding: "0.75rem 2rem", display: "inline-block" }}
        >
          ↑ Back to Top
        </button>
      </div>
    </div>
  );
}
