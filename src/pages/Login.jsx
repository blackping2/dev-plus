import LoginForm from "../components/LoginForm";
import "../styles/login.css";

export default function Login() {
  return (
    <div className="authPage">
      <div className="authShell">
        {/* LEFT */}
        <section className="authLeft">
          <div className="authLeftInner">
            <LoginForm />
          </div>
        </section>

        {/* RIGHT (이미지 없이 목업) */}
        <aside className="authRight">
          <div className="visualMock">
            <div className="visualCard" />
          </div>
        </aside>
      </div>
    </div>
  );
}