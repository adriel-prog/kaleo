import React from 'react';
import { config } from '../config';
import Section from './Section';

interface AboutProps {
  generatePdf: () => void;
  isGeneratingPdf: boolean;
}

const DownloadIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const LoadingSpinner: React.FC<{className?: string}> = ({className}) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


const About: React.FC<AboutProps> = ({ generatePdf, isGeneratingPdf }) => {
  return (
    <section id="about" className="py-16 sm:py-24 section-divider scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 fade-in-up">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-display font-bold text-primary">{config.about.title}</h2>
                <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
            </div>
            <div className="max-w-3xl mx-auto text-center font-sans text-lg leading-relaxed space-y-4 text-gray-800">
                {config.about.paragraphs.map((p, index) => (
                <p key={index}>{p}</p>
                ))}
            </div>
            <div className="text-center mt-12">
              <button
                onClick={generatePdf}
                disabled={isGeneratingPdf}
                className="inline-flex items-center justify-center bg-primary text-white font-display font-bold py-3 px-8 rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-wait"
                aria-live="polite"
              >
                {isGeneratingPdf ? (
                  <>
                    <LoadingSpinner className="h-5 w-5 mr-3" />
                    <span>Gerando PDF...</span>
                  </>
                ) : (
                  <>
                    <DownloadIcon className="h-5 w-5 mr-3" />
                    <span>Baixar Portfólio</span>
                  </>
                )}
              </button>
            </div>
        </div>
    </section>
  );
};

export default About;
