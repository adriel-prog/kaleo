import React, { useEffect, useRef, useState } from 'react';
import { locationsData } from '../config';
import Section from './Section';

declare var L: any;

const EventsMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerRefs = useRef<{ [key: number]: any }>({});
  const locationCardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [activeLocationId, setActiveLocationId] = useState<number | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        scrollWheelZoom: false,
      }).setView([-10, -55], 4);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapInstance.current);

      locationsData.forEach(location => {
        const customIcon = L.divIcon({
          className: 'custom-marker-icon',
          html: '<div class="custom-div-icon"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10],
          popupAnchor: [0, -10]
        });

        const marker = L.marker([location.latitude, location.longitude], { icon: customIcon }).addTo(mapInstance.current);
        
        const popupContent = `
          <h3>${location.city}, ${location.state}</h3>
          <p>${location.description}</p>
          <p style="font-size: 12px; color: #777; margin-top: 4px;">${location.date} - ${location.local}</p>
        `;
        marker.bindPopup(popupContent);

        marker.on('click', () => {
          setActiveLocationId(location.id);
        });
        
        markerRefs.current[location.id] = marker;
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (activeLocationId !== null) {
      const cardRef = locationCardRefs.current[activeLocationId];
      if (cardRef) {
        cardRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      const marker = markerRefs.current[activeLocationId];
      if(marker) {
        mapInstance.current.flyTo(marker.getLatLng(), 8, {
          animate: true,
          duration: 1
        });
        marker.openPopup();
      }
    }
  }, [activeLocationId]);

  const handleCardMouseEnter = (locationId: number) => {
    const marker = markerRefs.current[locationId];
    if (marker) {
      marker.getElement()?.querySelector('.custom-div-icon')?.classList.add('hovered');
    }
  };

  const handleCardMouseLeave = (locationId: number) => {
    const marker = markerRefs.current[locationId];
    if (marker) {
      marker.getElement()?.querySelector('.custom-div-icon')?.classList.remove('hovered');
    }
  };

  return (
    <Section title="Cidades Visitadas" className="bg-bg-subtle section-divider-top bg-dotted">
      <div className="relative rounded-lg bg-white shadow-xl aspect-video overflow-hidden shadow-inner-lg">
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {locationsData.map(location => (
          <div 
            key={location.id}
            // FIX: The ref callback was implicitly returning a value, which is not allowed. Changed to a statement block to ensure a void return.
            ref={el => { locationCardRefs.current[location.id] = el; }}
            onClick={() => setActiveLocationId(location.id)}
            onMouseEnter={() => handleCardMouseEnter(location.id)}
            onMouseLeave={() => handleCardMouseLeave(location.id)}
            className={`p-6 rounded-lg shadow-md border transition-all duration-300 cursor-pointer ${activeLocationId === location.id ? 'ring-2 ring-primary shadow-xl bg-white' : 'border-line bg-white hover:shadow-xl hover:border-primary/50'}`}
          >
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