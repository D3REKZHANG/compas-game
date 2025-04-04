import judgePhoto from './istockphoto-1404501041-612x612.jpg';

const Menu = ({ setGamestate }) => {

  return (
    <div>
      <h1> COMPAS Game </h1>

      <p>
        <img src={judgePhoto} alt="Judge Photo" style={{ width: "20%", height: "auto" }} />
      </p>
      <button onClick={() => setGamestate("INTRO")}> Recidivism Quiz</button>
      <button onClick={() => setGamestate("LEADERBOARD")}> Leaderboard</button>
      <button onClick={() => setGamestate("REFERENCES")}> References</button>
    </div>
  );
};

export { Menu };
