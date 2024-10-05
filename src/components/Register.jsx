import React, { useState } from "react";
import "../styles/Register.css";

/**
 * Register Component
 *
 * This component renders a registration form for users to sign up by providing a username, email, and password.
 * It handles the input and form submission for registration and allows users to toggle to the login view.
 *
 * Props:
 * - onRegister: Function to handle the registration process. Expects three arguments: the username, email, and password.
 * - toggleView: Function to toggle between the registration and login views.
 */
const Register = ({ onRegister, toggleView }) => {
  // State for the user's username, email, and password
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * handleSubmit
   *
   * This function is triggered when the registration form is submitted.
   * It calls the `onRegister` function passed as a prop, sending the username, email, and password.
   *
   * @param {Object} e - The event object from form submission.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    onRegister(username, email, password); // Call the onRegister prop with username, email, and password
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>

      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
        {/* Input field for the user's username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Input field for the user's email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Input field for the user's password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Submit button to register */}
        <button type="submit">Register</button>
      </form>

      {/* Option to toggle to the login view */}
      <p onClick={toggleView}>Already have an account? Login here</p>
    </div>
  );
};

export default Register;
