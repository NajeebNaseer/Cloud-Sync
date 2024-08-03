import React, { useEffect, useRef, useState } from 'react';

const ProgressBar = ({ value }) => {
  const radius = 16; // Adjust the radius as needed
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);
  const circleRef = useRef(null);

  useEffect(() => {
    const progress = (1 - value / 100) * circumference;
    setOffset(progress);

    // Animate the progress bar smoothly
    circleRef.current.style.transition = 'stroke-dashoffset 1s ease-in-out';
    circleRef.current.style.strokeDashoffset = progress;
  }, [value, circumference]);

  return (
    <div className="flex items-center justify-center">
      <svg className="w-24 h-24" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="progressGradient">
            <stop offset="0%" stopColor="#369" />
            <stop offset="100%" stopColor="#844ef8" />
          </linearGradient>
        </defs>
        <circle
          className="circle-background"
          cx="24"
          cy="24"
          r={radius}
          fill="transparent"
          stroke="#ddd"
          strokeWidth="4"
        />
        <circle
          ref={circleRef}
          className="circle-progress"
          cx="24"
          cy="24"
          r={radius}
          fill="transparent"
          stroke="url(#progressGradient)"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 24 24)" // Rotate the progress bar counterclockwise
          strokeLinecap="round"
        />
        <text
          x="24"
          y="24"
          className="text-xs font-bold text-purple-700"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {value}%
        </text>
      </svg>
    </div>
  );
};

export default ProgressBar;
