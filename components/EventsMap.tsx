import React, { useEffect, useRef } from 'react';
import { locationsData } from '../config';
import Section from './Section';

// Adiciona declaração para a variável global 'L' do Leaflet
declare var L: any;

const EventsMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null); // Usando 'any' para a instância do mapa Leaflet

  useEffect(() => {
    // Garante que o mapa seja inicializado apenas uma vez
    if (mapRef.current && !mapInstance.current) {
      // Cria a instância do mapa
      mapInstance.current = L.map(mapRef.current, {
        scrollWheelZoom: false, // Desativa o zoom com a roda do mouse para melhor navegação na página
      }).setView([-10, -55], 4); // Centraliza o mapa no Brasil

      // Adiciona a camada de mapa (tile layer) com estilo de relevo
      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        maxZoom: 17,
      }).addTo(mapInstance.current);

      // Adiciona marcadores para cada localização
      locationsData.forEach(location => {
        const marker = L.marker([location.latitude, location.longitude]).addTo(mapInstance.current);
        
        // Conteúdo do popup
        const popupContent = `
          <h3>${location.city}, ${location.state}</h3>
          <p>${location.description}</p>
          <p style="font-size: 12px; color: #777; margin-top: 4px;">${location.date} - ${location.local}</p>
        `;

        marker.bindPopup(popupContent);
      });
    }

    // Função de limpeza para remover o mapa ao desmontar o componente
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []); // O array de dependências vazio garante que o useEffect seja executado apenas uma vez

  return (
    <Section title="Cidades Visitadas" className="bg-bg-subtle section-divider-top bg-dotted">
      <div className="relative rounded-lg bg-white shadow-xl p-2 aspect-video overflow-hidden shadow-inner-lg">
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {locationsData.map(location => (
          <div key={location.id} className="bg-white p-6 rounded-lg shadow-md border border-line hover:shadow-xl transition-shadow duration-300">
            <h3 className="font-display font-bold text-xl text-primary">{location.city}, {location.state}</h3>
            <p className="text-gray-500 text-sm mt-1">{location.date} - {location.local}</p>
            <p className="font-sans text-gray-700 mt-3">{location.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default EventsMap;