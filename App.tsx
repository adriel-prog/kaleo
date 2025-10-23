import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
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
import PortfolioPDF from './components/PortfolioPDF';

const AiAgent = lazy(() => import('./components/AiAgent'));

// Declare global types for CDN libraries
declare global {
  interface Window {
    html2canvas: any;
    jspdf: any;
  }
}

function App() {
  const [members, setMembers] = useState<BandMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

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

  const generatePdf = async () => {
    if (!pdfRef.current || isGeneratingPdf) {
      return;
    }
    setIsGeneratingPdf(true);
    try {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const pages = pdfRef.current.children;

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;
        const canvas = await window.html2canvas(page, {
          scale: 2,
          useCORS: true,
        });
        const imgData = canvas.toDataURL('image/png');

        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }

      pdf.save('portfolio-kaleo.pdf');
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
      alert("Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="bg-background">
      <Navigation />
      <Header />
      <main>
        <About generatePdf={generatePdf} isGeneratingPdf={isGeneratingPdf} />
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
      {/* PDF content, rendered off-screen */}
      <PortfolioPDF members={members} pdfRef={pdfRef} />
    </div>
  );
}

export default App;
