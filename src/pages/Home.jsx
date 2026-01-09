import { useNavigate } from "react-router-dom";
import "../styles/dino.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="dinoPage">
      <div className="dinoShell">
        <h1 className="dinoTitle">Dino Runner</h1>
        <p className="dinoSub">Press Start, then Space to jump.</p>

        <div className="homeBtns">
          <button className="primaryBtn" onClick={() => navigate("/game")}>
            Start Game
          </button>
          <button className="ghostBtn" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
