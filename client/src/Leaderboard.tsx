import React, { useEffect, useState } from "react";
import { fetchLeaderboard, Leaderboard } from "./GetLeaderboard";
import './Leaderboard.css'; // Import the CSS file

const LeaderboardScreen = ({ setGamestate }) => {
  const [leaderboard1, setLeaderboard1] = useState<Leaderboard>([]);
  const [leaderboard2, setLeaderboard2] = useState<Leaderboard>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const leaderboard1Data = await fetchLeaderboard(1);
      const leaderboard2Data = await fetchLeaderboard(2);

      if (leaderboard1Data) setLeaderboard1(leaderboard1Data);
      if (leaderboard2Data) setLeaderboard2(leaderboard2Data);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1> COMPAS Game </h1>
      <button onClick={() => setGamestate("MENU")}> Home </button>
      <div className="leaderboard-container">
        {/* Leaderboard 1 */}
        <div className="leaderboard-box">
          <h2>Recidivism Quiz Leaderboard <br/> No Demographic Data</h2>
          <ul className="leaderboard-list">
            {leaderboard1.map(([name, score], index) => (
              <li key={index}>
                {index + 1}. {name}: {score}
              </li>
            ))}
          </ul>
        </div>

        {/* Leaderboard 2 */}
        <div className="leaderboard-box">
          <h2>Recidivism Quiz Leaderboard <br/> With Demographic Data</h2>
          <ul className="leaderboard-list">
            {leaderboard2.map(([name, score], index) => (
              <li key={index}>
                {index + 1}. {name}: {score}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { LeaderboardScreen };
