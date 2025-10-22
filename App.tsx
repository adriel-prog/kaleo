import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
import Timeline from './components/Timeline';
import Members from './components/Members';
import EventsMap from './components/EventsMap';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';
import AiAgent from './components/AiAgent';
import { parseMembersCSV } from './utils/csvParser';
import type { BandMember } from './types';

function App() {
  const [members, setMembers] = useState<BandMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('/source/members.csv');
        if (!response.ok) {
          throw new Error(`Falha ao buscar dados dos membros: ${response.statusText}`);
        }
        const csvText = await response.text();
        const parsedMembers = parseMembersCSV(csvText);
        setMembers(parsedMembers);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido';
        setError(errorMessage);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="bg-background">
      <Header />
      <main>
        <About />
        <Timeline />
        <Members members={members} isLoading={isLoading} error={error} />
        <EventsMap />
        <InstagramFeed />
      </main>
      <Footer />
      <AiAgent members={members} />
    </div>
  );
}

export default App;
