import React, { useEffect,useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Intro from "./components/intro";
import Yes from "./components/Yes";
import Game from "./components/Game";
import Win from "./components/Win";
import Present from "./components/Present";
import End from "./components/End";
import Loader from "./components/Loader";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    const timer = setTimeout(()=> {
      setLoading(false);
    },2000);

    return()=> clearTimeout(timer);
  },[]);


  useEffect(() => {
    const container = document.querySelector(".hearts-bg");
    if (!container) return;

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

    return () => {
      container.innerHTML = "";
    };
  }, [loading]);
  
    if (loading){
    return <Loader />;
    }


  return (
    <HashRouter>
      <div className="hearts-bg" />

      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/yes" element={<Yes />} />
        <Route path="/game" element={<Game />} />
        <Route path="/win" element={<Win />} />
        <Route path="/present" element={<Present />} />
        <Route path="/end" element={<End />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
