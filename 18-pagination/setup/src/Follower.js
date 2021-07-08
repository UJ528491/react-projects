import React from "react";

const Follower = ({ image, name, url }) => {
  return (
    <article className="card">
      <img src={image} alt="thum-nail" />
      <h4>{name}</h4>
      <a href={url} className="btn">
        view profile
      </a>
    </article>
  );
};

export default Follower;
