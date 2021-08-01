import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const { isLoading, waiting, quiz, index } = useGlobalContext();
  if (waiting) {
    return <SetupForm />;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <main>
      {/* <Modal /> */}
      <section className="quiz">
        <p className="correct-answers">correct answer : correct/all</p>
        <article className="container">
          <h2>{quiz[0].question}</h2>
        </article>
      </section>
    </main>
  );
}

export default App;
