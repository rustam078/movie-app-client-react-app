import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import SearchComponent from "./SearchComponent";

const Home = (props) => {
  const [movies, setMovies] = useState([]);
  const [first,setFirst]=useState(false);
  const [last,setLast]=useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElement, setTotalElement] = useState(0);
  const [isVertical, setIsVertical] = useState(false);

  const toggleVertical = () => {
    setIsVertical(!isVertical);
  };

  const movieGridClasses = `${styles.movieGrid} ${isVertical ? styles.displayvertical : ''}`;

  useEffect(() => {
    // Fetch movies from the API based on current page and page size
   if(props.data.length){
    setMovies(props.data);
   }else{
     fetchMovies();
   }
  }, [page, pageSize,props.data, setMovies]);

  const fetchMovies = () => {
    if (props.data.moviename) {
      const moviesArray = [props.data];
      setMovies(moviesArray);
    } else {
    axios
      .get(`http://localhost:9190/all?page=${page}&size=${pageSize}`)
      .then((response) => {
        const { content, totalPages,first,last,totalElements } = response.data;
        console.log(response.data);
        setTotalElement(totalElements);
        setFirst(first);
        setLast(last);
        setMovies(content);
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
    }
  };
console.log("home call... "+movies)
  const StarRating = ({ rating }) => {
    const maxRating = 5; // Maximum rating value
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 !== 0; // Check if there's a half star

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>&#9733;</span>); // Full star
    }

    if (hasHalfStar) {
      stars.push(<span key="half">&#9733;&#189;</span>); // Half star
    }

    const remainingStars = maxRating - (fullStars + (hasHalfStar ? 1 : 0));

    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={i + fullStars + (hasHalfStar ? 1 : 0)}>&#9734;</span>
      ); // Empty star
    }

    return <div className="star-rating">{stars}</div>;
  };

  const handleSearch = (searchParams) => {
    setMovies(searchParams);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
  };

  return (
    <>
      <SearchComponent onSearch={handleSearch} />

      <div className={movieGridClasses}>
        {Array.isArray(movies) &&
          movies.map((movie) => (
            <div key={movie.id} className={styles.movieCard}>
              <img
                src={`http://localhost:9190/images/${movie.imagename}`}
                alt={movie.imagename}
                className={styles.poster}
              />
              <h3 className={styles.name}>{movie.moviename}</h3>
              <div className={styles.msg}>
                <div>Actor: {movie.actor}</div>
                <div>Language: {movie.language}</div>
                <div>Movie Type: {movie.movietype}</div>
                <div style={{ display: "flex" }}>
                  Rating: <StarRating rating={movie.rating} />
                </div>
                <div>Year: {movie.year}</div>
              </div>
            </div>
          ))}
      </div>

      <div className={styles.pagination}>
        <div className={styles.row1}>
        <button onClick={toggleVertical} className={styles.button}>
        {isVertical ? 'Toggle Horizontal' : 'Toggle Vertical'}
      </button>
      <p>Total Movies : {totalElement}</p>
        </div>
        <div className={styles.row2}>
        <button
    onClick={handlePrevPage}
    disabled={first} // Disable the Previous button if it's the first page
    className={`${styles.button} ${first ? styles.disabled : ''}`} // Add styles based on the disabled state
  >
    Previous
  </button>
  <button
    onClick={handleNextPage}
    disabled={last} // Disable the Next button if it's the last page
    className={`${styles.button} ${last ? styles.disabled : ''}`} // Add styles based on the disabled state
  >
    Next
  </button>
  <span>Page:</span>
  <select value={page} onChange={(e) => setPage(parseInt(e.target.value))}>
    {Array.from({ length: totalPages }, (_, index) => (
      <option key={index} value={index}>{index + 1}</option>
    ))}
  </select>
  <span>of {totalPages}</span>
  <span> | Results per page:</span>
  <select value={pageSize} onChange={handlePageSizeChange}>
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="20">20</option>
  </select>
  </div>
</div>

    </>
  );
};

export default Home;
