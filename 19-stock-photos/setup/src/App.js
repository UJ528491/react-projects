import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const fetchApi = async () => {
    setLoading(true);
    let url;
    if (query) {
      url = `${searchUrl}${clientID}&page=${page}&query=${query}`;
    } else {
      url = `${mainUrl}${clientID}&page=${page}`;
    }
    try {
      const response = await fetch(url);
      let data = await response.json();
      if (query) {
        data = data.results;
      }
      const newData = data.map(item => {
        return {
          image: item.urls.raw,
          name: item.user.name,
          likes: item.likes,
          thumb: item.user.profile_image.large,
          link: item.user.portfolio_url,
          alt: item.alt_description,
        };
      });
      if (query && page === 1) {
        setPhotos(newData);
      } else {
        setPhotos([...photos, ...newData]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApi();
    console.log("f5");
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      const scrollEnd =
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
      if (scrollEnd) {
        console.log("end");
        setPage(page + 1);
      }
    });
    return () => window.removeEventListener("scroll", event);
  });
  const handleSubmit = e => {
    e.preventDefault();
    setPage(1);
    fetchApi();
  };
  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            className="form-input"
            placeholder="search"
            // value={query}
            onChange={e => {
              setQuery(e.target.value);
            }}
          />
          <button className="submit-btn" type="submit" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((item, index) => (
            <Photo key={index} photos={item} />
          ))}
        </div>
        {loading && <h1 className="loading">Loading...</h1>}
      </section>
    </main>
  );
}

export default App;
