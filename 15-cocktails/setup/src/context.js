import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
import axios from "axios";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);

  const cocktailList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}${searchTerm}`);
      // const fetchResponse = await fetch(`${url}${searchTerm}`);
      // const data = await fetchResponse.json();
      const { drinks } = response.data;
      if (drinks) {
        const newCocktails = drinks.map(item => {
          const { strDrink, strAlcoholic, strGlass, strDrinkThumb, idDrink } =
            item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(newCocktails);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [searchTerm]);
  useEffect(() => {
    cocktailList();
  }, [searchTerm, cocktailList]);

  return (
    <AppContext.Provider
      value={{ loading, searchTerm, cocktails, setSearchTerm }}
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
