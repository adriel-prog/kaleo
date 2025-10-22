import React from 'react';
import { config } from '../config';
import Section from './Section';

const About: React.FC = () => {
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
        </div>
    </section>
  );
};

export default About;