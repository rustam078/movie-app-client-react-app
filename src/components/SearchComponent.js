import React, { useState } from "react";
import styles from "./SearchComponents.module.css";

const SearchComponent = (props) => {
  const [searchParams, setSearchParams] = useState({
    actor: "",
    year: "",
    rating: "",
    movietype: "",
    language: "",
  });

  const handleInputChange = (field, value) => {
    setSearchParams({
      ...searchParams,
      [field]: value,
    });
  };

  const handleSearch = () => {
    console.log(searchParams);
    // Construct the URL with searchParams and make the GET request
    const apiUrl = `http://localhost:9190/search`;
    fetch(apiUrl, {
      method: "POST", // Assuming it's a POST request based on @RequestBody
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchParams),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
        props.onSearch(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.btns}>
        <label>Actor:</label>
        <input
          type="text"
          value={searchParams.actor}
          placeholder="enter actor name..."
          onChange={(e) => handleInputChange("actor", e.target.value)}
        />
      </div>

      <div className={styles.btns}>
        <label>Year:</label>
        <div className={styles.btns}>
          <select
            value={searchParams.year}
            onChange={(e) => handleInputChange("year", e.target.value)}
          >
            <option value="">Select Year</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>

      <div className={styles.btns}>
        <label>Rating:</label>
        <input
          type="text"
          value={searchParams.rating}
          placeholder="enter rating btn 1-5"
          onChange={(e) => handleInputChange("rating", e.target.value)}
        />
      </div>

      <div className={styles.btns}>
        <label>Movietype:</label>
        <div className={styles.btns}>
          <select
            value={searchParams.movietype}
            onChange={(e) => handleInputChange("movietype", e.target.value)}
          >
            <option value="">Select Movietype</option>
            <option value="Hollywood">Hollywood</option>
            <option value="Bollywood">Bollywood</option>
          </select>
        </div>
      </div>

      <div className={styles.btns}>
        <label>Language:</label>
        <div className={styles.btns}>
          <select
            value={searchParams.language}
            onChange={(e) => handleInputChange("language", e.target.value)}
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
      </div>

      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
