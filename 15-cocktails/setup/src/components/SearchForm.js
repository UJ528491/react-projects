import React, { useEffect } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = React.useRef("");
  const handleSubmit = e => {
    e.preventDefault();
    setSearchTerm(searchValue);
  };

  useEffect(() => {
    searchValue.current.focus();
  });
  return (
    <section className="section search">
      <form onSubmit={handleSubmit} action="submit" className="search-form">
        <div className="form-control">
          <label htmlFor="name">search your cocktail</label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={() => setSearchTerm(searchValue.current.value)}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
