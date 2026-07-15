'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export default function Logo({ 
  className = "", 
  size = 40, 
  showText = true,
  textColor = "text-[#1e3a5f] dark:text-white"
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Unique SVG Logo Icon */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:scale-110 transition-transform duration-500"
        role="img"
        aria-labelledby="logo-title"
      >
        <title id="logo-title">Renovix Nordic Logo</title>
        {/* Background Hexagon - Represents structure and reliability */}
        <path 
          d="M50 5L89.5 27.5V72.5L50 95L10.5 72.5V27.5L50 5Z" 
          className="fill-[#1e3a5f] dark:fill-[#f59e0b] transition-colors duration-300"
        />
        
        {/* Stylized 'R' - Represents Renovix Nordic */}
        <path 
          d="M35 30V70M35 30H55C63.2843 30 70 36.7157 70 45C70 53.2843 63.2843 60 55 60H35" 
          stroke="white" 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="dark:stroke-[#1e3a5f] transition-colors duration-300"
        />
        
        {/* The Amber Leg - Represents the connection and energy */}
        <path 
          d="M50 60L70 75" 
          stroke="#f59e0b" 
          strokeWidth="10" 
          strokeLinecap="round"
          className="dark:stroke-white transition-colors duration-300"
        />
        
        {/* The Spark - Represents cleanliness and quality */}
        <circle cx="75" cy="25" r="5" fill="#f59e0b" className="animate-pulse dark:fill-white" />
        <path d="M75 15V20M75 30V35M65 25H70M80 25H85" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" className="dark:stroke-white" />
      </svg>

      {showText && (
        <span className={`text-2xl font-display font-bold tracking-tight ${textColor}`}>
          Renovix Nordic<span className="text-[#f59e0b]">.</span>
        </span>
      )}
    </div>
  );
}
