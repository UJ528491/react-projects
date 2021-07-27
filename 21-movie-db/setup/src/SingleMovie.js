import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_ENDPOINT } from "./context";

const SingleMovie = () => {
  const [movieInfo, setMovieInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const fetchMovie = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}&i=${id}`);
      const data = await response.json();
      console.log(data);
      setMovieInfo(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    !loading && (
      <section className="single-movie">
        <img src={movieInfo.Poster} alt={movieInfo.Title} />
        <div className="single-movie-info">
          <h2>{movieInfo.Title}</h2>
          <p>{movieInfo.Plot}</p>
          <h4>{movieInfo.Year}</h4>
          <Link to="/" className="btn">
            back to movies
          </Link>
        </div>
      </section>
    )
  );
};

export default SingleMovie;
