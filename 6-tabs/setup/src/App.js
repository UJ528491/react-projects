import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";
function App() {
  const [people, setPeople] = useState({});
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);

  const getPeople = async () => {
    const response = await fetch(url);
    const newPeople = await response.json();
    setPeople(newPeople);
    setLoading(false);
  };
  useEffect(() => {
    getPeople();
  }, []);
  if (loading) {
    return <h1 className="title">Loading...</h1>;
  }
  const { company, id, order, title, dates, duties } = people[value];
  return (
    <section className="section">
      <div className="title">
        <h2>experience</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        <div className="btn-container">
          {people.map((person, index) => {
            const { company } = person;
            return (
              <button
                key={person.id}
                className={
                  value === index ? "job-btn active-btn" : "job-btn false"
                }
                onClick={() => setValue(index)}
              >
                {company}
              </button>
            );
          })}
        </div>
        <article className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={id + index} className="job-desc">
                <FaAngleDoubleRight className="job-icon" />
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
      <button className="btn">more info</button>
    </section>
  );
}

export default App;
