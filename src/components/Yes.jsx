import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Yes.css';
import heeHeeDog from '../img/heeheedog.gif';
import playIcon from '../img/play.png';

const Yes = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="yes-container">
                <div className="frost"></div>
                <h1>Yay! 🎉</h1>
                <h2>Happy Valentine's Day! ❤️</h2>
                <img src={heeHeeDog} alt="Happy Valentine's Day Dog" className='heeheedog' />
                <div className='gameIntro'>
                    <p className='gameText'>If you win this game, you'll get a special gift!
</p>
                    <button className='playBtn' type='button' onClick={() => navigate("/Game")}>
                        <img className='playIcon' src={playIcon} alt="Play Game" aria-hidden="true" /> 
                        <span>Play</span>
                        </button>
                       <p className="gameRule">
  Game Rules: Move your mouse to catch the falling hearts! When you collect 22 hearts, you win.
</p>


                </div>
            </div>

    

        </>
    )
}

export default Yes
