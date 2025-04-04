import React, { useEffect, useState } from "react";

const Intro = ({ setGamestate }) => {

  const [state, setState] = useState(0);

  return (
    <div>
      <h1> COMPAS Game </h1>

      {(state == 0) && <>
        <p>
          Welcome, Judge.
        </p>
        <p>
          Today, you’re serving as a decision-maker who must evaluate recidivism risk
          for the cases presented to you. Review each case file, and try to score each
          defendant based on how likely you think it is that they commit another offense.
          Your assessments of risk levels will be compared to real case outcomes to test
          your ability for combining professional judgement with systemic evaluation.
        </p>
        <p>
          Your scores will also be compared to those of COMPAS, a algorithmic tool trained to predict
          recidivism risk known to sometimes make biased decisions. Remember how subtle
          biases influence all your decisions during this process.
        </p>
        <button onClick={() => setState(1)}> Next </button>
      </>
      }

      {(state == 1) && <>
      <p>
Review each case and give the defendant a score between 1 and 10 based on how likely it is you think they’ll reoffend. A rating between 1-4 signals a low risk of reoffense, while 5-7 indicates moderate risk, and 8-10 high risk. You will be given 20 seconds per case, so act decisively!
        </p>
        <p>
The accuracy of your risk assessments will be evaluated by comparing your score to whether or not the subject reoffended. If you rated the defendant a 10 (high risk) and the subject reoffended, then we award 10 points. Conversely, if the rating is 10 but they don’t reoffend, only 1 point is awarded. In general, points=score if the subject reoffended or 11-score if the subject did not.
After scoring each profile, make a final decision of whether the defendant should be detained or released.
        </p>
      <p>
Ready? Let’s begin!
      </p>
      <button onClick={() => setState(0)}> Back </button>
      <button onClick={() => setGamestate("QUIZ1")}> Start! </button>
      </>
      }
    </div>
  );
};

export { Intro };
