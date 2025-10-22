import React from 'react';
import { config } from '../config';
import Section from './Section';


const InstagramFeed: React.FC = () => {
  return (
    <Section id="instagram" title="Siga-nos no Instagram" className="bg-dotted">
      <div className="border border-line rounded-lg shadow-xl overflow-hidden">
        <iframe
          src={config.instagram.embedUrl}
          width="100%"
          height="550"
          frameBorder="0"
          scrolling="no"
          allowTransparency
          title="Kaleo Instagram Feed"
        ></iframe>
      </div>
       <div className="text-center mt-8">
            <a
                href={config.instagram.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white font-display font-bold py-3 px-8 rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105"
            >
                Ver Perfil Completo
            </a>
        </div>
    </Section>
  );
};

export default InstagramFeed;