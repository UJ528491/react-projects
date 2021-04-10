import React from "react";

const List = ({ data }) => {
  return (
    <>
      {data.map(person => {
        const { id, name, image, age } = person;
        return (
          <article key={id} className="person">
            <img src={image} alt="" />
            <div>
              <h4>{name}</h4>
              <p>
                {age}
                years
              </p>
            </div>
          </article>
        );
      })}
    </>
  );
};

export default List;
