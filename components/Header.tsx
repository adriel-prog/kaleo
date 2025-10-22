import React, { useState, useEffect } from 'react';
import { config } from '../config';

const ParticleBackground: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Stars Layer 1 (slow, small, sparse) */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-repeat animate-sky-slow"
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0, rgba(255,255,255,0.3) 0.5px, transparent 0.5px, transparent 100%)',
          backgroundSize: '80px 80px',
        }}
      />
      {/* Stars Layer 2 (medium, medium, denser) */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-repeat animate-sky-medium"
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.4) 0, rgba(255,255,255,0.4) 0.7px, transparent 0.7px, transparent 100%)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Stars Layer 3 (fast, large, sparse) */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-repeat animate-sky-fast"
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 100%)',
          backgroundSize: '120px 120px',
        }}
      />
    </div>
  );


const Header: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className="relative h-screen flex items-center justify-center overflow-hidden section-divider"
    >
      <div
        className="absolute top-0 left-0 w-full h-[150%] bg-cover bg-center"
        style={{
          backgroundImage: `url(${config.header.bgImageUrl})`,
          transform: `translateY(${offsetY * 0.5}px)`,
          willChange: 'transform'
        }}
      />
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
      <div className="relative z-10 text-center text-white p-4">
        <div className="fade-in-up">
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider drop-shadow-lg">
              {config.header.title}
            </h1>
            <p className="font-sans text-xl md:text-2xl mt-4 drop-shadow-md">
              {config.header.subtitle}
            </p>
        </div>
      </div>
      <a href="#about" aria-label="Scroll down" className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white bounce-slow">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </header>
  );
};

export default Header;