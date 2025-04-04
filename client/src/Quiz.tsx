import React, { useEffect, useState } from "react";
import { fetchData, ParsedData } from "./ParseData";
import {
  updateScore,
  getScore,
  getCompasScore,
  getFalsePositiveRate,
  getFalseNegativeRate,
  getTruePositiveRate,
  getTrueNegativeRate,
  resetGame,
} from "./AppData";

import "./Quiz.css";

const NUM_CASES = 10;

const Quiz = (props) => {
  const {
    mode,
    setGamestate,
    setScore,
    setCompasScore,
    setFalsePositive,
    setFalseNegative,
    setTruePositive,
    setTrueNegative,
  } = props;

  const [data, setData] = useState<ParsedData | null>(null);
  const [scoreInput, setScoreInput] = useState<number>(null);
  const [detain, setDetain] = useState<boolean | null>(null); // Track detain value
  const [caseNumber, setCaseNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showResultPopup, setShowResultPopup] = useState(false);
  const [lastDecision, setLastDecision] = useState<{
    reoffended: boolean;
    released: boolean;
  }>({ reoffended: null, released: null });

  const getData = async () => {
    setLoading(true);
    const fetchedData = await fetchData();
    setData(fetchedData);
    setLoading(false);

    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  // Fetch the data on component mount
  useEffect(() => {
    handleResetGame(); 
  }, []);
  

  useEffect(() => {
    // Fetch the scores and rates whenever they change
    setScore(getScore());
    setCompasScore(getCompasScore());
    setFalsePositive(getFalsePositiveRate());
    setFalseNegative(getFalseNegativeRate());
    setTruePositive(getTruePositiveRate());
    setTrueNegative(getTrueNegativeRate());
  }, [data]);

  useEffect(() => {
    if (!showResultPopup && lastDecision.released !== null) {
      if (caseNumber === NUM_CASES) {
        setGamestate(mode === "HIDDEN" ? "RESULT1" : "RESULT2" );
      } else {
        setCaseNumber((num) => num + 1);
        getData();
      }

      // Reset to prevent re-trigger
      setLastDecision({ released: null, reoffended: null });
      setScoreInput(null);
      setDetain(null);
    }
  }, [showResultPopup]);

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScoreInput(parseInt(event.target.value));
  };

  const handleUpdateScore = () => {
    const numScore = Number(scoreInput);
    if (isNaN(numScore)) {
      alert("Please enter a valid number.");
      return;
    }
    if (detain === null) {
      alert("Please select a detain option (True or False).");
      return;
    }

    const recidivismAssessment = data.compas.find(
      (assessment) => assessment.type_of_assessment === "Risk of Recidivism"
    );

    if (!recidivismAssessment) {
      alert("Risk of Recidivism assessment not found.");
      return;
    }

    const compasScore = recidivismAssessment.decile_score;
    const reoffended = data.is_recid === 1;
    const released = !detain;

    updateScore(numScore, compasScore, detain, reoffended);
    setScore(getScore());
    setFalsePositive(getFalsePositiveRate());
    setFalseNegative(getFalseNegativeRate());
    setTruePositive(getTruePositiveRate());
    setTrueNegative(getTrueNegativeRate());

    setLastDecision({ released, reoffended });
    setShowResultPopup(true);
  };

  const handleResetGame = () => {
      setCaseNumber(1);
      resetGame();
      setScore(0);
      setCompasScore(0);
      setFalsePositive(0);
      setFalseNegative(0);
      setTruePositive(0);
      setTrueNegative(0);
      getData();
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  // Render the fetched data
  return (
    <div>
      <h1>COMPAS Game</h1>

      <h2>
        Case #{caseNumber} - {data.demographics.name}
      </h2>

      <div className="demographics-list">
        <h2>Demographics</h2>
        <ul>
          <li>Age: {data.demographics.age}</li>
          {mode !== "HIDDEN" && <li>Race: {data.demographics.race}</li>}
          <li>Sex: {data.demographics.sex}</li>
        </ul>
      </div>
      {/*
      <h2>Compas Assessments</h2>
      {data.compas.length > 0 ? (
        <ul>
          {data.compas.map((assessment, index) => (
            <li key={index}>
              <strong>Assessment Reason:</strong> {assessment.assessment_reason}
              <br />
              <strong>Decile Score:</strong> {assessment.decile_score}
              <br />
              <strong>Raw Score:</strong> {assessment.raw_score}
              <br />
              <strong>Rec Supervision Level:</strong>{" "}
              {assessment.rec_supervision_level_text}
              <br />
              <strong>Screening Date:</strong> {assessment.screening_date}
              <br />
              <strong>Type of Assessment:</strong>{" "}
              {assessment.type_of_assessment}
            </li>
          ))}
        </ul>
      ) : (
        <p>No compas assessments available.</p>
      )} */}

      <div className="list-container">
        <h2>Previous Charges</h2>
        {data.previous_charges.length > 0 ? (
          <ul>
            {data.previous_charges.map((charge, index) => (
              <li key={index}>
                <strong>Charge:</strong> {charge.charge}
                <br />
                <strong>Degree</strong> {charge.charge_degree}
                <br />
                <strong>Date:</strong> {charge.offense_date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No previous charges available.</p>
        )}
      </div>

      <div className="list-container">
        <h2>Jail History</h2>
        {data.jailhistory.length > 0 ? (
          <ul>
            {data.jailhistory.map((history, index) => (
              <li key={index}>
                <strong>In Custody:</strong> {history.in_custody} to{" "}
                {history.out_custody}
              </li>
            ))}
          </ul>
        ) : (
          <p>No jail history available.</p>
        )}
      </div>

      <div className="list-container">
        <h2>Prison History</h2>
        {data.prisonhistory.length > 0 ? (
          <ul>
            {data.prisonhistory.map((history, index) => (
              <li key={index}>
                <strong>In Custody:</strong> {history.in_custody}
                <br />
                <strong>Out of Custody:</strong> {history.out_custody}
              </li>
            ))}
          </ul>
        ) : (
          <p>No prison history available.</p>
        )}
      </div>

      {/*
      <h2>Recidivism Type Info</h2>
      <ul>
        <li>Is Recidivist: {data.is_recid === 1 ? "Yes" : "No"}</li>
        <li>
          Is Violent Recidivist: {data.is_violent_recid === 1 ? "Yes" : "No"}
        </li>
      </ul>

      <h2>Recidivism Info</h2>
      {data.recid_info ? (
        <ul>
          <li>
            <strong>Number of Recidivism Cases:</strong>{" "}
            {data.recid_info.num_r_cases}
          </li>
          <li>
            <strong>Case Number:</strong> {data.recid_info.r_case_number}
          </li>
          <li>
            <strong>Charge Degree:</strong> {data.recid_info.r_charge_degree}
          </li>
          <li>
            <strong>Charge Description:</strong> {data.recid_info.r_charge_desc}
          </li>
          <li>
            <strong>Days from Arrest:</strong>{" "}
            {data.recid_info.r_days_from_arrest || "N/A"}
          </li>
          <li>
            <strong>Jail In:</strong> {data.recid_info.r_jail_in || "N/A"}
          </li>
          <li>
            <strong>Jail Out:</strong> {data.recid_info.r_jail_out || "N/A"}
          </li>
          <li>
            <strong>Offense Date:</strong> {data.recid_info.r_offense_date}
          </li>
        </ul>
      ) : (
        <p>No recidivism information available.</p>
      )}

      <h2>Violent Recidivism Info</h2>
      {data.violent_recid_info ? (
        <ul>
          <li>
            <strong>Number of Violent Recidivism Cases:</strong>{" "}
            {data.violent_recid_info.num_vr_cases}
          </li>
          <li>
            <strong>Case Number:</strong>{" "}
            {data.violent_recid_info.vr_case_number}
          </li>
          <li>
            <strong>Charge Degree:</strong>{" "}
            {data.violent_recid_info.vr_charge_degree}
          </li>
          <li>
            <strong>Charge Description:</strong>{" "}
            {data.violent_recid_info.vr_charge_desc}
          </li>
          <li>
            <strong>Offense Date:</strong>{" "}
            {data.violent_recid_info.vr_offense_date}
          </li>
        </ul>
      ) : (
        <p>No violent recidivism information available.</p>
      )}
      */}
      {/* Display the Score, False Positive Rate, and False Negative Rate */}
      {/*
    <h2>Metrics</h2>
      <ul>
        <li><strong>Score:</strong> {score}</li>
        <li><strong>Compas Score:</strong> {compasScore}</li>
        <li><strong>False Positive Rate:</strong> {falsePositive}</li>
        <li><strong>False Negative Rate:</strong> {falseNegative}</li>
        <li><strong>True Positive Rate:</strong> {truePositive}</li>
        <li><strong>True Negative Rate:</strong> {trueNegative}</li>
        <li><strong>Detain:</strong> {detain === null ? "Detain not selected" : detain ? "Detain" : "Don't Detain"}</li>
      </ul>
      */}

      <div className="judge-section">
        Risk Score
        <div className="rating-section">
          <div className="rating-grid">
            {/* Low Risk */}
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className={`rating-box ${scoreInput === num ? "selected" : ""}`}
                onClick={() => setScoreInput(num)}
              >
                {num}
              </div>
            ))}
            {/* High Risk*/}
          </div>
        </div>
        {/* Buttons for setting detain value */}
        <div className="detain-section">
          <div
            className={`detain-box ${detain ? "selected" : ""}`}
            onClick={() => setDetain(true)}
          >
            Detain
          </div>
          <div
            className={`detain-box ${detain === false ? "selected" : ""}`}
            onClick={() => setDetain(false)}
          >
            Release
          </div>
        </div>
        <button disabled={loading} onClick={handleUpdateScore}>
          Submit
        </button>
        {showResultPopup && (
          <div
            className="result-popup"
            onClick={() => setShowResultPopup(false)}
          >
            <div className="popup-content">
              <h2>Case Outcome</h2>
              <p>
                <strong>You chose to:</strong>{" "}
                {lastDecision.released ? "Release" : "Detain"}
              </p>
              <p>
                <strong>They actually:</strong>{" "}
                {lastDecision.reoffended ? "Reoffended" : "Did not reoffend"}
              </p>
              <p style={{ marginTop: "12px", fontStyle: "italic" }}>
                (Click this window to continue)
              </p>
            </div>
          </div>
        )}
        {/* 
      <div>
        <button onClick={handleResetGame}>New Game</button>
      </div>
      */}
      </div>
    </div>
  );
};

export { Quiz };