import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";
const API_Categories = "https://opentdb.com/api_category.php";
const API_Question_Count = "https://opentdb.com/api_count.php?category=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [waiting, setWaiting] = useState(true);
  const [categories, setCategories] = useState([]);
  const [questionCount, setQuestionCount] = useState(1);
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [setup, setSetup] = useState({
    amount: 1,
    category: null,
    difficulty: null,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [correctAnswers, seCorrectAnswers] = useState(0);
  const [reFetch, setReFetch] = useState(false);
  const quizUrl = `${API_ENDPOINT}amount=${setup.amount}&category=${setup.category}&difficulty=${setup.difficulty}&type=multiple`;
  const questionCountUrl = `${API_Question_Count}${setup.category}`;

  const fetchCategories = async () => {
    console.log("fetch category");
    setIsLoading(true);
    try {
      const response = await axios(API_Categories);
      if (response) {
        const data = await response.data.trivia_categories;
        setCategories(data);
        /* initial set */
        setSetup({ ...setup, category: data[0].id, difficulty: "easy" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuestionCount = async () => {
    console.log("fetch questioncount");
    if (setup.category && setup.difficulty) {
      try {
        const response = await axios(questionCountUrl);
        if (response) {
          const data = await response.data.category_question_count;
          if (setup.difficulty === "easy") {
            setQuestionCount(data.total_easy_question_count);
          } else if (setup.difficulty === "medium") {
            setQuestionCount(data.total_medium_question_count);
          } else if (setup.difficulty === "hard") {
            setQuestionCount(data.total_hard_question_count);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchQuizAPI = async () => {
    console.log("fetch quiz api", setup.amount);
    setWaiting(false);
    try {
      const response = await fetch(quizUrl);
      const data = await response.json();
      if (data.results.length === 0) {
        setReFetch(true);
        setSetup({ ...setup, amount: setNumberOfQuestions() });
        setWaiting(true);
      } else {
        setReFetch(false);
        setQuiz(data.results);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setSetup({ ...setup, [name]: value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(quiz);
    fetchQuizAPI();
  };
  const setNumberOfQuestions = () => {
    console.log(setup.amount, questionCount);
    if (reFetch) {
      return setup.amount - 1;
    }
    if (setup.amount > questionCount) {
      setSetup({ ...setup, amount: questionCount });
      return questionCount;
    } else {
      return setup.amount;
    }
  };
  const modalOpen = () => {
    setModalIsOpen(true);
  };
  const modalClose = () => {
    setWaiting(true);
    setModalIsOpen(false);
    seCorrectAnswers(0);
    setIndex(0);
  };
  const correctPercent = () => {
    return ((correctAnswers / setup.amount) * 100).toFixed(0);
  };

  useEffect(() => {
    fetchCategories();
  }, [waiting]);
  useEffect(() => {
    if (!reFetch) {
      fetchQuestionCount();
    }
  }, [setup]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        quiz,
        categories,
        waiting,
        setup,
        questionCount,
        index,
        modalIsOpen,
        correctAnswers,
        setSetup,
        handleChange,
        handleSubmit,
        setNumberOfQuestions,
        setIndex,
        setModalIsOpen,
        setWaiting,
        modalOpen,
        modalClose,
        seCorrectAnswers,
        correctPercent,
        fetchQuizAPI,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export const useQuestionCount = () => {
  const { questionCount } = useContext(AppContext);
  return questionCount;
};

export { AppContext, AppProvider };
