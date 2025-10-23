import React, { useState, useMemo } from 'react';
import Section from './Section';
import type { BandMember } from '../types';

const InstagramIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919 4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z" />
    </svg>
);

interface MembersProps {
  members: BandMember[];
  isLoading: boolean;
  error: string | null;
}

const Members: React.FC<MembersProps> = ({ members, isLoading, error }) => {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://ui-avatars.com/api/?name=K&background=111111&color=fff&size=128';
  };
  
  const roles = useMemo(() => ['Todos', ...Array.from(new Set(members.map(m => m.role)))], [members]);
  
  const filteredMembers = useMemo(() => {
    if (activeFilter === 'Todos') return members;
    return members.filter(member => member.role === activeFilter);
  }, [members, activeFilter]);


  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-gray-500">Carregando membros...</p>;
    }

    if (error) {
      return <p className="text-center text-red-500">Erro ao carregar membros: {error}</p>;
    }
    
    if (members.length === 0) {
      return <p className="text-center text-gray-500">Nenhum membro encontrado.</p>;
    }

    return (
      <>
        {roles.length > 2 && ( // Only show filters if there's more than one role besides "Todos"
          <div className="flex flex-wrap justify-center gap-3 mb-12 fade-in-up">
            {roles.map(role => (
              <button
                key={role}
                onClick={() => setActiveFilter(role)}
                className={`py-2 px-5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none ${
                  activeFilter === role
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        )}

        <div key={activeFilter} className="flex flex-wrap justify-center gap-10">
          {filteredMembers.map((member, index) => (
            <div 
              key={member.id} 
              className="text-center group transition-transform duration-300 ease-in-out hover:!opacity-100 group-hover:opacity-50 hover:-translate-y-2 fade-in-up"
              style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
            >
              <div className="relative w-40 h-40 mx-auto rounded-full shadow-lg overflow-hidden">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${['André Mclelry', 'Luísa Marillak'].includes(member.name) ? 'object-top' : ''}`}
                    onError={handleImageError}
                  />
                  {member.instagram && (
                    <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label={`${member.name} on Instagram`}
                    >
                        <InstagramIcon className="h-8 w-8 text-white" />
                    </a>
                  )}
              </div>
              <h3 className="font-display font-bold text-xl mt-4 text-primary">{member.name}</h3>
              <p className="font-sans text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center text-gray-500 mt-8 fade-in-up">
              <p>Nenhum membro encontrado para a função "{activeFilter}".</p>
          </div>
        )}
      </>
    );
  };

  return (
    <Section id="membros" title="Membros" className="section-divider">
      {renderContent()}
    </Section>
  );
};

export default Members;