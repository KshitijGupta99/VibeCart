import React from "react";
import './App.css'
import "./index.css";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const isSignedIn = Boolean(localStorage.getItem("token") || localStorage.getItem("userId"));

  return (
    <div className="app-shell">
      <aside className="vb-sidebar">
        <div className="vb-header">
          <div className="vb-logo">VC</div>
          <div>
            <div className="vb-title">VibeCart</div>
            <div className="vb-sub">Shop the vibe</div>
          </div>
        </div>

        <Sidebar />
      </aside>

      <main className="vb-main">
        <Routes>
          <Route
            path="/"
            element={isSignedIn ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={isSignedIn ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/signup"
            element={isSignedIn ? <Navigate to="/" replace /> : <Signup />}
          />
          {/* fallback */}
          <Route path="*" element={<Navigate to={isSignedIn ? "/" : "/login"} replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
