import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  useEffect(() => {}, []);
  const handlePages = e => {
    if (e.target.classList.contains("prev-btn")) {
      if (page === 0) {
        setPage(data.length - 1);
      } else {
        setPage(page - 1);
      }
    }
    if (e.target.classList.contains("next-btn")) {
      if (page === data.length - 1) {
        setPage(0);
      } else {
        setPage(page + 1);
      }
    }
  };
  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "loading..." : "pagenation"}</h1>
        <div className="underline"></div>
      </div>
      <section className="followers">
        <div className="container">
          {loading
            ? "loading..."
            : data[page].map(person => {
                const { avatar_url, login, repos_url } = person;
                const follow = {
                  image: avatar_url,
                  name: login,
                  url: repos_url,
                };
                return <Follower {...follow} />;
              })}
        </div>
        <div className="btn-container">
          <button className="prev-btn" onClick={e => handlePages(e)}>
            prev
          </button>
          {data.map((_, index) => {
            return (
              <button
                className={`page-btn ${page === index ? "active-btn" : "null"}`}
                onClick={() => setPage(index)}
              >
                {index + 1}
              </button>
            );
          })}
          <button className="next-btn" onClick={e => handlePages(e)}>
            next
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
