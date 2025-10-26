import React from 'react';
import { config, timelineData } from '../config';
import type { BandMember } from '../types';

interface PortfolioPDFProps {
  members: BandMember[];
  pdfRef: React.RefObject<HTMLDivElement>;
}

const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

// Helper function to determine image alignment class, ensuring consistency with the Members component.
const getObjectPositionClass = (position?: string): string => {
  const pos = position?.toLowerCase().trim();
  switch (pos) {
    case 'top': return 'object-top';
    case 'bottom': return 'object-bottom';
    case 'left': return 'object-left';
    case 'right': return 'object-right';
    case 'left top': return 'object-left-top';
    case 'left bottom': return 'object-left-bottom';
    case 'right top': return 'object-right-top';
    case 'right bottom': return 'object-right-bottom';
    case 'center':
    default:
      return 'object-center';
  }
};

const PDFPage: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div
    className={`bg-white w-full flex flex-col ${className}`}
    style={{
      width: `${A4_WIDTH_PX}px`,
      height: `${A4_HEIGHT_PX}px`,
    }}
  >
    {children}
  </div>
);

const PortfolioPDF: React.FC<PortfolioPDFProps> = ({ members, pdfRef }) => {
  return (
    <div ref={pdfRef} style={{ position: 'absolute', left: '-9999px', top: 0, zIndex: -1 }}>
      {/* Page 1: Cover */}
      <PDFPage className="relative text-white items-center justify-center text-center p-8">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${config.header.bgImageUrl})` }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10">
          <h1 className="font-display text-8xl font-bold">KALEO</h1>
          <p className="font-sans text-3xl mt-2">Ministério de Louvor</p>
          <div className="w-24 h-1 bg-white mx-auto my-8" />
          <p className="font-display text-4xl font-bold tracking-widest">PORTFÓLIO</p>
          <p className="font-sans text-xl mt-4">{new Date().getFullYear()}</p>
        </div>
      </PDFPage>

      {/* Page 2: About */}
      <PDFPage className="p-16 font-sans">
        <h2 className="font-display text-5xl font-bold text-primary mb-8 border-b-2 border-primary pb-4">Nossa História</h2>
        <div className="text-lg leading-relaxed space-y-5 text-gray-800">
          {config.about.paragraphs.map((p, index) => <p key={index}>{p}</p>)}
        </div>
      </PDFPage>

      {/* Page 3: Members */}
      <PDFPage className="p-16">
        <h2 className="font-display text-5xl font-bold text-primary mb-12 border-b-2 border-primary pb-4">Nossos Membros</h2>
        <div className="grid grid-cols-3 gap-x-8 gap-y-10">
          {members.map(member => (
            <div key={member.id} className="text-center">
              <img
                src={member.photoUrl}
                alt={member.name}
                className={`w-32 h-32 mx-auto rounded-full object-cover shadow-lg mb-4 ${getObjectPositionClass(member.photoPosition)}`}
                crossOrigin="anonymous"
              />
              <h3 className="font-display font-bold text-xl text-primary">{member.name}</h3>
              <p className="font-sans text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </PDFPage>

      {/* Page 4: Journey & Contact */}
      <PDFPage className="p-16 justify-between">
        <div>
          <h2 className="font-display text-5xl font-bold text-primary mb-8 border-b-2 border-primary pb-4">Nossa Jornada</h2>
          <ul className="space-y-4 list-disc list-inside">
            {timelineData.map(event => (
              <li key={event.id} className="font-sans text-lg">
                <strong className="font-display">{event.year}:</strong> {event.description}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center border-t-2 border-gray-200 pt-8 mt-8">
          <h3 className="font-display text-4xl font-bold text-primary">Contate-nos</h3>
          <p className="font-sans text-xl mt-4">Siga-nos no Instagram para ficar por dentro das novidades!</p>
          <a href={config.instagram.profileUrl} className="font-sans text-2xl mt-2 text-gray-700 block hover:underline">@ministeriokaleooficial</a>
          <p className="font-sans text-sm mt-12 text-gray-500">{config.footer.copyright}</p>
          <p className="font-sans text-sm text-gray-500">{config.footer.ministryInfo}</p>
        </div>
      </PDFPage>
    </div>
  );
};

export default PortfolioPDF;
