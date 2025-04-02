import React, { useState } from 'react';
import "./user.css";

function User() {
  const [signupState, setSignupState] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [loginState, setLoginState] = useState({
    email: "",
    password: ""
  });

  const handleSignupChange = (e) => {
    setSignupState({
      ...signupState,
      [e.target.name]: e.target.value
    });
  };
  const handleLoginChange = (e) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value
    });
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/signup/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupState)
      });

      const data = await response.json();
      console.log("Signup Response:", data);

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


  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/signup/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginState)
      });

      const data = await response.json();
      if(data.success === true){
        alert("Login successful!");
      }

      if (response.ok) {
        alert("Login successful!");
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login.");
    }
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
                <form className="flip-card__form" onSubmit={submitLogin}>
                  <input 
                    className="flip-card__input" 
                    name="email" 
                    placeholder="Email" 
                    type="email"  
                    value={loginState.email} 
                    onChange={handleLoginChange} 
                  />
                  <input 
                    className="flip-card__input" 
                    name="password" 
                    placeholder="Password" 
                    type="password"  
                    value={loginState.password} 
                    onChange={handleLoginChange} 
                  />
                  <button className="flip-card__btn" type="submit">Let’s go!</button>
                </form>
              </div>

              {/* Signup Form */}
              <div className="flip-card__back">
                <div className="title">Sign up</div>
                <form className="flip-card__form" onSubmit={submitSignup}>
                  <input
                    className="flip-card__input"
                    name="username"
                    placeholder="Name"
                    type="text"
                    value={signupState.username}
                    onChange={handleSignupChange}
                  />
                  <input
                    className="flip-card__input"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={signupState.email}
                    onChange={handleSignupChange}
                  />
                  <input
                    className="flip-card__input"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={signupState.password}
                    onChange={handleSignupChange}
                  />
                  <button className="flip-card__btn" type="submit">Confirm!</button>
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
