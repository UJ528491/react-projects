import React from "react";
import { useGlobalContext } from "./context";

const Buttons = () => {
  const { nbPages, page, handlePage, isLoading } = useGlobalContext();
  return (
    <div className="btn-container">
      <button disabled={isLoading} onClick={e => handlePage("dec")}>
        prev
      </button>
      <p>
        {page + 1} of {nbPages}
      </p>
      <button disabled={isLoading} onClick={e => handlePage("inc")}>
        next
      </button>
    </div>
  );
};

export default Buttons;
