import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, title, className = '' }) => (
  <section className={`py-16 sm:py-24 ${className}`}>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-up">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-display font-bold text-primary">{title}</h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
      </div>
      {children}
    </div>
  </section>
);

export default Section;