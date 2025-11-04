import "./auth.css";
import { useState, useEffect } from "react";
import Nav from "../../components/nav/Nav";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useLocation } from "react-router-dom";

export default function Auth() {
  const location = useLocation();
  const [formMode, setFormMode] = useState<"login" | "signup">();
  useEffect(() => {
    if (location.state?.formMode) {
      setFormMode(location.state.formMode);
    }
  }, [location.state]);
  return (
    <div className="auth">
      <Nav content={false} />
      <div className="auth-wrapper">
        <div className="auth-banner">
          <img src="images/auth-banner.png" alt="auth-banner" />
        </div>
        <div className="auth-content">
          {formMode === "login" ? (
            <LoginForm
              switchHandler={() => setFormMode("signup")}
              mode="login"
            />
          ) : (
            <SignupForm
              switchHandler={() => setFormMode("login")}
              mode="signup"
            />
          )}
        </div>
      </div>
    </div>
  );
}
