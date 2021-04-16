import React, { useState } from "react";
import data from "./data";
function App() {
  const [text, setText] = useState([]);
  const [value, setValue] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    let amount = value;
    if (value <= 0) {
      amount = 1;
    }
    if (value > data.length) {
      amount = data.length;
    }
    setText(data.slice(0, amount));
  };

  return (
    <section className="section-center" onSubmit={handleSubmit}>
      <h3>tired of boring lorem ipsum?</h3>
      <form className="lorem-form">
        <label htmlFor="amout">paragraphs : </label>
        <input
          type="number"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button className="btn" type="submit">
          generate
        </button>
      </form>
      <article className="lorem-text">
        {text.map((par, index) => {
          return <p key={index}>{par}</p>;
        })}
      </article>
    </section>
  );
}

export default App;
