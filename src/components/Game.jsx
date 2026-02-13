import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";

const HEART_SIZE = 30;
const CATCHER_WIDTH = 70;
const WIN_SCORE = 22;
const START_LIVES = 3;

export default function Game() {
    const navigate = useNavigate();
    const navigatedRef = useRef(false);

    const gameRef = useRef(null);
    const animationRef = useRef(null);

    const [hearts, setHearts] = useState([]);
    const [catcherX, setCatcherX] = useState(0);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(START_LIVES);
    const [running, setRunning] = useState(true);

    // center catcher on mount 
    useEffect(() => {
        const center = () => {
            const width = gameRef.current?.offsetWidth ?? 0;
            const x = Math.max(0, width / 2 - CATCHER_WIDTH / 2);
            setCatcherX(x);
        };
        center();
        window.addEventListener("resize", center);
        return () => window.removeEventListener("resize", center);
    }, []);

    // Spawn hearts (harder as score increases)
    useEffect(() => {
        if (!running) return;

        const interval = Math.max(250, 800 - score * 18);

        const spawn = setInterval(() => {
            const width = gameRef.current?.offsetWidth ?? 320;
            const baseSpeed = 2.5 + score * 0.06;

            setHearts((prev) => [
                ...prev,
                {
                    id: Date.now() + Math.random(),
                    x: Math.random() * (width - HEART_SIZE),
                    y: -40,
                    speed: baseSpeed + Math.random() * 2.2,
                    drift: (Math.random() - 0.5) * (0.35 + score * 0.01),
                },
            ]);
        }, interval);

        return () => clearInterval(spawn);
    }, [running, score]);

    // Game loop
    useEffect(() => {
        if (!running) return;

        const loop = () => {
            const gameWidth = gameRef.current?.offsetWidth ?? 320;
            const catcherTop = (gameRef.current?.offsetHeight ?? 420) - 40;

            setHearts((prev) =>
                prev
                    .map((h) => {
                        let nx = h.x + h.drift;
                        if (nx < 0) nx = 0;
                        if (nx > gameWidth - HEART_SIZE) nx = gameWidth - HEART_SIZE;
                        return { ...h, x: nx, y: h.y + h.speed };
                    })
                    .filter((h) => {
                        const hit =
                            h.y + HEART_SIZE > catcherTop &&
                            h.x < catcherX + CATCHER_WIDTH &&
                            h.x + HEART_SIZE > catcherX;

                        if (hit) {
                            setScore((s) => {
                                const newScore = s + 1;

                                if (newScore >= WIN_SCORE && !navigatedRef.current) {
                                    navigatedRef.current = true;
                                    setRunning(false);
                                    setTimeout(() => navigate("/win"), 300);
                                }

                                return newScore;
                            });

                            return false;
                        }

                        const gameHeight = gameRef.current?.offsetHeight ?? 420;
                        if (h.y > gameHeight + 20) {
                            setLives((l) => {
                                const newLives = l - 1;
                                if (newLives <= 0) setRunning(false);
                                return newLives;
                            });
                            return false;
                        }

                        return true;
                    })
            );

            animationRef.current = requestAnimationFrame(loop);
        };

        animationRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animationRef.current);
    }, [catcherX, running, navigate]);

    // Move catcher
    const moveCatcher = (e) => {
        if (!running) return;
        if (!gameRef.current) return;

        const rect = gameRef.current.getBoundingClientRect();
        const clientX = e.touches?.[0]?.clientX ?? e.clientX;

        let nextX = clientX - rect.left - CATCHER_WIDTH / 2;
        const maxX = rect.width - CATCHER_WIDTH;
        nextX = Math.max(0, Math.min(nextX, maxX));
        setCatcherX(nextX);
    };

    const restart = () => {
        navigatedRef.current = false;
        setHearts([]);
        setScore(0);
        setLives(START_LIVES);
        setRunning(true);

        const width = gameRef.current?.offsetWidth ?? 0;
        setCatcherX(Math.max(0, width / 2 - CATCHER_WIDTH / 2));
    };

    return (
        <div className="game-page">
            <div className="header">
                <h1>❤️ Heart Catcher</h1>
                <div className="hud">
                    Score: {score} / {WIN_SCORE} <span className="sep">|</span> Lives: {lives}
                </div>
            </div>

            <div
                ref={gameRef}
                className="game"
                onMouseMove={moveCatcher}
                onTouchMove={moveCatcher}
            >
                {hearts.map((h) => (
                    <div key={h.id} className="heart" style={{ left: h.x, top: h.y }}>
                        ❤️
                    </div>
                ))}

                <div className="catcher" style={{ left: catcherX, width: CATCHER_WIDTH }} />

                {!running && (
                    <div className="overlay">
                        <h2>💔 Game Over</h2>
                        <p className="overlayText">Try again — it gets faster as you score!</p>
                        <button onClick={restart}>Retry</button>
                    </div>
                )}
            </div>
        </div>
    );
}
