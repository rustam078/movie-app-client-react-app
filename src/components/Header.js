import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Header.module.css";
import NotificationComponent from "./NotificationComponent";
import { NavLink, useLocation } from "react-router-dom"; // Import NavLink from react-router-dom

const isActive = (path, location) => {
  return location.pathname === path;
};

const Header = (props) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9190/search?name=${query}`
      );
      setSearchResults(response.data);
      upcast(searchResults);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    handleSearch();
  };

  const upcast = (movie) => {
    props.updatemovie(movie);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      // Check if click occurred outside the search container
      if (!e.target.closest(`.${styles.searchContainer}`)) {
        setSearchResults([]); // Clear search results
      }
    };

    // Add event listener to detect clicks outside search container
    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      // Cleanup event listener
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []); // Run only once when component mounts

  return (
    <div className={styles.header}>
      <h1>Movies Application</h1>
      <div className={styles.nav}>
        <div className={styles.navgrid}>
          <NavLink
            exact="true"
            to="/"
            style={
              isActive("/", location)
                ? {
                    color: "#9afb61",
                    fontWeight: "bold",
                    borderLeft: "1px solid white",
                  }
                : {}
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/view"
            style={
              isActive("/view", location)
                ? {
                    color: "#9afb61",
                    fontWeight: "bold",
                    borderLeft: "1px solid white",
                  }
                : {}
            }
          >
            Live Stream
          </NavLink>
        </div>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search Movies"
            value={query}
            onChange={handleChange}
          />
          {query && searchResults && searchResults.length > 0 && (
            <ul className={styles.searchResults}>
              {searchResults.map((movie) => (
                <li key={movie.id} onClick={() => upcast(movie)}>
                  {movie.moviename}
                </li>
              ))}
            </ul>
          )}
        </div>
        <NotificationComponent message="This is a notification message!" />
      </div>
    </div>
  );
};

export default Header;
