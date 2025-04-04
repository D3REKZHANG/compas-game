import React, { useEffect, useState } from "react";

const End = ({ setGamestate }) => {

  const [state, setState] = useState(0);

  return (
    <div>
      <h1> COMPAS Game </h1>

      <h2> Closing Thoughts </h2>
      {(state == 0) && <>
        <p>
          The criminal justice system applies the COMPAS risk assessment tool as a method to predict recidivism. Defendants receive scores which should indicate their risk of committing new crimes - however, research has shown that the tool produces unfair results. During their analysis of the COMPAS algorithm (Larson et al., 2016), ProPublica discovered that:
          Black defendants who did not commit new offenses were misidentified as high risk at almost double the rate (45%) compared to white defendants (23%).
        </p>
        <p>
          The probability of being incorrectly classed as low-risk was nearly double for white individuals who reoffended within two years compared to black reoffenders (48% vs 28%).
          Even after factoring in past offenses, future recidivism, age, and gender information, black defendants still received risk scores that were 45% higher than white defendants.
        </p>
        <button onClick={() => setState((s) => s+1)}> Next </button>
      </>
      }

      {(state == 1) && <>
        <p>
          The observed data indicates that automated scoring techniques may exhibit the same biases that exist in our society.
          Our game required you to function as a human risk evaluator who made decisions both with and without certain demographic information available. The experience highlights key questions:
        </p>

        <ul>
          <li> Would a reduction in available demographic information result in tools like COMPAS making more impartial decisions? </li>
          <li> Do biases in automated systems like COMPAS appear in human judgement as well?</li>
        </ul>
        <button onClick={() => setState((s) => s-1)}> Back </button>
        <button onClick={() => setState((s) => s+1)}> Next </button>
      </>
      }


      {(state == 2) && <>
        <p>
          Reviewing your game performance should help you understand how any difficulties you faced in integrating defendant data with your decision-making process resembles the challenges faced by our judicial system. Examining the case details did not make prediction tasks trivial.
        </p>
        <p>
          Thankfully, due to the nature of our simulation, no non-reoffenders were unjustly sentenced to years of prison as a result of your scores, nor were any dangerous criminals released back into the public. However, evaluation mistakes made in the real world are life-altering. Inaccurate high-risk evaluations will impose harsh punishments on defendants even when they don’t deserve it, and inaccurate low-risk scores may endanger a lot of people, and represent a failure to protect the future reoffender’s victims.
        </p>
        <button onClick={() => setState((s) => s-1)}> Back </button>
        <button onClick={() => setState((s) => s+1)}> Next </button>
        </>
      }

      {(state == 3) && <>
        <p>
          The experiences you gained today contribute to a wider effort toward bias reduction in risk assessments, which have grown essential in our modern world. There’s no one perfect system - systemic problems reside in both the data sets and the recidivism algorithms that are trained on them, and consistent predictions don’t guarantee fairness. Making risk assessment more fair requires a thorough evaluation of mistakes - both those made by humans, and those made by AI. Thank you for playing!
        </p>

        <p> Juleen Chen, Rohit Krishna, Derek Zhang</p>

      <button onClick={() => setState((s) => s-1)}> Back </button>
      <button onClick={() => setGamestate("INTRO")}> Home</button>
      </>
      }

    </div>
  );
};

export { End };
