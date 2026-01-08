import "../styles/login.css";
import RegisterForm from "../components/RegisterForm.jsx";
import monitorImg from "../assets/signup-monitor.svg";

export default function Register() {
  return (
    <div className="authPage">
      <div className="authShell authShell--register">

        {/* LEFT: illustration */}
        <aside className="authRight authRight--register">
          <img
            src={monitorImg}
            alt="Sign up illustration"
            className="registerMonitor"
          />
        </aside>

        {/* RIGHT: form */}
        <section className="authLeft authLeft--register">
          <div className="authLeftInner authLeftInner--register">
            <RegisterForm />
          </div>
        </section>

      </div>
    </div>
  );
}
