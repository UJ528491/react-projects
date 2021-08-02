import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { modalIsOpen, modalClose, correctPercent } = useGlobalContext();
  return (
    <div className={modalIsOpen ? "modal-container isOpen" : "modal-container"}>
      <div className="modal-content">
        <h2>congrats!</h2>
        <p>You answered {correctPercent()}% questions correctly</p>
        <button className="close-btn" onClick={modalClose}>
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
