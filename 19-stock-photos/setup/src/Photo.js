import React from "react";

const Photo = ({ photos }) => {
  const { image, name, likes, thumb, link, alt } = photos;
  return (
    <article className="photo">
      <img src={image} alt={alt} />
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={link}>
          <img className="user-img" src={thumb} alt="" />
        </a>
      </div>
    </article>
  );
};

export default Photo;
