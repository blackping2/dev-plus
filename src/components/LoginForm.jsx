import { useState } from "react";
import SocialIcons from "./SocialIcons";

export default function LoginForm() {
  // 1️⃣ 상태 선언
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // 2️⃣ 로그인 버튼 클릭 시 실행
  function handleLogin(e) {
    e.preventDefault(); // form 기본 동작 막기

    if (username === "test" && password === "1234") {
      setMessage("✅ Login Success");
    } else {
      setMessage("❌ Login Failed");
    }
  }

  return (
    <div className="loginForm">
      <h2 className="loginTitle">Welcome Back!</h2>

      {/* 3️⃣ form에 onSubmit 연결 */}
      <form className="loginFields" onSubmit={handleLogin}>
        <div className="field">
          <label className="label">Username:</label>
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="label">Password:</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="loginBtn" type="submit">
          Login
        </button>
      </form>

      {/* 4️⃣ 성공 / 실패 메시지 출력 */}
      {message && (
        <div style={{ textAlign: "center", marginTop: 12 }}>
          {message}
        </div>
      )}

      <div className="registerRow">
        Don&apos;t have an account? <span className="registerLink">Register</span>
      </div>

      <SocialIcons />
    </div>
  );
}
