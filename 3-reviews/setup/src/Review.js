import React, { useState } from "react";
import people from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const Review = () => {
  const [index, setIndex] = useState(0);
  const { id, name, job, image, text } = people[index];
  const randomNumber = num => {
    const ranNum = Math.floor(Math.random() * num);
    if (index === ranNum) {
      randomNumber(num);
    }
    setIndex(ranNum);
  };
  return (
    <article key={id} className="review">
      <div className="img-container">
        <img className="person-img" src={image} alt={name} />
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div>
      <h4 className="autor">{name}</h4>
      <p className="job">{job}</p>
      <p className="info">{text}</p>
      <div className="button-container">
        <button
          className="prev-btn"
          onClick={() =>
            index === 0 ? setIndex(people.length - 1) : setIndex(index - 1)
          }
        >
          <FaChevronLeft />
        </button>
        <button
          className="next-btn"
          onClick={() =>
            index === people.length - 1 ? setIndex(0) : setIndex(index + 1)
          }
        >
          <FaChevronRight />
        </button>
      </div>
      <button
        className="random-btn"
        onClick={() => randomNumber(people.length)}
      >
        surprise me
      </button>
    </article>
  );
};

export default Review;
