import React, { useEffect } from "react";
import { Result } from "./Result";

const ResultWrapper = ({
  final,
  score,
  setTrialScore,
  setGamestate,
  compasScore,
  falsePositive,
  falseNegative,
  truePositive,
  trueNegative,
  onNextTrial,
}) => {
  useEffect(() => {
    setTrialScore(score);
  }, [score, setTrialScore]);

  return (
    <Result
      final={final}
      score={score}
      setGamestate={setGamestate}
      compasScore={compasScore}
      falsePositive={falsePositive}
      falseNegative={falseNegative}
      truePositive={truePositive}
      trueNegative={trueNegative}
      onNextTrial={onNextTrial}
    />
  );
};

export default ResultWrapper;
