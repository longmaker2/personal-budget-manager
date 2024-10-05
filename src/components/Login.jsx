import React, { useState } from "react";
import "../styles/Login.css";

/**
 * Login Component
 *
 * This component renders a login form for the user to log in with their username or email and password.
 * It handles the input and form submission for logging in and allows users to toggle to the registration view.
 *
 * Props:
 * - onLogin: Function to handle the login process. Expects two arguments: the identifier (either username or email) and the password.
 * - toggleView: Function to toggle between the login and registration views.
 */
const Login = ({ onLogin, toggleView }) => {
  // State for the user's identifier (username or email) and password
  const [identifier, setIdentifier] = useState(""); // For username or email
  const [password, setPassword] = useState("");

  /**
   * handleSubmit
   *
   * This function is triggered when the login form is submitted.
   * It calls the `onLogin` function passed as a prop, sending the identifier and password.
   *
   * @param {Object} e - The event object from form submission.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    onLogin(identifier, password); // Call the onLogin prop with identifier and password
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        {/* Input field for the user's identifier (either username or email) */}
        <input
          type="text"
          placeholder="Username or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />

        {/* Input field for the password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit button to log in */}
        <button type="submit">Login</button>
      </form>

      {/* Option to toggle to the registration view */}
      <p onClick={toggleView}>Don't have an account? Register here</p>
    </div>
  );
};

export default Login;
