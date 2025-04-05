import React, { useState } from "react";
import "./End.css";

interface EndProps {
  setGamestate: React.Dispatch<React.SetStateAction<string>>;
  trial1Score: number | null;
  trial2Score: number | null;
}

const End: React.FC<EndProps> = ({
  setGamestate,
  trial1Score,
  trial2Score,
}) => {
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitScore = async () => {
    try {
      const res1 = await fetch(
        "https://compas-api.derekzhang.ca/leaderboard?type=1",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, score: trial1Score || 20 }),
        }
      );

      if (!res1.ok) {
        throw new Error(
          `Failed to update leaderboard1. Received ${res1.status}`
        );
      }

      const res2 = await fetch(
        "https://compas-api.derekzhang.ca/leaderboard?type=2",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, score: trial2Score || 20 }),
        }
      );

      if (!res2.ok) {
        throw new Error(
          `Failed to update leaderboard2. Received ${res2.status}`
        );
      }
    } catch (err) {
      console.log(err);
    }
    setSubmitted(true);
  };

  let content;

  if (page === 0) {
    let comparisonText = "";
    if (trial1Score !== null && trial2Score !== null) {
      if (trial1Score > trial2Score + 5) {
        comparisonText =
          "The accuracy scores from your first trial, when demographic information remained hidden during assessment, exceeded those of your second trial where that data was shown. This indicates that the demographic information added in trial 2 might have affected your decision-making process, and aligns with concerns that demographic data may distort judgement. COMPAS, however, always uses demographic data to help inform its decisions - so if their removal made you more accurate in your decisions, should the same be done for COMPAS and similar tools?";
      } else if (trial2Score > trial1Score + 5) {
        comparisonText =
          "The accuracy scores from your second trial, where demographic information was shown during assessment, exceeded those of your first trial, where that data was hidden. This shows that you performed better when extra demographic cues were available to you. This suggests that demographic information is beneficial for decision-making, and indeed, COMPAS always uses it to help make judgements. However, we have to consider - does the repeated application of demographic data by an algorithm maintain or enhance preexisting biases in the system when it fails to use the data with necessary complexity?";
      } else {
        comparisonText =
          "Your accuracy was similar between both trials, which indicates that the addition of demographic data did not affect your assessment process. The consistency in your scoring demonstrates your usage of case details beyond demographic data when performing risk assessments. If the same could be said for COsMPAS, could there be something besides demographic data influencing it to make unfair decisions? The presence of bias could arise not only from explicit data, but also from how the algorithm was trained, or from real-world application methods.";
      }
    }
    content = (
      <>
        <h2>Final Score Comparison</h2>
        <ul>
          <li>
            <strong>Trial 1 Score:</strong> {trial1Score}
          </li>
          <li>
            <strong>Trial 2 Score:</strong> {trial2Score}
          </li>
        </ul>
        <p>{comparisonText}</p>

        <p> Would you like to submit these scores to the leaderboard? </p>

        <div className="submit-section">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            maxLength={20}
            disabled={submitted}
          />
          <button disabled={name === "" || submitted} onClick={submitScore}>
            {" "}
            Submit{" "}
          </button>
        </div>

        <button onClick={() => setPage(page + 1)}>Next</button>
      </>
    );
  } else if (page === 1) {
    content = (
      <>
        <h2>Closing Thoughts</h2>
        <p>
          The criminal justice system applies the COMPAS risk assessment tool as
          a method to predict recidivism. Defendants receive scores which should
          indicate their risk of committing new crimes — however, research has
          shown that the tool produces biased results. During their analysis of
          the COMPAS algorithm (Larson et al., 2016), ProPublica discovered
          that: Black defendants who did not commit new offenses were
          misidentified as high risk at almost double the rate (45%) compared to
          white defendants (23%).
        </p>
        <button onClick={() => setPage(page - 1)}>Back</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </>
    );
  } else if (page === 2) {
    content = (
      <>
        <h2>Closing Thoughts</h2>
        <p>
          However, Flores et. al (2016) argue that the observed data is just a
          reflection of the biases that already exist in our society. Our game
          required you to function as a human risk evaluator who made decisions
          both with and without certain demographic information available. The
          experience highlights key questions:
        </p>
        <ul>
          <li>
            Would a reduction in available demographic information result in
            tools like COMPAS making more accurate decisions?
          </li>
          <li>
            Do biases in automated systems like COMPAS appear in human judgment
            as well?
          </li>
        </ul>
        <button onClick={() => setPage(page - 1)}>Back</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </>
    );
  } else if (page === 3) {
    content = (
      <>
        <h2>Closing Thoughts</h2>
        <p>
          Reviewing your game performance should help you understand how any
          difficulties you faced in integrating defendant data with your
          decision-making process resemble the challenges faced by our judicial
          system. Examining the case details did not make prediction tasks
          trivial.
        </p>
        <p>
          Thankfully, due to the nature of our simulation, no non-reoffenders
          were unjustly sentenced to years of prison as a result of your scores,
          nor were any dangerous criminals released back into the public.
          However, evaluation mistakes made in the real world are life-altering.
        </p>
        <button onClick={() => setPage(page - 1)}>Back</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </>
    );
  } else if (page === 4) {
    content = (
      <>
        <h2>Closing Thoughts</h2>
        <p>
          The experiences you gained today contribute to a wider effort toward
          bias reduction in risk assessments, which have grown essential in our
          modern world. There’s no one perfect system — systemic problems reside
          in both the data sets and the recidivism algorithms that are trained
          on them, and consistent predictions don’t guarantee fairness. Making
          risk assessment more fair requires a thorough evaluation of mistakes —
          both those made by humans and those made by AI. Thank you for playing!
        </p>
        <p>Juleen Chen, Rohit Krishna, Derek Zhang</p>
        <button onClick={() => setPage(page - 1)}>Back</button>
        <button onClick={() => setGamestate("MENU")}>Home</button>
      </>
    );
  }

  return (
    <div>
      <h1>COMPAS Game</h1>
      {content}
    </div>
  );
};

export { End };
