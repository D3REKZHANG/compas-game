// src/App.tsx
import React, { useEffect, useState } from 'react';
import { fetchData, ParsedData } from './AppData';

const App = () => {
  const [data, setData] = useState<ParsedData | null>(null);

  // Fetch the data on component mount
  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    getData();
  }, []);

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
              <strong>Rec Supervision Level:</strong> {assessment.rec_supervision_level_text}
              <br />
              <strong>Screening Date:</strong> {assessment.screening_date}
              <br />
              <strong>Type of Assessment:</strong> {assessment.type_of_assessment}
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

      <h2>Recidivism Info</h2>
      <ul>
        <li>Is Recidivist: {data.is_recid === 1 ? 'Yes' : 'No'}</li>
        <li>Is Violent Recidivist: {data.is_violent_recid === 1 ? 'Yes' : 'No'}</li>
      </ul>

      {/* Render Recidivism Info if available */}
      <h2>Recidivism Info</h2>
      {data.recid_info ? (
        <ul>
          <li><strong>Number of Recidivism Cases:</strong> {data.recid_info.num_r_cases}</li>
          <li><strong>Case Number:</strong> {data.recid_info.r_case_number}</li>
          <li><strong>Charge Degree:</strong> {data.recid_info.r_charge_degree}</li>
          <li><strong>Charge Description:</strong> {data.recid_info.r_charge_desc}</li>
          <li><strong>Days from Arrest:</strong> {data.recid_info.r_days_from_arrest || 'N/A'}</li>
          <li><strong>Jail In:</strong> {data.recid_info.r_jail_in || 'N/A'}</li>
          <li><strong>Jail Out:</strong> {data.recid_info.r_jail_out || 'N/A'}</li>
          <li><strong>Offense Date:</strong> {data.recid_info.r_offense_date}</li>
        </ul>
      ) : (
        <p>No recidivism information available.</p>
      )}

      {/* Render Violent Recidivism Info if available */}
      <h2>Violent Recidivism Info</h2>
      {data.violent_recid_info ? (
        <ul>
          <li><strong>Number of Violent Recidivism Cases:</strong> {data.violent_recid_info.num_vr_cases}</li>
          <li><strong>Case Number:</strong> {data.violent_recid_info.vr_case_number}</li>
          <li><strong>Charge Degree:</strong> {data.violent_recid_info.vr_charge_degree}</li>
          <li><strong>Charge Description:</strong> {data.violent_recid_info.vr_charge_desc}</li>
          <li><strong>Offense Date:</strong> {data.violent_recid_info.vr_offense_date}</li>
        </ul>
      ) : (
        <p>No violent recidivism information available.</p>
      )}
    </div>
  );
};

export default App;
