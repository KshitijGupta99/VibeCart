import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const togglePass = (e) => {
    const eye = e.target;
    const x = document.getElementById("password");

    if (x.type === "password") {
      x.type = "text";
      eye.src = "eyeopen.png";
    } else {
      x.type = "password";
      eye.src = "eyebrowClose.png";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const response = await fetch(`${url}/user/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const payload = await response.json().catch(() => ({}));

      if (response.ok) {
        localStorage.setItem("token", payload?.token || "");
        localStorage.setItem("userId", payload?.userId || "");
        // ensure App notices new auth state — refresh route (temporary)
        navigate("/"); 
        // force full reload if App still reads stale auth state
        setTimeout(() => window.location.reload(), 120);
      } else {
        // show server-provided message if available
        setErrorMsg(payload?.message || payload?.error || "Login failed");
      }
    } catch (err) {
      setErrorMsg(err?.message || "Network error");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center shadow" style={{ marginTop: "2vh", backgroundColor: "#f8f9fa", borderRadius: "3vh", maxHeight: "60vh", border: "2px solid #ddd", textAlign: "center", padding: "2rem" }}>
      <div className="w-100">
        <h3 className="text-center mb-4" style={{ color: "#343a40", fontFamily: "Verdana" }}>
          Login
        </h3>

        {/* Error message */}
        {errorMsg && (
          <div className="alert alert-danger" role="alert" style={{ textAlign: "left", maxWidth: 480, margin: "0 auto 1rem" }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ fontFamily: "Verdana" }}>
          {/* Username Field */}
          <div className="form-group mb-4">
            <label htmlFor="username" className="d-block text-start mb-2" style={{ fontSize: "1.1em", color: "#495057" }}>
              Enter Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-control"
              style={{
                height: "50px",
                fontSize: "1rem",
                border: "1px solid #ced4da",
                borderRadius: "0.5rem",
                padding: "0.5rem",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                outline: "none",
              }}
            />
          </div>

          {/* Password Field */}
          <div className="form-group mb-4">
            <label htmlFor="password" className="d-block text-start mb-2" style={{ fontSize: "1.1em", color: "#495057" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
                style={{
                  height: "50px",
                  fontSize: "1rem",
                  border: "1px solid #ced4da",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                  paddingRight: "3rem",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  outline: "none",
                }}
              />
              <img src="eyebrowClose.png" alt="Toggle Password" style={{ position: "absolute", top: "50%", right: "1rem", transform: "translateY(-50%)", height: "24px", cursor: "pointer" }} onClick={togglePass} />
            </div>
          </div>

          {/* Buttons */}
          <button type="submit" className="btn btn-primary btn-block w-100 mt-3" style={{ height: "50px", fontSize: "1rem", borderRadius: "0.5rem", backgroundColor: "#007bff", borderColor: "#007bff", transition: "all 0.3s ease" }}>
            Login
          </button>

          {/* Links */}
          <div className="mt-4">
            <span style={{ color: "#6c757d", fontSize: "0.9rem" }}>
              New User?{" "}
              <Link to="/signup" className="text-decoration-none" style={{ color: "#007bff" }}>
                Click Here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
