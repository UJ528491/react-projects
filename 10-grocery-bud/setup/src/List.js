import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, removeItem, editItem }) => {
  return (
    items &&
    items.map(item => {
      const { value, id } = item;
      return (
        <article key={id} className="grocery-item">
          <p className="title">{value}</p>
          <div className="btn-container">
            <button className="edit-btn" onClick={() => editItem(value, id)}>
              <FaEdit />
            </button>
            <button className="delete-btn" onClick={() => removeItem(id)}>
              <FaTrash />
            </button>
          </div>
        </article>
      );
    })
  );
};

export default List;
