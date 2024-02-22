import React, { useContext, useState } from "react";
import "../stylesheets/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigator = useNavigate();
  const { setRefresh } = useContext(AuthContext);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const redirectToHomePage = () => {
    navigator("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (!user.email || !user.password) {
      setError("Please fill in all details.");
      return;
    }

    const res = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      setRefresh(true);
      redirectToHomePage();
    } else {
      setError("Incorrect Email or Password");
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
    // Redirect to home page
    redirectToHomePage();
  };

  return (
    <div className="center">
      <div className="container">
        <div className="text">Login Form</div>
        <form>
          <div className="data">
            <label>Email</label>
            <input
              type="email"
              name={"email"}
              required
              onChange={handleChange}
              value={user.email}
            />
          </div>
          <div className="data">
            <label>Password</label>
            <input
              type="password"
              name={"password"}
              required
              onChange={handleChange}
              value={user.password}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="btn">
            <div className="inner"></div>
            <button type="submit" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <div className="signup-link">
            Not a member? <Link to={"/register"}>Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
