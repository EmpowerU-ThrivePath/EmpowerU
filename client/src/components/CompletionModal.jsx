import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompletionModal = () => {
  const navigate = useNavigate();

  const handleReturnToDashboard = () => {
    console.log('Return to dashboard clicked');
    navigate('/home', { replace: true });
  };

  return (
    <div style={{
      width: 587, 
      height: 406, 
      position: 'relative', 
      background: 'white', 
      boxShadow: '1px 2px 30px 4px rgba(0, 0, 0, 0.25)', 
      overflow: 'hidden', 
      borderRadius: 16
    }}>
      <div style={{
        left: 191, 
        top: 65, 
        position: 'absolute', 
        textAlign: 'center', 
        color: 'black', 
        fontSize: 40, 
        fontFamily: 'Poppins', 
        fontWeight: '600', 
        wordWrap: 'break-word'
      }}>Congrats!</div>
      
      <div style={{
        width: 376, 
        left: 105, 
        top: 164, 
        position: 'absolute', 
        textAlign: 'center', 
        color: '#4E4F50', 
        fontSize: 20, 
        fontFamily: 'Poppins', 
        fontWeight: '400', 
        wordWrap: 'break-word'
      }}>You finished all of your subtasks. Great job!</div>
      
      <button 
        onClick={handleReturnToDashboard}
        style={{
          width: 304, 
          height: 40, 
          left: 141, 
          top: 286, 
          position: 'absolute', 
          background: '#095C13', 
          overflow: 'hidden', 
          borderRadius: 100, 
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{
          textAlign: 'center', 
          color: 'white', 
          fontSize: 14, 
          fontFamily: 'Poppins', 
          fontWeight: '500', 
          lineHeight: 20, 
          letterSpacing: 0.10, 
          wordWrap: 'break-word'
        }}>Return to Dashboard</div>
      </button>

      {/* Decorative confetti elements */}
      <div style={{width: 10, height: 10, left: 59.23, top: 189.31, position: 'absolute', transform: 'rotate(55deg)', transformOrigin: 'top left', background: '#66D6FF'}} />
      <div style={{width: 14, height: 15, left: 69, top: 145.27, position: 'absolute', background: '#DB66FF'}} />
      <div style={{width: 28, height: 18, left: 94, top: 83.27, position: 'absolute', outline: '4px #FFFC66 solid', outlineOffset: '-2px'}} />
      <div style={{width: 20, height: 10, left: 171.96, top: 56.05, position: 'absolute', transform: 'rotate(142deg)', transformOrigin: 'top left', background: '#FF66B8'}} />
      <div style={{width: 9, height: 10, left: 202.94, top: 16.92, position: 'absolute', transform: 'rotate(124deg)', transformOrigin: 'top left', background: '#66A6FF'}} />
      <div style={{width: 12, height: 42, left: 248, top: -13.73, position: 'absolute', outline: '3px #9C66FF solid', outlineOffset: '-1.50px'}} />
      <div style={{width: 28, height: 12, left: 307.22, top: 18.79, position: 'absolute', transform: 'rotate(2deg)', transformOrigin: 'top left', background: '#FF7D66'}} />
      <div style={{width: 24, height: 14, left: 370.94, top: 61.16, position: 'absolute', transform: 'rotate(-120deg)', transformOrigin: 'top left', background: '#66FF85'}} />
      <div style={{width: 30, height: 6, left: 401, top: 50.27, position: 'absolute', outline: '4px #FF66BD solid', outlineOffset: '-2px'}} />
      <div style={{width: 14, height: 8, left: 480.99, top: 79.36, position: 'absolute', transform: 'rotate(158deg)', transformOrigin: 'top left', background: '#FF666E'}} />
      <div style={{width: 21.90, height: 29, left: 495.83, top: 93.77, position: 'absolute', outline: '4px #FF6685 solid', outlineOffset: '-2px'}} />
      <div style={{width: 27, height: 28, left: 542.34, top: 169.02, position: 'absolute', transform: 'rotate(-157deg)', transformOrigin: 'top left', background: '#FF66F0'}} />
      <div style={{width: 19, height: 16, left: 44, top: 69.27, position: 'absolute', background: '#FF66E0'}} />
      <div style={{width: 16, height: 13, left: 66, top: 24.27, position: 'absolute', background: '#66FFEB'}} />
      <div style={{width: 13, height: 45, left: 99.50, top: -36.23, position: 'absolute', outline: '3px #FFC266 solid', outlineOffset: '-1.50px'}} />
      <div style={{width: 10, height: 14, left: 150, top: -40.73, position: 'absolute', background: '#FF66F7'}} />
      <div style={{width: 30.06, height: 33, left: 178.81, top: -74.23, position: 'absolute', outline: '3px #FF8766 solid', outlineOffset: '-1.50px'}} />
      <div style={{width: 15, height: 15, left: 257.01, top: -75, position: 'absolute', transform: 'rotate(40deg)', transformOrigin: 'top left', background: '#FF6696'}} />
      <div style={{width: 16, height: 16, left: 311, top: -56.73, position: 'absolute', background: '#FF667D'}} />
      <div style={{width: 11, height: 12, left: 368.46, top: -47.78, position: 'absolute', transform: 'rotate(-35deg)', transformOrigin: 'top left', background: '#D466FF'}} />
      <div style={{width: 22, height: 10.03, left: 413, top: -46.50, position: 'absolute', outline: '3px #FF8266 solid', outlineOffset: '-1.50px'}} />
      <div style={{width: 12, height: 10, left: 484.55, top: -17.73, position: 'absolute', transform: 'rotate(155deg)', transformOrigin: 'top left', background: '#66DEFF'}} />
      <div style={{width: 20, height: 16, left: 507.46, top: 6.73, position: 'absolute', transform: 'rotate(-13deg)', transformOrigin: 'top left', background: '#66FF75'}} />
      <div style={{width: 18.57, height: 23, left: 507.71, top: 75.77, position: 'absolute', outline: '4px #FF9966 solid', outlineOffset: '-2px'}} />
      <div style={{width: 23, height: 25, left: 483, top: 45.27, position: 'absolute', background: '#66FFE3'}} />
      <div style={{width: 4, height: 46, left: 442, top: 9.27, position: 'absolute', outline: '4px #66A3FF solid', outlineOffset: '-2px'}} />
      <div style={{width: 17.67, height: 17, left: 366.17, top: 7.77, position: 'absolute', outline: '3px #70FF66 solid', outlineOffset: '-1.50px'}} />
      <div style={{width: 16, height: 16, left: 537, top: -33.73, position: 'absolute', background: '#C2FF66'}} />
      <div style={{width: 16, height: 12, left: 101.30, top: -40.16, position: 'absolute', transform: 'rotate(177deg)', transformOrigin: 'top left', background: '#66FFFA'}} />
      <div style={{width: 22, height: 22, left: 529.52, top: 193.87, position: 'absolute', transform: 'rotate(20deg)', transformOrigin: 'top left', background: '#FF66DE'}} />
      <div style={{width: 35, height: 8, left: 525.99, top: 219.22, position: 'absolute', transform: 'rotate(20deg)', transformOrigin: 'top left', outline: '3px #8A66FF solid', outlineOffset: '-1.50px'}} />
      <div style={{width: 26.89, height: 40, left: 481.44, top: 233.63, position: 'absolute', transform: 'rotate(20deg)', transformOrigin: 'top left', outline: '4px #FF6675 solid', outlineOffset: '-2px'}} />
      <div style={{width: 20, height: 21, left: 515.35, top: 286.73, position: 'absolute', transform: 'rotate(20deg)', transformOrigin: 'top left', background: '#66FF99'}} />
      <div style={{width: 24, height: 10.27, left: 567.25, top: 293.43, position: 'absolute', transform: 'rotate(20deg)', transformOrigin: 'top left', outline: '4px #66FFB2 solid', outlineOffset: '-2px'}} />
      <div style={{width: 13, height: 12, left: 608.20, top: 329.70, position: 'absolute', transform: 'rotate(20deg)', transformOrigin: 'top left', background: '#66FF7A'}} />
      <div style={{width: 4, height: 34, left: 551.34, top: 336.34, position: 'absolute', transform: 'rotate(20deg)', transformOrigin: 'top left', outline: '4px #CCFF66 solid', outlineOffset: '-2px'}} />
      <div style={{width: 20, height: 18, left: 472.21, top: 401.06, position: 'absolute', transform: 'rotate(-87deg)', transformOrigin: 'top left', background: '#66FFFA'}} />
      <div style={{width: 16, height: 17, left: 465, top: 410.98, position: 'absolute', transform: 'rotate(20deg)', transformOrigin: 'top left', background: '#FFFA66'}} />
      <div style={{width: 24, height: 16, left: 517.85, top: 429.51, position: 'absolute', transform: 'rotate(20deg)', transformOrigin: 'top left', outline: '3px #FF8C66 solid', outlineOffset: '-1.50px'}} />
      <div style={{width: 26, height: 32, left: 481.82, top: 466.28, position: 'absolute', transform: 'rotate(20deg)', transformOrigin: 'top left', outline: '3px #FF66A8 solid', outlineOffset: '-1.50px'}} />
      <div style={{width: 22, height: 23, left: 455.15, top: 506.73, position: 'absolute', transform: 'rotate(124deg)', transformOrigin: 'top left', background: '#FF666B'}} />
      <div style={{width: 24, height: 24, left: 428.02, top: 542.32, position: 'absolute', transform: 'rotate(20deg)', transformOrigin: 'top left', background: '#FF8C66'}} />
      <div style={{width: 22, height: 22, left: 178.17, top: 466.87, position: 'absolute', transform: 'rotate(154deg)', transformOrigin: 'top left', background: '#FF66DE'}} />
      <div style={{width: 35, height: 8, left: 162.30, top: 446.78, position: 'absolute', transform: 'rotate(154deg)', transformOrigin: 'top left', outline: '3px #8A66FF solid', outlineOffset: '-1.50px'}} />
      <div style={{width: 26.89, height: 40, left: 182.69, top: 404.64, position: 'absolute', transform: 'rotate(154deg)', transformOrigin: 'top left', outline: '4px #FF6675 solid', outlineOffset: '-2px'}} />
      <div style={{width: 20, height: 21, left: 120.89, top: 392.41, position: 'absolute', transform: 'rotate(154deg)', transformOrigin: 'top left', background: '#66FF99'}} />
      <div style={{width: 24, height: 10.27, left: 80.15, top: 425.28, position: 'absolute', transform: 'rotate(154deg)', transformOrigin: 'top left', outline: '4px #66FFB2 solid', outlineOffset: '-2px'}} />
      <div style={{width: 13, height: 12, left: 25.64, top: 429.78, position: 'absolute', transform: 'rotate(154deg)', transformOrigin: 'top left', background: '#66FF7A'}} />
      <div style={{width: 4, height: 34, left: 60.16, top: 384.11, position: 'absolute', transform: 'rotate(154deg)', transformOrigin: 'top left', outline: '4px #CCFF66 solid', outlineOffset: '-2px'}} />
      <div style={{width: 20, height: 18, left: 68.12, top: 282.20, position: 'absolute', transform: 'rotate(47deg)', transformOrigin: 'top left', background: '#66FFFA'}} />
      <div style={{width: 16, height: 17, left: 65.94, top: 270.13, position: 'absolute', transform: 'rotate(154deg)', transformOrigin: 'top left', background: '#FFFA66'}} />
      <div style={{width: 24, height: 16, left: 16.01, top: 295.49, position: 'absolute', transform: 'rotate(154deg)', transformOrigin: 'top left', outline: '3px #FF8C66 solid', outlineOffset: '-1.50px'}} />
      <div style={{width: 26, height: 32, left: 14.36, top: 244.04, position: 'absolute', transform: 'rotate(154deg)', transformOrigin: 'top left', outline: '3px #FF66A8 solid', outlineOffset: '-1.50px'}} />
      <div style={{width: 22, height: 23, left: 3.58, top: 196.81, position: 'absolute', transform: 'rotate(258deg)', transformOrigin: 'top left', background: '#FF666B'}} />
      <div style={{width: 24, height: 24, left: -3.37, top: 152.60, position: 'absolute', transform: 'rotate(154deg)', transformOrigin: 'top left', background: '#FF8C66'}} />
      {/* <div style={{width: 24, height: 24, left: 541, top: 25, position: 'absolute', overflow: 'hidden'}}>
        <div style={{width: 12, height: 12, left: 6, top: 6, position: 'absolute', outline: '2px black solid', outlineOffset: '-1px'}} />
        <div style={{width: 12, height: 12, left: 6, top: 6, position: 'absolute', outline: '2px black solid', outlineOffset: '-1px'}} />
      </div> */}
    </div>
  );
};

export default CompletionModal; 