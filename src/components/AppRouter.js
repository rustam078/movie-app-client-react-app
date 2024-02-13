// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Change 'Switch' to 'Routes'
import Home from './Home';
import ViewAllMovies from './ViewAllMovies';
import Header from './Header';
import { useState } from 'react';

const AppRouter = () => {
  const [movies, setMovies] = useState([]);
  const updatemovie=(movies)=>{
    setMovies(movies);
  }
  return (
    <Router>
          <Header updatemovie={updatemovie} />
      <Routes>
        <Route path="/" element={<Home  data={movies}/>} />
        <Route path="/view" element={<ViewAllMovies />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
