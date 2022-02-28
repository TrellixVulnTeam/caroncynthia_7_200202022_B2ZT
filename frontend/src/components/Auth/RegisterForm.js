import React, { useState } from "react";
import LoginForm from "./LoginForm";

const RegisterForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const register = { firstname, lastname, username, password, email };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(register);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}auth/register`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setFormSubmit(true);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      {formSubmit ? (
        <>
          <LoginForm />
          <h4 className="Success">
            Inscription réussie ! Veuillez vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="register-form">
          <label htmlFor="firstname">Prénom</label>
          <br />
          <input
            type="text"
            name="firstname"
            id="firstname"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
          />
          <br />
          <label htmlFor="lastname">Nom</label>
          <br />
          <input
            type="text"
            name="lastname"
            id="lastname"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
          />
          <br />
          <label htmlFor="username">Pseudo</label>
          <br />
          <input
            type="text"
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <input type="submit" id="submit-btn" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default RegisterForm;
