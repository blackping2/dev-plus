import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialIcons from "./SocialIcons";

export default function RegisterForm() {
  const navigate = useNavigate(); // ✅ 추가

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [msg, setMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    // ✅ 검증(예시)
    if (!fullName || !username || !email || !pw || !pw2) {
      setMsg("❌ 모든 항목을 입력해주세요.");
      return;
    }
    if (pw !== pw2) {
      setMsg("❌ 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!email.includes("@") || !email.includes(".com")) {
      setMsg("❌ 이메일 형식이 올바르지 않습니다.");
      return;
    }

    // ✅ 성공 처리
    setMsg("✅ 회원가입 성공! 로그인 페이지로 이동합니다...");

    // ✅ 1) 바로 이동(즉시)
    // navigate("/");

    // ✅ 2) 0.8초 후 이동(메시지 잠깐 보여주고)
    setTimeout(() => navigate("/"), 800);
  }

  return (
    <div className="loginForm">
      <h2 className="loginTitle">Please Fill out form to Register!</h2>

      <form className="loginFields" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Full name:</label>
          <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>

        <div className="field">
          <label className="label">Username:</label>
          <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="field">
          <label className="label">Email:</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="field">
          <label className="label">Password:</label>
          <input className="input" type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
        </div>

        <div className="field">
          <label className="label">Confirm Password:</label>
          <input className="input" type="password" value={pw2} onChange={(e) => setPw2(e.target.value)} />
        </div>

        <button className="loginBtn" type="submit">
          Register
        </button>
      </form>

      {msg && <div style={{ textAlign: "center", marginTop: 10 }}>{msg}</div>}

      <div className="registerRow">
        Yes i have an account?{" "}
        <Link to="/" className="registerLink">
          Login
        </Link>
      </div>

      <SocialIcons />
    </div>
  );
}
