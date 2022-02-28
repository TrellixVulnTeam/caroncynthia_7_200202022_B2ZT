import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = () => {
  const [registerModal, setRegisterModal] = useState(true);
  const [loginModal, setLoginModal] = useState(false);

  const handleModels = (e) => {
    if (e.target.id === "register") {
      setLoginModal(false);
      setRegisterModal(true);
    } else if (e.target.id === "login") {
      setRegisterModal(false);
      setLoginModal(true);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModels}
            id="register"
            className={registerModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModels}
            id="login"
            className={loginModal ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {registerModal && <RegisterForm />}
        {loginModal && <LoginForm />}
      </div>
    </div>
  );
};

export default Auth;
