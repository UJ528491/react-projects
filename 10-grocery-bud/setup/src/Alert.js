import React from "react";

const Alert = ({ msg, type }) => {
  return <p className={type}>{msg}</p>;
};

export default Alert;
