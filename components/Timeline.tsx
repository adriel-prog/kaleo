import React, { useRef, useEffect, useState } from 'react';
import { timelineData } from '../config';
import Section from './Section';

const Timeline: React.FC = () => {
  const sortedEvents = [...timelineData].sort((a,b) => parseInt(a.year) - parseInt(b.year));
  const [lineHeight, setLineHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !lineRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const screenHeight = window.innerHeight;
      
      // Calculate how much of the container is visible
      const visibleHeight = Math.max(0, Math.min(screenHeight, screenHeight - top, top + height));
      const progress = visibleHeight / height;
      
      // Start drawing when the top of the component is halfway up the screen
      if (top < screenHeight / 1.5) {
        // Calculate the height of the line based on scroll position within the container
        const scrollableHeight = height - screenHeight + (screenHeight/2);
        const currentScroll = Math.max(0, (screenHeight / 1.5) - top);
        const newHeight = (currentScroll / scrollableHeight) * 100;
        setLineHeight(Math.min(100, newHeight));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  };

  return (
    <Section title="Nossa Jornada" className="bg-bg-subtle section-divider">
      <div ref={containerRef} className="relative">
        {/* Central static line */}
        <div className="absolute left-4 md:left-1/2 w-0.5 h-full bg-line" aria-hidden="true"></div>
        {/* Central animated line */}
        <div ref={lineRef} className="absolute left-4 md:left-1/2 w-0.5 bg-primary transition-all duration-500 ease-out" style={{height: `${lineHeight}%`}} aria-hidden="true"></div>

        <div className="space-y-12">
          {sortedEvents.map((event, index) => (
            <div key={event.id} className="relative flex items-start group">
               {/* Dot */}
              <div className="bg-background flex-shrink-0 w-8 h-8 rounded-full border-2 border-line flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2 md:mt-5 z-10 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all duration-300">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
              
              {/* Content */}
              <div className={`w-full md:w-1/2 rounded-lg ml-8 md:ml-0 ${index % 2 === 0 ? 'md:pr-10' : 'md:pl-10 md:translate-x-full'}`}>
                <div className="rounded-lg shadow-lg relative overflow-hidden h-64 flex flex-col justify-end text-white p-6 bg-cover bg-center transition-all duration-300 ease-in-out group-hover:shadow-2xl">
                   <img 
                    src={event.imageUrl} 
                    alt={event.description} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
                  <div className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                     <p className="font-display font-bold text-3xl drop-shadow-md">{event.year}</p>
                     <p className="font-sans text-gray-200 mt-2 drop-shadow-sm">{event.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;