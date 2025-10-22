import React from 'react';
import { config } from '../config';

const InstagramIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919 4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z" />
    </svg>
);


const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

  return (
    <footer className="bg-primary text-white font-sans relative section-divider-top">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-8 md:space-y-0">
            <div className="flex-1">
                <h3 className="font-display text-3xl font-bold tracking-wider">KALEO</h3>
                <p className="mt-2 text-sm opacity-70 max-w-sm mx-auto md:mx-0">{config.footer.ministryInfo}</p>
            </div>
            
            <div className="flex-1 flex justify-center items-center space-x-6">
                <a href={config.instagram.profileUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                    <InstagramIcon className="h-7 w-7" />
                    <span className="sr-only">Instagram</span>
                </a>
                {/* Add more social icons here if needed */}
            </div>

             <div className="flex-1 flex justify-center md:justify-end">
                <button onClick={scrollToTop} className="flex items-center space-x-2 text-sm opacity-80 hover:opacity-100 transition-opacity" aria-label="Voltar ao topo">
                    <span>Voltar ao Topo</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </div>
        </div>
         <div className="mt-10 pt-8 border-t border-white/10 text-center text-xs opacity-60">
            <p>&copy; {new Date().getFullYear()} {config.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;