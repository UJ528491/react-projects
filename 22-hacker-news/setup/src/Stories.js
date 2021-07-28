import React from "react";

import { useGlobalContext } from "./context";

const Stories = () => {
  const { isLoading, hits, removeStory } = useGlobalContext();

  if (isLoading) {
    return <div className="loading"></div>;
  } else {
    return (
      <section className="stories">
        {hits.map(item => {
          const {
            objectID: id,
            title,
            points,
            author,
            num_comments,
            url,
          } = item;
          return (
            <article key={id} className="story">
              <h4 className="title">{title}</h4>
              <p className="info">
                {points} points by <span>{author} | </span>
                {num_comments} comments
              </p>
              <div>
                <a
                  className="read-link"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  read more
                </a>
                <button className="remove-btn" onClick={() => removeStory(id)}>
                  remove
                </button>
              </div>
            </article>
          );
        })}
      </section>
    );
  }
};

export default Stories;
