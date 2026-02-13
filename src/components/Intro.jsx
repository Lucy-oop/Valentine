import React,{ useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import dogGif from '../img/dog1.gif'
import './Intro.css';

const Intro = () => {

    const navigate = useNavigate();
    const noRef = useRef(null);

    const moveNoButton = () => {
        const x = Math.random()* 200 - 100;
        const y = Math.random()* 120 - 60;

      if(noRef.current){
        noRef.current.style.transform = `translate(${x}px,${y}px)`;
      }

    };
    return (
        <>
            <div className="intro-container">
                <div className="frost"></div>
                <img src={dogGif} alt="Silly Dog" width="300" className='dog'/>
                <h1>Will you be my Valentine?</h1>
                <div className='allbtn'>
                    <button className='yesBtn' 
                    onClick={()=> navigate('/yes')}>Yes</button>
                    <button className='noBtn'
                    onMouseEnter={moveNoButton} ref={noRef}>No</button>
                </div>





            </div>

        </>
    )
}
export default Intro

