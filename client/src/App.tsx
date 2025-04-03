import React, { useEffect, useState } from "react";
import {
  fetchData,
  ParsedData,
} from "./ParseData";
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

const App = () => {
  const [data, setData] = useState<ParsedData | null>(null);
  const [scoreInput, setScoreInput] = useState<string>("")  
  const [score, setScore] = useState<number | null>(null);
  const [compasScore, setCompasScore] = useState<number | null>(null);
  const [falsePositive, setFalsePositive] = useState<number | null>(null);
  const [falseNegative, setFalseNegative] = useState<number | null>(null);
  const [truePositive, setTruePositive] = useState<number | null>(null);
  const [trueNegative, setTrueNegative] = useState<number | null>(null);
  const [detain, setDetain] = useState<boolean | null>(null); // Track detain value

  const getData = async () => {
    const fetchedData = await fetchData();
    setData(fetchedData);
  };

  // Fetch the data on component mount
  useEffect(() => {
    getData();
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

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScoreInput(event.target.value);
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
    // Find the "Risk of Recidivism" assessment
    const recidivismAssessment = data.compas.find(
      (assessment) => assessment.type_of_assessment === "Risk of Recidivism"
    );
  
    if (recidivismAssessment) {
      const compasScore = recidivismAssessment.decile_score;
      updateScore(numScore, compasScore, detain, data.is_recid === 1 ? true : false);
      setScore(getScore());  // Update the score from AppData
      setFalsePositive(getFalsePositiveRate());  // Update the false positive rate
      setFalseNegative(getFalseNegativeRate());  // Update the false negative rate
      setTruePositive(getTruePositiveRate());  // Update the true positive rate
      setTrueNegative(getTrueNegativeRate());  // Update the true negative rate
      setScoreInput(""); // Clear input field after submission
      setDetain(null); // Reset detain to null after update
      getData(); // Get new entry
    } else {
      alert("Risk of Recidivism assessment not found.");
    }
  }

  const handleResetGame = () => {
    getData()
    resetGame(); // Reset game logic in AppData
    setScore(0); // Update the score in the component state
    setCompasScore(0)
    setFalsePositive(0); // Reset false positive rate
    setFalseNegative(0); // Reset false negative rate
    setTruePositive(0); // Reset true positive rate
    setTrueNegative(0); // Reset true negative rate
  };

  const handleDetainTrue = () => setDetain(true);  // Set detain to true
  const handleDetainFalse = () => setDetain(false);  // Set detain to false

  if (!data) {
    return <div>Loading...</div>;
  }

  // Render the fetched data
  return (
    <div>
      <h1>COMPAS Game</h1>
      <h1>Quiz Game Data</h1>

      <h2>Demographics</h2>
      <ul>
        <li>Name: {data.demographics.name}</li>
        <li>Age: {data.demographics.age}</li>
        <li>Race: {data.demographics.race}</li>
        <li>Sex: {data.demographics.sex}</li>
      </ul>

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
      )}

      <h2>Previous Charges</h2>
      {data.previous_charges.length > 0 ? (
        <ul>
          {data.previous_charges.map((charge, index) => (
            <li key={index}>
              <strong>Charge:</strong> {charge.charge}
              <br />
              <strong>Charge Degree:</strong> {charge.charge_degree}
              <br />
              <strong>Charge Number:</strong> {charge.charge_number}
              <br />
              <strong>Offense Date:</strong> {charge.offense_date}
            </li>
          ))}
        </ul>
      ) : (
        <p>No previous charges available.</p>
      )}

      <h2>Jail History</h2>
      {data.jailhistory.length > 0 ? (
        <ul>
          {data.jailhistory.map((history, index) => (
            <li key={index}>
              <strong>In Custody:</strong> {history.in_custody}
              <br />
              <strong>Out of Custody:</strong> {history.out_custody}
            </li>
          ))}
        </ul>
      ) : (
        <p>No jail history available.</p>
      )}

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

      <h2>Recidivism Type Info</h2>
      <ul>
        <li>Is Recidivist: {data.is_recid === 1 ? "Yes" : "No"}</li>
        <li>
          Is Violent Recidivist: {data.is_violent_recid === 1 ? "Yes" : "No"}
        </li>
      </ul>

      {/* Render Recidivism Info if available */}
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

      {/* Render Violent Recidivism Info if available */}
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
    {/* Display the Score, False Positive Rate, and False Negative Rate */}
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

      {/* Buttons for setting detain value */}
        <div>
        <button onClick={handleDetainTrue}>Set Detain to True</button>
        <button onClick={handleDetainFalse}>Set Detain to False</button>
      </div>

      {/* Textfield for inputting the score */}
      <div>
        <input
          type="text"
          value={scoreInput}
          onChange={handleScoreChange}
          placeholder="Enter score to add"
        />
        <button onClick={handleUpdateScore}>Submit</button>
      </div>

      {/* New Game Button to reset values */}
      <div>
        <button onClick={handleResetGame}>New Game</button>
      </div>
    </div>
  );
};

export default App;
