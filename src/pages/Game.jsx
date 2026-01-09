import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dino.css";
import dinoWalk1 from "../assets/dino/trex_game_walk1.png";
import dinoWalk2 from "../assets/dino/trex_game_walk2.png";
import dinoJump from "../assets/dino/trex_game_jump.png";
import dinoHit from "../assets/dino/trex_game_hit.png";
import cactus from "../assets/obstacle/cactus.png";

export default function Game() {
  const navigate = useNavigate();

  // 게임 상태
  const [running, setRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  
  // 현재 프레임 상태
  const [walkFrame, setWalkFrame] = useState(0);

  // 점수
  const [score, setScore] = useState(0);

  // ✅ 공룡 상태
  const [dinoState, setDinoState] = useState("walk");

  // 공룡 위치 (바닥 기준 y)
  const GROUND_Y = 0;
  const [dinoY, setDinoY] = useState(GROUND_Y);

  // 장애물 x
  const [obsX, setObsX] = useState(800);

  // 장애물 속도
  const [speed, setSpeed] = useState(6);       

  // 물리 값 (ref로 두면 interval에서 안정적)
  const velocityRef = useRef(0);
  const jumpingRef = useRef(false);

  // 상수
  const GRAVITY = 0.9;
  const JUMP_V = 26;     // 점프 세기
  const FRAME = 16;      // 약 60fps
  const START_X = 800;

  // Space 키로 점프
  useEffect(() => {
    function onKeyDown(e) {
      if (e.code !== "Space") return;
      e.preventDefault();
      if (!running || gameOver) return;

      // 바닥에 있을 때만 점프
      if (!jumpingRef.current) {
        jumpingRef.current = true;
        velocityRef.current = JUMP_V;
        setDinoState("jump");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [running, gameOver]);

  useEffect(() => {
  // 1000점마다 속도 +1
  const nextSpeed = 6 + Math.floor(score / 1000);
  setSpeed(nextSpeed);
 }, [score]);

  // 게임 루프
  useEffect(() => {
    if (!running || gameOver) return;

    const timer = setInterval(() => {
      // 1) 점수 증가
      setScore((s) => s + 1);

      // 2) 공룡 물리(점프)
      setDinoY((y) => {
        let nextY = y + velocityRef.current;
        velocityRef.current -= GRAVITY;

        // 바닥 착지
        if (nextY <= GROUND_Y) {
          nextY = GROUND_Y;
          velocityRef.current = 0;
          jumpingRef.current = false;
          setDinoState("walk");
        }
        return nextY;
      });

      // 3) 장애물 이동
      setObsX((x) => {
        let nextX = x - speed;
        if (nextX < -60) {
            nextX = START_X + Math.random() * 300;
        } // 다시 오른쪽으로
        return nextX;
      });
    }, FRAME);

    return () => clearInterval(timer);
  }, [running, gameOver, speed]);

  // 충돌 체크 (단순 AABB)
  useEffect(() => {
    if (!running || gameOver) return;

    // dino box: x=80, y=dinoY
    const dino = { x: 80, y: dinoY, w: 56, h: 60 };
    // obstacle: x=obsX
    const obs = { x: obsX, y: 0, w: 36, h: 60 };

    const hit =
      dino.x < obs.x + obs.w &&
      dino.x + dino.w > obs.x &&
      dino.y < obs.y + obs.h &&
      dino.y + dino.h > obs.y;

    if (hit) {
      setDinoState("hit");
      setRunning(false);
      
      setTimeout(() => {
        setGameOver(true);
      }, 300);
    }
  }, [dinoY, obsX, running, gameOver]);

  useEffect(() => {
    if (dinoState !== "walk") return;

    const timer = setInterval(() => {
        setWalkFrame((f) => (f === 0 ? 1 : 0));
    }, 200);

        return () => clearInterval(timer);
    }, [dinoState]);

  function getDinoImage() {
    if (dinoState === "jump") return dinoJump;
    if (dinoState === "hit") return dinoHit;
    return walkFrame === 0 ? dinoWalk1 : dinoWalk2;
}


  function restart() {
    setScore(0);
    setDinoY(0);
    setObsX(START_X);
    setDinoState("walk");
    velocityRef.current = 0;
    jumpingRef.current = false;
    setGameOver(false);
    setRunning(true);
}

  return (
    <div className="dinoPage">
      <div className="dinoShell gameShell">
        <header className="gameTop">
          <div>
            <div className="label">SCORE</div>
            <div className="value">{score}</div>
          </div>

          <div className="row">
            <button className="ghostBtn" onClick={() => navigate("/home")}>
              Home
            </button>
            <button className="ghostBtn" onClick={() => navigate("/")}>
              Logout
            </button>
          </div>
        </header>

        <div className="stage">
          <div className="ground" />

          {/* 공룡 */}
          <div
            className="dino"
            style={{
                transform: `translateY(${-dinoY}px)`,
                backgroundImage: `url(${getDinoImage()})`,
             }}
            />


          {/* 장애물 */}
          <div 
            className="obstacle"
            style={{
                transform: `translateX(${obsX}px)`,
                backgroundImage: `url(${cactus})`,
            }}
            />
        </div>

        <div className="hintBar">
          <span>Press Space to Jump</span>
          {gameOver && <span className="overText">Game Over</span>}
        </div>

        {gameOver && (
          <div className="overlay">
            <div className="modal">
              <h2>Game Over</h2>
              <p>Your score: {score}</p>
              <button className="primaryBtn" onClick={restart}>
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
