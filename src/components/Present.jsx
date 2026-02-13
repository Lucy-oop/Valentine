import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Present.css'
import middleImg from '../img/middlefingerdog.gif';
import Chocolate from '../img/chocolate.png';
import Plant from '../img/plant.jpg';
import cardFront from '../img/cardfront.jpg';

const Present = () => {
    const navigate = useNavigate();
    return (
        <div className="present-page">
            <p>Flip The Present!</p>
            <div className='flipcards'>
                <div className='flip1'>
                    <div className='flip-inner'>
                        <div className='flip-front'>
                            <img src={cardFront} alt="Card Front" />
                           
                        </div>
                        <div className='flip-back'>
                            <img src={Chocolate} alt="Chocolate"  />
                            <p>Chocolate!</p>
                            

                        </div>

                    </div>
                </div>

                 <div className='flip2'>
                    <div className='flip-inner'>
                        <div className='flip-front'>
                            <img src={cardFront} alt="Card Front" />
                           
                        </div>
                        <div className='flip-back'>
                            <img src={middleImg} alt="Middle Finger Dog" />
             

                        </div>

                    </div>
                </div>

                 <div className='flip3'>
                    <div className='flip-inner'>
                        <div className='flip-front'>
                            <img src={cardFront} alt="Card Front" />
                           
                        </div>
                        <div className='flip-back'>
                            <img src={Plant} alt="Plant" />
                            <p>Murraya Paniculata Plant!</p>
                            

                        </div>

                    </div>
                </div>

                
            </div>

             <button className='nextBtn' onClick={() => navigate("/end")}>Next →</button>
        </div>
    )
}

export default Present