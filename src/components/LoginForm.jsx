import SocialIcons from "./SocialIcons";

export default function LoginForm() {
  return (
    <div className="loginForm">
      <h2 className="loginTitle">Welcome Back!</h2>

      <form className="loginFields" onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label className="label">Username:</label>
          <input className="input" type="text" />
        </div>

        <div className="field">
          <label className="label">Password:</label>
          <input className="input" type="password" />
        </div>

        <button className="loginBtn" type="submit">
          Login
        </button>
      </form>

      <div className="registerRow">
        Don&apos;t have an account? <span className="registerLink">Register</span>
      </div>

      <SocialIcons />
    </div>
  );
}