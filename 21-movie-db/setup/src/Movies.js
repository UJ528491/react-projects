import React from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
import { Loading } from "./Loading";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const Movies = () => {
  const { data, loading } = useGlobalContext();
  return (
    <section className="movies">
      {data &&
        data.map(item => (
          <Link key={item.imdbID} to={`movie/${item.imdbID}`} className="movie">
            <article>
              <img
                src={item.Poster === "N/A" ? url : item.Poster}
                alt={item.Title}
              />
              <div className="movie-info">
                <h4 className="title">{item.Title}</h4>
                <p>{item.Year}</p>
              </div>
            </article>
          </Link>
        ))}
      {loading && <Loading />}
    </section>
  );
};

export default Movies;
