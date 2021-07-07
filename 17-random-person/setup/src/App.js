import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [person, setPerson] = useState(null);
  const [show, setShow] = useState("");
  const [text, setText] = useState("My Name is");
  const [loading, setLoading] = useState(true);
  const data = async () => {
    setLoading(true);
    const fetchUrl = await fetch(url);
    const data = await fetchUrl.json();
    const {
      name: { first, last },
      email,
      dob: { age },
      location: {
        street: { number, name },
      },
      phone,
      login: { password },
      picture: { large },
    } = data.results[0];
    const newPeople = {
      name: `${first} ${last}`,
      email,
      age,
      street: `${number} ${name}`,
      phone,
      password,
      image: large,
    };
    setPerson(newPeople);
    setShow(newPeople?.name);
    setLoading(false);
    console.log(data);
  };
  const handleValue = e => {
    if (e.target.classList.contains("icon")) {
      const label = e.target.dataset.label;
      setText(label);
      setShow(person[label]);
    }
  };
  useEffect(() => {
    data();
  }, []);
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          {person && (
            <>
              <img src={person?.image || defaultImage} alt="random user" />
              <p className="user-title">My {text} is</p>
              <p className="user-value">{show}</p>
              <div className="values-list">
                <button
                  className="icon"
                  data-label="name"
                  onMouseOver={handleValue}
                >
                  <FaUser />
                </button>
                <button
                  className="icon"
                  data-label="email"
                  onMouseOver={handleValue}
                >
                  <FaEnvelopeOpen />
                </button>
                <button
                  className="icon"
                  data-label="age"
                  onMouseOver={handleValue}
                >
                  <FaCalendarTimes />
                </button>
                <button
                  className="icon"
                  data-label="street"
                  onMouseOver={handleValue}
                >
                  <FaMap />
                </button>
                <button
                  className="icon"
                  data-label="phone"
                  onMouseOver={handleValue}
                >
                  <FaPhone />
                </button>
                <button
                  className="icon"
                  data-label="password"
                  onMouseOver={handleValue}
                >
                  <FaLock />
                </button>
              </div>
              <button className="btn" onClick={() => data()}>
                {loading ? "loading.." : "random user"}
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
