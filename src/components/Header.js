import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router";
import { setMovieName } from "../redux/slices/datatransferslice";
import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon, FaFilm } from "react-icons/fa";

function Header() {
  let dispatch = useDispatch();
  let x1 = useRef();
  let navigate = useNavigate();
  let location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  function myfunction() {
    if (x1.current.value && x1.current.value.trim() !== "") {
      dispatch(setMovieName(x1.current.value));
      navigate("/search");
      x1.current.value = "";
    } else {
      alert("Please Enter a Movie Name");
    }
  }

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <FaFilm style={{ marginRight: "8px" }} />
          CineScope
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/")}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/upcoming")}`} to="/upcoming">
                Upcoming Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/popular")}`} to="/popular">
                Popular Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/toprated")}`} to="/toprated">
                Top-Rated Movies
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search movies..."
              aria-label="Search"
              ref={x1}
            />
            <button className="btn btn-outline-success" type="submit" onClick={myfunction}>
              Search
            </button>
          </form>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? <FaSun color="#ffd700" /> : <FaMoon color="#e50914" />}
            <span>{isDark ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;