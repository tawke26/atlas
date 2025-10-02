'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface Perspective {
  thinkerId: string;
  thinkerName: string;
  stance: string;
  summary: string;
}

interface PathwayVisualizationProps {
  questionSlug: string;
  questionText: string;
  perspectives: Perspective[];
}

export default function PathwayVisualization({ 
  questionSlug, 
  questionText,
  perspectives 
}: PathwayVisualizationProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stop animating after initial sequence
    const timer = setTimeout(() => setIsAnimating(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Calculate path positions
  const centerX = 50; // percentage
  const centerY = 20; // percentage
  
  const getCardPosition = (index: number, total: number) => {
    // Arrange cards in a circle around the question
    const radius = 35; // percentage
    const angleStep = (Math.PI * 1.5) / (total - 1); // Spread across 270 degrees
    const startAngle = -Math.PI / 4; // Start from top-left
    const angle = startAngle + (index * angleStep);
    
    return {
      x: centerX + radius * Math.cos(angle),
      y: 55 + radius * Math.sin(angle) // Start lower to give space
    };
  };

  const createPath = (index: number) => {
    const target = getCardPosition(index, perspectives.length);
    
    // Create curved path from center to card
    const controlPointX = centerX + (target.x - centerX) * 0.5;
    const controlPointY = centerY + (target.y - centerY) * 0.3;
    
    return `M ${centerX} ${centerY} Q ${controlPointX} ${controlPointY} ${target.x} ${target.y}`;
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen py-12">
      {/* SVG Layer for connections */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ minHeight: '800px' }}
      >
        <defs>
          {/* Gradient for paths */}
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Draw paths from question to each perspective */}
        {perspectives.map((_, index) => (
          <path
            key={index}
            d={createPath(index)}
            fill="none"
            stroke={hoveredIndex === index ? "url(#pathGradient)" : "#d1d5db"}
            strokeWidth={hoveredIndex === index ? "3" : "2"}
            strokeDasharray={isAnimating ? "8 4" : "none"}
            className="transition-all duration-500"
            style={{
              filter: hoveredIndex === index ? "url(#glow)" : "none",
              strokeDashoffset: isAnimating ? -index * 50 : 0,
              animation: isAnimating ? `dash ${2 + index * 0.2}s linear forwards` : 'none',
              opacity: isAnimating ? 0 : hoveredIndex === null ? 0.4 : hoveredIndex === index ? 1 : 0.15
            }}
          />
        ))}

        {/* Animated particles along paths */}
        {hoveredIndex !== null && (
          <circle
            r="4"
            fill="#6366f1"
            filter="url(#glow)"
          >
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              path={createPath(hoveredIndex)}
            />
          </circle>
        )}
      </svg>

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Central Question Node */}
        <div 
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{ top: '10%' }}
        >
          <div className="relative">
            {/* Pulsing ring effect */}
            <div className="absolute inset-0 rounded-full bg-indigo-500 opacity-20 animate-ping" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-30 blur-xl" />
            
            {/* Central node */}
            <div className="relative bg-white rounded-2xl shadow-2xl border-4 border-indigo-500 p-8 max-w-md animate-fadeInScale">
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest text-indigo-600 font-bold mb-3">
                  The Question
                </div>
                <p className="text-lg font-bold text-gray-900 leading-snug">
                  {questionText}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Perspective Cards */}
        <div className="relative" style={{ marginTop: '350px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {perspectives.map((perspective, index) => {
              const position = getCardPosition(index, perspectives.length);
              
              return (
                <Link
                  key={perspective.thinkerId}
                  href={`/explore/${questionSlug}/${perspective.thinkerId}`}
                  className="relative group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    animationDelay: `${800 + index * 200}ms`,
                    opacity: 0
                  }}
                >
                  <div className={`
                    relative bg-white rounded-xl p-6 shadow-lg border-2 
                    transition-all duration-500 animate-fadeInUp
                    ${hoveredIndex === index 
                      ? 'border-indigo-500 shadow-2xl scale-105 shadow-indigo-200' 
                      : 'border-gray-200 hover:border-gray-400'
                    }
                  `}>
                    {/* Node indicator */}
                    <div className={`
                      absolute -top-3 -right-3 w-8 h-8 rounded-full 
                      flex items-center justify-center font-bold text-sm
                      transition-all duration-300
                      ${hoveredIndex === index
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white scale-110'
                        : 'bg-gray-200 text-gray-600'
                      }
                    `}>
                      {index + 1}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">
                      {perspective.thinkerName}
                    </h3>
                    <p className="text-base font-semibold text-gray-900 mb-3 leading-snug italic">
                      "{perspective.stance}"
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {perspective.summary}
                    </p>

                    {/* Arrow indicator */}
                    <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 group-hover:translate-x-2 transition-transform">
                      Explore this path
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Context note */}
        <div className="text-center mt-16 animate-fadeIn" style={{ animationDelay: '2s' }}>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Hover over a perspective to illuminate its connection. Each path leads to a different understanding.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes dash {
          from {
            stroke-dashoffset: 1000;
            opacity: 0;
          }
          to {
            stroke-dashoffset: 0;
            opacity: 0.4;
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease-out forwards;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

