import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  useEffect(() => {
    console.log(list);
    const closeAlert = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => clearTimeout(closeAlert);
  }, [list]);
  const handleSubmit = e => {
    e.preventDefault();
    const newID = new Date().getTime().toString();
    if (!value) {
      showAlert(true, "please enter value", "alert alert-danger");
    } else if (value && isEditing) {
      const newList = list.map(items => {
        if (items.id === editID) {
          items.value = value;
          return items;
        }
        return items;
      });
      setList(newList);
      setIsEditing(false);
      showAlert(true, "value changed", "alert alert-success");
    } else {
      setList([...list, { value: value, id: newID }]);
      setValue("");
      setEditID(null);
      showAlert(true, "value added to the list", "alert alert-success");
    }
  };
  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, type, msg });
  };
  const removeItem = id => {
    const newList = list.filter(items => items.id !== id);
    setList(newList);
    showAlert(true, "value removed", "alert alert-danger");
  };
  const editItem = (oldValue, oldID) => {
    setIsEditing(true);
    setValue(oldValue);
    setEditID(oldID);
  };
  const clearItems = () => {
    setList([]);
    showAlert(true, "value cleared", "alert alert-danger");
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            className="grocery"
            type="text"
            placeholder="e.g. eggs"
            onChange={e => {
              setValue(e.target.value);
            }}
            value={value}
          />
          <button className="submit-btn">submit</button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="grocery-container">
          <div className="grocery-list">
            <List items={list} removeItem={removeItem} editItem={editItem} />
          </div>
          <button className="clear-btn" onClick={clearItems}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
