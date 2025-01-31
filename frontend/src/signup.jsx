import { useState } from "react";
import axios from "axios";

const Signup = ({ onSignup, showLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://project-3-y4of.onrender.com/api/users/signup', {
        name,
        email,
        password
      });

    
      setError("");

      
      localStorage.setItem('token', response.data.token);

     
      onSignup();

     
      alert("Sign up successful! Please log in.");
      showLogin();
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed. Please try again.");
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="container active">
      <h1>Sign Up</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <a href="#" onClick={showLogin}>
          Login
        </a>
      </p>
    </div>
  );
};

export default Signup;
