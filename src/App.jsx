import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Intro from "./components/intro";
import Yes from "./components/Yes";
import Game from "./components/Game";
import Win from "./components/Win";
import Present from "./components/Present";
import End from "./components/End";
import "./App.css";

function App() {
  useEffect(() => {
    const container = document.querySelector(".hearts-bg");
    if (!container) return;

    // Clear old hearts (prevents duplicates in dev / re-renders)
    container.innerHTML = "";

    for (let i = 0; i < 50; i++) {
      const heart = document.createElement("span");
      heart.className = "heart";

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 5 + Math.random() * 6 + "s";
      heart.style.animationDelay = Math.random() * 5 + "s";
      heart.style.transform = `scale(${0.5 + Math.random()})`;

      container.appendChild(heart);
    }

    // Cleanup on unmount
    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <BrowserRouter>
      {/* Background hearts */}
      <div className="hearts-bg" />

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/yes" element={<Yes />} />
        <Route path="/game" element={<Game />} />
        <Route path="/win" element={<Win />} />
        <Route path="/present" element={<Present />} />
        <Route path="/end" element={<End />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
