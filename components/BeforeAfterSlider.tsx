'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
}

export const BeforeAfterSlider = ({ 
  beforeImage, 
  afterImage, 
  aspectRatio = "aspect-[4/3]",
  className = "",
  priority = false
}: BeforeAfterSliderProps) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && e.type !== 'touchmove') return;
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const relativeX = x - container.left;
    const position = Math.max(0, Math.min(100, (relativeX / container.width) * 100));
    setSliderPos(position);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${aspectRatio} rounded-[2rem] sm:rounded-[3rem] overflow-hidden cursor-ew-resize select-none shadow-2xl group ${className}`}
      onMouseMove={handleMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={handleMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image 
          src={afterImage} 
          alt="Efter" 
          fill 
          className="object-cover"
          referrerPolicy="no-referrer"
          priority={priority}
          {...(priority ? { fetchPriority: "high" } as any : {})}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 bg-white/90 dark:bg-[#1e3a5f]/90 backdrop-blur-md px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-[#1e3a5f] dark:text-white font-bold text-[10px] sm:text-sm shadow-lg z-30">
          EFTER
        </div>
      </div>

      {/* Before Image (Foreground) */}
      <div 
        className="absolute inset-0 z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <Image 
          src={beforeImage} 
          alt="Före" 
          fill 
          className="object-cover"
          referrerPolicy="no-referrer"
          priority={priority}
          {...(priority ? { fetchPriority: "high" } as any : {})}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-[#1e3a5f]/90 backdrop-blur-md px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full text-white font-bold text-[10px] sm:text-sm shadow-lg z-30">
          FÖRE
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] z-20"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-[#1e3a5f]/10">
          <div className="flex gap-0.5 sm:gap-1">
            <div className="w-0.5 h-3 sm:h-4 bg-[#1e3a5f]/30 rounded-full" />
            <div className="w-0.5 h-3 sm:h-4 bg-[#1e3a5f]/30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
