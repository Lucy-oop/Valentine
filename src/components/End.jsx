import React,{useState, useEffect} from 'react'
import './End.css'
import Confetti from 'react-confetti';

const End = () => {
    const  [showConfetti, setShowConfetti] = useState(true);
    const [showText, setShowText] = useState(false);
    const [fadeConfetti, setFadeConfetti] = useState(false);

    useEffect(()=> {
        setTimeout(()=> {
            setShowText(true);
        },1000);
        setTimeout(()=>{
            setFadeConfetti(true);
        },5000);
        setTimeout(()=> {
            setShowConfetti(false);
        },6000);
    },[]);

  return (
    <div className='endcontainer'>
        {showConfetti && (<div className={`confetti-wrapper ${fadeConfetti ? 'fade-out' : ''}`}><Confetti /> </div>)}
        {showText && (
            <div className="end-text">
                <h1>🎉 Congratulations! 🎉</h1>
          <h2>You got your Valentine’s Day present 💝</h2>
          <p>Bye… see you soon 💕</p>
          </div>
        )}

    </div>
  )
}

export default End