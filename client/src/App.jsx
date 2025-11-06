import React from "react";
import './App.css'
import "./index.css";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";

function App() {
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
        {/* Render the Home view directly (no children) */}
        <Home />
      </main>
    </div>
  );
}

export default App;
