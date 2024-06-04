import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const API_KEY = 'e039325f'; 

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=e039325f&s=star+wars`);
        const data = await response.json();

        if (data.Response === 'False') {
          setError(data.Error);
        } else {
          setMovies(data.Search);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchTerm = event.target.elements.search.value;

    if (searchTerm) {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=e039325f&s=${searchTerm}`);
        const data = await response.json();

        if (data.Response === 'False') {
          setError(data.Error);
        } else {
          setMovies(data.Search);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mt-3 bg-secondary">
      <h1>Movie Search</h1>
      <form onSubmit={handleSearch}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for movies"
            aria-label="Search"
            aria-describedby="search-button"
            name="search"
            id="search"
          />
          <Button variant="primary" id="search-button" type="submit">
            Search
          </Button>
        </div>
      </form>

      {isLoading && <p>Loading movies...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {movies.map((movie) => (
          <Card key={movie.imdbID} className="col bg-secondary">
            <Card.Img variant="top" src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'} alt={movie.Title} />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>
                Year: {movie.Year}
              </Card.Text>
              <Button variant="primary" href={`https://www.imdb.com/title/${movie.imdbID}`}>
                View on IMDb
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
