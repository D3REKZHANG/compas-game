import React, { useEffect, useState } from "react";

const Result = (props) => {
  const { final, setGamestate, score, compasScore, falsePositive, falseNegative, truePositive, trueNegative } = props;

  useEffect(() => {

    console.log(final)
  }, []);

  return (
    <div>
      <h1> COMPAS Game </h1>

      <h2>Results</h2>
      <ul>
        <li><strong>Your Score:</strong> {score} </li>
        <li><strong>Compas Score:</strong> {compasScore} </li>
        <li><strong>False Positive Rate:</strong> {falsePositive}</li>
        <li><strong>False Negative Rate:</strong> {falseNegative}</li>
        <li><strong>True Positive Rate:</strong> {truePositive}</li>
        <li><strong>True Negative Rate:</strong> {trueNegative}</li>
      </ul>

      {(score >= compasScore + 2) && <p>
        Your predictions during this trial exceeded those of COMPAS. Your accuracy ({score}) outmatched COMPAS’s accuracy overall ({compasScore}). These results indicate your capability to counteract demographic biases that might otherwise occur.
      </p>}
      {(score <= compasScore - 2) && <p>
        The trial results showed that COMPAS achieved better accuracy in comparison. Your accuracy ({score}) was lower than COMPAS’s accuracy overall ({compasScore}). Algorithmic predictions with demographic information sometimes show better consistency than human judgments although their consistency introduces new biases to the results.
      </p>}
      {(Math.abs(score - compasScore) < 2) && <p>
        The results of your predictions matched those of COMPAS. Your prediction accuracy for reoffenders and non-reoffenders along with the algorithm mirrors each other which shows demographic data had equivalent effects on your judgment and the algorithm's predictions. The matching observations prompt questions regarding what extent human and AI predictions are influenced by the same data.
      </p>}

      {/* TODO: NEED TO ADD THE TEXT FOR FALSE POSITIVE AND FALS NEGATIVE STUFF */}

      {final ?
        <button onClick={() => setGamestate("END")}> Continue </button> :
        <button onClick={() => setGamestate("QUIZ2")}> Next Trial!</button>
      }

    </div>
  );
};

export { Result };
