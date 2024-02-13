// CreateMovie.js
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './CreateMovie.module.css';

const CreateMovie = ({ onSave }) => {
  const [movie, setMovie] = useState({
    moviename: '',
    actor: '',
    year: '',
    rating: '',
    movietype: '',
    language: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    // Handle file input changes if needed
  };

  const handleRatingChange = (e) => {
    const { value } = e.target;
    setMovie((prevMovie) => ({
      ...prevMovie,
      rating: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      // Append movie details to the FormData
      Object.entries(movie).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append the file to the FormData
      formData.append('file', e.target.file.files[0]);

      // Make a POST request to the server
      const response = await fetch('http://localhost:9190/save', {
        method: 'POST',
        body: formData,
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Perform any additional logic after successful save if needed
        console.log('Movie saved successfully');
        toast.success('Movie added successfully');
        // You can reset the form or perform any other actions as needed
        setMovie({
          moviename: '',
          actor: '',
          year: '',
          rating: '',
          movietype: '',
          language: '',
        });
      } else {
        // Handle errors
        console.error('Error saving movie:', response.statusText);
        toast.error('Failed to add movie');
      }
    } catch (error) {
      console.error('Error saving movie:', error.message);
      toast.error('Failed to add movie');
    }
  };

  return (
    <div className={`${styles.movieContainer} container`}>
      <form className={styles.movieForm} onSubmit={handleSubmit}>
        <label className={styles.labfield}>
          <p className={styles.textstyle}>
          Movie Name:
          </p>
          <input type="text" name="moviename" value={movie.moviename} onChange={handleChange} />
        </label>
        <label className={styles.labfield}>
        <p className={styles.textstyle}>
          Actor:
          </p>
          <input type="text" name="actor" value={movie.actor} onChange={handleChange} />
        </label>
        <label className={styles.labfield}>
        <p className={styles.textstyle}>
          Year:
          </p>
          <input type="text" name="year" value={movie.year} onChange={handleChange} />
        </label>
        <label className={styles.labfield}>
        <p className={styles.textstyle}>
          Rating:
          </p>
          <div className={styles.radiobtn}>
            <label>
              <input
                type="radio"
                name="rating"
                value="1"
                checked={movie.rating === '1'}
                onChange={handleRatingChange}
              />
              1
            </label>
            <label>
              <input
                type="radio"
                name="rating"
                value="2"
                checked={movie.rating === '2'}
                onChange={handleRatingChange}
              />
              2
            </label>
            <label>
              <input
                type="radio"
                name="rating"
                value="3"
                checked={movie.rating === '3'}
                onChange={handleRatingChange}
              />
              3
            </label>
            <label>
              <input
                type="radio"
                name="rating"
                value="4"
                checked={movie.rating === '4'}
                onChange={handleRatingChange}
              />
              4
            </label>
            <label>
              <input
                type="radio"
                name="rating"
                value="5"
                checked={movie.rating === '5'}
                onChange={handleRatingChange}
              />
              5
            </label>
          </div>
        </label>
        <label className={styles.labfield}>
        <p className={styles.textstyle}>
          Movie Type:
          </p>
          <select name="movietype" value={movie.movietype} onChange={handleChange}>
            <option value="">Select Movie Type</option>
            <option value="Bollywood">Bollywood</option>
            <option value="Hollywood">Hollywood</option>
            {/* Add more options as needed */}
          </select>
        </label>

        <label className={styles.labfield}>
        <p className={styles.textstyle}>
          Language:
          </p>
          <select name="language" value={movie.language} onChange={handleChange}>
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            {/* Add more options as needed */}
          </select>
        </label>
        <label className={styles.labfield}>
        <p className={styles.textstyle}>
          Image:
          </p>
          <input type="file" name="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Save Movie</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateMovie;
