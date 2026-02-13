import React from "react";
import { useNavigate } from "react-router-dom";
import "./Win.css";


export default function Win() {
    const navigate = useNavigate();


    return (
        <div className="win-page">
            <div className="panel">
                <h1>🎉 Congratulations!</h1>
                <h2>You caught 22 hearts!</h2>
                <p>
                    To see your Valentine’s Day present, click Next!
                </p>

            </div>

            <button className='nextBtn' onClick={() => navigate("/present")}>Next →</button>

        </div>
    );
}
