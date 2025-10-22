import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Header from './components/Header';
import About from './components/About';
import Timeline from './components/Timeline';
import Members from './components/Members';
import EventsMap from './components/EventsMap';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';
import { parseMembersCSV } from './utils/csvParser';
import type { BandMember } from './types';
import ErrorBoundary from './components/ErrorBoundary';
// FIX: Inlined CSV data into a TS module to bypass build/fetch issues.
// This is the most robust method, ensuring data is always available at runtime.
import { membersCsvData } from './source/membersData';

const AiAgent = lazy(() => import('./components/AiAgent'));

function App() {
  const [members, setMembers] = useState<BandMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMembers = () => {
      try {
        // The CSV content is now imported from a dedicated TS module.
        const parsedMembers = parseMembersCSV(membersCsvData);
        setMembers(parsedMembers);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido ao carregar os dados dos membros.';
        setError(errorMessage);
        console.error('Falha ao processar o CSV de membros:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
  }, []);

  return (
    <div className="bg-background">
      <Navigation />
      <Header />
      <main>
        <About />
        <Timeline />
        <Members members={members} isLoading={isLoading} error={error} />
        <EventsMap />
        <InstagramFeed />
      </main>
      <Footer />
      <ErrorBoundary>
        <Suspense fallback={null}>
          <AiAgent members={members} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;