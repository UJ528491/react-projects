import React, { useEffect } from "react";

const Alert = ({ msg, type, list, showAlert }) => {
  useEffect(() => {
    const closeAlert = setTimeout(() => {
      showAlert();
    }, 3000);
    return clearTimeout(closeAlert);
  }, [list]);
  return <p className={type}>{msg}</p>;
};

export default Alert;
