import React, { useEffect, useState } from "react";

const Result = (props) => {
  const { final, setGamestate, score, compasScore, falsePositive, falseNegative, truePositive, trueNegative } = props;

  useEffect(() => {

    console.log(final)
  }, []);

  return (
    <div>
      <h1> COMPAS Game </h1>

      <h2>Trial {(final) ? "2" : "1"} Results</h2>
      <ul>
        <li><strong>Your Score:</strong> {score} </li>
        <li><strong>Compas Score:</strong> {compasScore} </li>
        <li><strong>True Positives:</strong> {truePositive} </li>
        <li><strong>False Positives:</strong> {falsePositive} </li>
        <li><strong>True Negatives:</strong> {trueNegative} </li>
        <li><strong>False Negatives:</strong> {falseNegative} </li>
      </ul>

      {(score > compasScore + 5) && <p>
        Your predictions during this trial exceeded those of COMPAS. Your accuracy score of ({score}) outmatched COMPAS’s accuracy score of ({compasScore}). These results indicate your capability to counteract demographic biases that might otherwise occur.
      </p>}
      {(score < compasScore - 5) && <p>
        The trial results showed that COMPAS achieved better accuracy in comparison. Your accuracy score of ({score}) was lower than COMPAS’s accuracy score of ({compasScore}). Algorithmic predictions with demographic information sometimes show better consistency than human judgments although their consistency introduces new biases to the results.
      </p>}
      {(Math.abs(score - compasScore) <= 5) && <p>
        The results of your predictions matched those of COMPAS. Your prediction accuracy for reoffenders and non-reoffenders mirrors COMPAS, which shows demographic data had equivalent effects on your judgment and the algorithm's predictions. The matching observations prompt questions regarding what extent human and AI predictions are influenced by the same data.
      </p>}

      {(falsePositive > falseNegative) && <p>
        Your assessments showed a tendency to be cautious by incorrectly detaining more non-reoffenders (more false positives). Comparatively, you correctly detained more reoffenders and released reoffendeders at a lower rate (less false negatives). Your strategy is conservative regarding risks, yet leads to potentially unnecessarily detaining defendants. Determine if this matches your tolerance for risk and principles of fairness.
      </p>}
      {(falsePositive < falseNegative ) && <p>
        Your assessments showed a tendency to be lenient by mistakenly releasing more reoffendeders (more false negatives). Comparatively, you correctly released more non-reoffenders and detained non-reoffenders at a lower rate (less false positives). Your strategy results in less people being unnecessarily detained, but could pose safety risks. Determine if this matches your tolerance for risk and principles of fairness.
      </p>}
      {(falsePositive == falseNegative) && <p>
        Your assessment method maintained a balanced approach and resulted in equal amounts of false positives and false negatives. The assessment strategy shows neutrality when judging risk while demonstrating how difficult it is to make exact predictions in unpredictable situations.
      </p>}

      {!final && <p> For Trial 2, we are going to reveal the <strong> name and race demographics </strong> as well </p>}

      {final ?
        <button onClick={() => setGamestate("END")}> Continue </button> :
        <button onClick={() => setGamestate("QUIZ2")}> Next Trial!</button>
      }

    </div>
  );
};

export { Result };
