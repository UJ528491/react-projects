import React from "react";
import moment from "moment";
const Article = ({ id, title, date, length, snippet }) => {
  return (
    <article className="post">
      <h2>{title}</h2>
      <div className="post-info">
        <span>{moment(date).format(`dddd Do, YY`)}</span>
        <span>{length} min read</span>
        <p>{snippet}</p>
      </div>
    </article>
  );
};

export default Article;
