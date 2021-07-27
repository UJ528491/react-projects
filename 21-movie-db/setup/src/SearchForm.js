import React from "react";
import { useGlobalContext } from "./context";
const SearchForm = () => {
  const { setSearchTerm, error } = useGlobalContext();
  return (
    <form className="search-form">
      <h2>search movies</h2>
      <input
        type="text"
        className="form-input"
        onChange={e => setSearchTerm(e.target.value)}
      />
      {error && <div className="error">{error.msg}</div>}
    </form>
  );
};

export default SearchForm;
