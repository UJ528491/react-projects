import React, { useState, useContext, useEffect } from "react";
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("inception");
  const [page, setPage] = useState(1);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  let url = `${API_ENDPOINT}&s=${searchTerm}&page=${page}`;
  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("fetch");
      const response = await fetch(url);
      const fetchData = await response.json();
      console.log(fetchData);
      if (fetchData.Response === "False") {
        setError({ status: fetchData.Response, msg: fetchData.Error });
      } else {
        setError({ status: fetchData.Response, msg: "" });
        setData(fetchData.Search);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const newFetchData = async () => {
    setLoading(true);
    try {
      console.log("new fetch");
      const response = await fetch(url);
      const fetchData = await response.json();
      if (fetchData.Response === "False") {
        setError({ status: fetchData.Response, msg: fetchData.Error });
      } else {
        setError({ status: fetchData.Response, msg: "" });
        setData([...data, ...fetchData.Search]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setPage(1);
    fetchData();
  }, [searchTerm]);
  useEffect(() => {
    newFetchData();
  }, [page]);
  useEffect(() => {
    const event = () => {
      const scrollEnd =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.scrollHeight;
      if (scrollEnd) {
        console.log("end");
        if (error.status !== "False") {
          setPage(p => p + 1);
        }
        console.log(page);
      }
    };
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  });
  return (
    <AppContext.Provider
      value={{ data, setSearchTerm, setPage, error, loading }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
