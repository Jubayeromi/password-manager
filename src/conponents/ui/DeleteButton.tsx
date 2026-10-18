import React, { useState } from 'react';
import './DeleteButton.css';

export default function DeleteButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (isClicked) return;
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 400);
  };

  return (
    <button 
      className={`delete-btn ${isClicked ? 'clicked' : ''}`} 
      onClick={handleClick}
      type="button"
    >
      <div className="trash-icon">
        <svg 
          viewBox="0 0 512 512" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Lid Group (Animated) */}
          <g className="trash-lid">
            {/* Lid Handle */}
            <path 
              d="M216 136V112C216 98.7452 226.745 88 240 88H272C285.255 88 296 98.7452 296 112V136" 
              stroke="#1E1E1E" 
              strokeWidth="28" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            {/* Lid Top Plate */}
            <path 
              d="M136 136H376C392.569 136 405.5 150.115 403.41 166.577L388.41 284.577C387.058 295.141 378.056 303 367.41 303H144.59C133.944 303 124.942 295.141 123.59 284.577L108.59 166.577C106.5 150.115 119.431 136 136 136Z" 
              fill="#1E1E1E" 
            />
          </g>

          {/* Bin Body Group */}
          <g>
            {/* Outer Container Outline with Rounded Bottom */}
            <path 
              d="M160 304H352V416C352 433.673 337.673 448 320 448H192C174.327 448 160 433.673 160 416V304Z" 
              fill="#1E1E1E" 
            />

            {/* Inner Greenish/Teal Vertical Slot Bars (No overlapping lines) */}
            <rect x="192" y="340" width="24" height="72" rx="6" fill="#14B8A6" />
            <rect x="244" y="340" width="24" height="72" rx="6" fill="#14B8A6" />
            <rect x="296" y="340" width="24" height="72" rx="6" fill="#14B8A6" />
          </g>
        </svg>
      </div>
    
    </button>
  );
}