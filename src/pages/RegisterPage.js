import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  let body = {};

  const handleSubmit = () => {
    fetch("http://127.0.0.1:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    }).then((res) => {
      console.log("New User added! : " + res);
    });
  };

  const onButtonClick = () => {
    // Set initial error values to empty

    setEmailError("");
    setPasswordError("");

    // Check if the user has entered both fields correctly
    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }
    body = JSON.stringify({
      email: email,
      password: password,
    });

    handleSubmit();
    // Authentication calls will be made here...
    navigate("/login");
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Registrierung</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here!"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Registrieren"}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
