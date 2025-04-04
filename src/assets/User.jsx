import React, { useState, useRef } from "react";
import "./user.css";

function User() {
  const [signupState, setSignupState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  const debounceTimeout = useRef(null);

  const handleSignupChange = (e) => {
    setSignupState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLoginChange = (e) => {
    setLoginState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_LINK}/signup/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupState),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! Please log in.");
      } else {
        alert(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred during signup.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_LINK}/signup/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginState),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Login successful!");
        } else {
          alert(data.message || "Login failed.");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred during login.");
      }
    }, 500);
  };

  return (
    <div className="div">
      <div className="wrapper">
        <div className="card-switch">
          <label className="switch">
            <input type="checkbox" className="toggle" />
            <span className="slider"></span>
            <span className="card-side"></span>
            <div className="flip-card__inner">
              {/* Login Form */}
              <div className="flip-card__front">
                <div className="title">Log in</div>
                <form className="flip-card__form" onSubmit={handleLoginSubmit} method="post" autoComplete="off">
                  <input
                    className="flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={loginState.email}
                    onChange={handleLoginChange}
                    autoComplete="off"
                  />
                  <input
                    className="flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={loginState.password}
                    onChange={handleLoginChange}
                    autoComplete="new-password"
                  />
                  <button className="flip-card__btn" type="submit">
                    Let’s go!
                  </button>
                </form>
              </div>

              {/* Signup Form */}
              <div className="flip-card__back">
                <div className="title">Sign up</div>
                <form className="flip-card__form" onSubmit={submitSignup} method="post" autoComplete="off">
                  <input
                    className="flip-card__input"
                    name="username"
                    placeholder="Name"
                    type="text"
                    value={signupState.username}
                    onChange={handleSignupChange}
                    autoComplete="off"
                  />
                  <input
                    className="flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={signupState.email}
                    onChange={handleSignupChange}
                    autoComplete="off"
                  />
                  <input
                    className="flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={signupState.password}
                    onChange={handleSignupChange}
                    autoComplete="new-password"
                  />
                  <button className="flip-card__btn" type="submit">
                    Confirm!
                  </button>
                </form>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}

export default User;
