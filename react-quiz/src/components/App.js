import { useEffect } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../contexts/QuizContext";

export default function App() {
  const { questions, dispatch, status, index } = useQuiz();

  useEffect(
    function () {
      fetch("http://localhost:8000/questions")
        .then((res) => res.json())
        .then((data) => dispatch({ type: "dataReceived", payload: data }))
        .catch((err) => dispatch({ type: "dataFailed" }));
    },
    [dispatch]
  );
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question question={questions[index]} />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen />
          </>
        )}
      </Main>
    </div>
  );
}
