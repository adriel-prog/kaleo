import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import Header from './components/Header';
import About from './components/About';
import Timeline from './components/Timeline';
import Members from './components/Members';
import EventsMap from './components/EventsMap';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';
import { INITIAL_MEMBERS_DATA } from './constants';
import type { BandMember } from './types';
import ErrorBoundary from './components/ErrorBoundary';

const AiAgent = lazy(() => import('./components/AiAgent'));

function App() {
  const [members, setMembers] = useState<BandMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setMembers(INITIAL_MEMBERS_DATA);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido ao processar dados dos membros.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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