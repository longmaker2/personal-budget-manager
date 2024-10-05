import React, { useState } from "react";
import "../styles/Login.css";

const Login = ({ onLogin, toggleView }) => {
  const [identifier, setIdentifier] = useState(""); // For username or email
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(identifier, password);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p onClick={toggleView}>Don't have an account? Register here</p>
    </div>
  );
};

export default Login;
