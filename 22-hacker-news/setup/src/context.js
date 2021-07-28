import React, { useContext, useEffect, useReducer } from "react";

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState = {
  isLoading: true,
  hits: [],
  query: "react",
  page: 0,
  nbPages: 0,
};
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let url = `${API_ENDPOINT}query=${state.query}&page=${state.page}`;

  const fetchStories = async url => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removeStory = id => {
    dispatch({ type: REMOVE_STORY, payload: id });
  };
  const handleSearch = query => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };
  const handlePage = value => {
    dispatch({ type: HANDLE_PAGE, payload: value });
  };
  useEffect(() => {
    fetchStories(url);
  }, [state.query, state.page]);

  return (
    <AppContext.Provider
      value={{ ...state, dispatch, removeStory, handleSearch, handlePage }}
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
