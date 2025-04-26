import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MovList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      alert('Please enter a movie title');
      return;
    }
    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=74abab9d`)
      .then(response => response.json())
      .then(data => {
        if (data.Response === 'True') {
          setMovies(data.Search);
          setError('');
        } else {
          setMovies([]);
          setError('No movies found.');
        }
      })
      .catch(() => {
        setMovies([]);
        setError('Error fetching data.');
      });
  };

  return (
    <div className="bg-dark text-white min-vh-100 py-5">
      <div className="container">
        <h2 className="text-center mb-4">MovList Searches 🎬</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter movie title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary mt-2" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="row" id="movieResults">
          {error && <p className="text-warning">{error}</p>}
          {movies.map(movie => (
            <div className="col-md-4 mb-3" key={movie.imdbID}>
              <div className="card text-dark">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x445?text=No+Image'}
                  className="card-img-top"
                  alt={movie.Title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}</h5>
                  <p className="card-text">Year: {movie.Year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovList;