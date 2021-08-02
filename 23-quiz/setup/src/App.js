import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    isLoading,
    waiting,
    quiz,
    index,
    setIndex,
    modalIsOpen,
    setup,
    modalOpen,
    correctAnswers,
    seCorrectAnswers,
  } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }
  if (isLoading) {
    return <Loading />;
  }
  console.log(quiz);
  const { question, incorrect_answers, correct_answer } = quiz[index];
  let answers = [...incorrect_answers];
  const ranNum = Math.floor(Math.random() * 4);
  if (ranNum === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[ranNum]);
    answers.splice(ranNum, 1, correct_answer);
  }
  /* function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  } */
  const nextQuestion = e => {
    if (e === correct_answer) {
      seCorrectAnswers(correctAnswers + 1);
    }
    if (index === setup.amount - 1) {
      modalOpen();
    } else {
      setIndex(index + 1);
    }
  };
  return (
    <main>
      {modalIsOpen && <Modal />}
      <section className="quiz">
        <p className="correct-answers">
          correct answer : {correctAnswers} / {setup.amount}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
          <div className="btn-container">
            {answers.map(answer => (
              <button
                className="answer-btn"
                dangerouslySetInnerHTML={{ __html: answer }}
                onClick={e => nextQuestion(e.target.innerHTML)}
              ></button>
            ))}
          </div>
        </article>
        <button className="next-question" onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
