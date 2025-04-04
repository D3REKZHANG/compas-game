import React, { useState } from "react";
import { Quiz } from "./Quiz";
import { Intro } from "./Intro";
import { Result } from "./Result";
import { End } from "./End";
import ResultWrapper from "./ResultWrapper.tsx";
import "./App.css";
import { Menu } from "./Menu";
import { References } from "./References"

const App = () => {
  const [gamestate, setGamestate] = useState("MENU");

  const [score, setScore] = useState<number | null>(null);
  const [compasScore, setCompasScore] = useState<number | null>(null);
  const [falsePositive, setFalsePositive] = useState<number | null>(null);
  const [falseNegative, setFalseNegative] = useState<number | null>(null);
  const [truePositive, setTruePositive] = useState<number | null>(null);
  const [trueNegative, setTrueNegative] = useState<number | null>(null);

  const [trial1Score, setTrial1Score] = useState<number | null>(null);
  const [trial2Score, setTrial2Score] = useState<number | null>(null);

  return (
    <>
      {(() => {
        switch (gamestate) {
          case "MENU":
            return <Menu setGamestate={setGamestate} />;
          case "REFERENCES":
            return <References setGamestate={setGamestate} />;
          case "INTRO":
            return <Intro setGamestate={setGamestate} />;
          case "QUIZ1":
            return (
              <Quiz
                mode="HIDDEN"
                setGamestate={setGamestate}
                score={score}
                setScore={setScore}
                setCompasScore={setCompasScore}
                setFalsePositive={setFalsePositive}
                setFalseNegative={setFalseNegative}
                setTruePositive={setTruePositive}
                setTrueNegative={setTrueNegative}
              />
            );
          case "RESULT1":
            return (
              <ResultWrapper
                final={false}
                score={score}
                setTrialScore={setTrial1Score}
                setGamestate={setGamestate}
                compasScore={compasScore}
                falsePositive={falsePositive}
                falseNegative={falseNegative}
                truePositive={truePositive}
                trueNegative={trueNegative}
                onNextTrial={() => {
                  setTrial1Score(score);
                  setGamestate("QUIZ2");
                }}
              />
            );
          case "QUIZ2":
            return (
              <Quiz
                mode="NOT_HIDDEN"
                setGamestate={setGamestate}
                score={score}
                setScore={setScore}
                setCompasScore={setCompasScore}
                setFalsePositive={setFalsePositive}
                setFalseNegative={setFalseNegative}
                setTruePositive={setTruePositive}
                setTrueNegative={setTrueNegative}
              />
            );
          case "RESULT2":
            return (
              <ResultWrapper
                final={true}
                score={score}
                setTrialScore={setTrial2Score}
                setGamestate={setGamestate}
                compasScore={compasScore}
                falsePositive={falsePositive}
                falseNegative={falseNegative}
                truePositive={truePositive}
                trueNegative={trueNegative}
                onNextTrial={() => {
                  setGamestate("END");
                }}
              />
            );
          case "END":
            return (
              <End
                setGamestate={setGamestate}
                trial1Score={trial1Score}
                trial2Score={trial2Score}
              />
            );
          default:
            return <p>CRITICAL: INVALID GAMESTATE</p>;
        }
      })()}
    </>
  );
};

export default App;
