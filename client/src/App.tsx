import React, { useEffect, useState } from "react";
import { Quiz } from './Quiz'
import { Intro } from './Intro'
import { Result } from './Result'
import { End } from './End'
import './App.css'

const App = () => {

  const [gamestate, setGamestate] = useState("INTRO");
  
  const [score, setScore] = useState<number | null>(null);
  const [compasScore, setCompasScore] = useState<number | null>(null);
  const [falsePositive, setFalsePositive] = useState<number | null>(null);
  const [falseNegative, setFalseNegative] = useState<number | null>(null);
  const [truePositive, setTruePositive] = useState<number | null>(null);
  const [trueNegative, setTrueNegative] = useState<number | null>(null);

  return (
    <>
      {(() => {
        switch(gamestate) {
          case "INTRO":
            return <Intro setGamestate={setGamestate} />
          case "QUIZ1":
            return <Quiz
              mode="NOT_HIDDEN"
              setGamestate = {setGamestate}
              setScore = {setScore}
              setCompasScore = {setCompasScore}
              setFalsePositive = {setFalsePositive}
              setFalseNegative = {setFalseNegative}
              setTruePositive = {setTruePositive}
              setTrueNegative = {setTrueNegative}
            />
          case "RESULT1":
            return <Result 
              final={false}
              score = {score}
              setGamestate = {setGamestate}
              compasScore = {compasScore}
              falsePositive = {falsePositive}
              falseNegative = {falseNegative}
              truePositive = {truePositive}
              trueNegative = {trueNegative}
            />
          case "QUIZ2":
            return <Quiz
              mode="HIDDEN"
              setGamestate = {setGamestate}
              setScore = {setScore}
              setCompasScore = {setCompasScore}
              setFalsePositive = {setFalsePositive}
              setFalseNegative = {setFalseNegative}
              setTruePositive = {setTruePositive}
              setTrueNegative = {setTrueNegative}
            />
          case "RESULT2":
            return <Result 
              final
              setGamestate = {setGamestate}
              score = {score}
              compasScore = {compasScore}
              falsePositive = {falsePositive}
              falseNegative = {falseNegative}
              truePositive = {truePositive}
              trueNegative = {trueNegative}
            />
          case "END":
            return <End setGamestate={setGamestate} />
        }
        return <p> CRITICAL: INVALID GAMESTATE </p>;
      })()}
    </>
  );
};

export default App;
