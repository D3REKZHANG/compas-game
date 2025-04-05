import judgePhoto from './assets/judge.png'
import './Menu.css'

const Menu = ({ setGamestate }) => {

  return (
    <div>
      <h1> COMPAS Game </h1>

      <div className="menu-container">
        <img src={judgePhoto} alt="Judge Photo" style={{ width: "250px", height: "100%" }} />
        <div className="buttons">
          <button onClick={() => setGamestate("INTRO")}> Play </button>
          <button onClick={() => setGamestate("LEADERBOARD")}> Leaderboard</button>
          <button onClick={() => setGamestate("REFERENCES")}> References</button>
        </div>
      </div>
    </div>
  );
};

export { Menu };
