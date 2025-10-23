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

    // Check if the required PDF generation libraries are available on the window object.
    if (typeof window.html2canvas === 'undefined' || typeof window.jspdf === 'undefined') {
        console.error("PDF generation libraries not loaded.");
        alert("Não foi possível carregar as bibliotecas para gerar o PDF. Verifique sua conexão e tente novamente.");
        return;
    }

    setIsGeneratingPdf(true);

    try {
      const elementToCapture = pdfRef.current;
      
      // Preload all images (both <img> tags and CSS background-images) within the PDF content.
      // This step is crucial to prevent "tainted canvas" errors from html2canvas, which occur when
      // the script tries to render an image that hasn't fully loaded, especially from a different origin.
      const images = Array.from(elementToCapture.getElementsByTagName('img'));
      const backgroundElements = Array.from(elementToCapture.querySelectorAll('[style*="background-image"]')) as HTMLElement[];
      const imagePromises: Promise<any>[] = [];

      // Create promises for <img> tags
      images.forEach(img => {
        const newImg = new Image();
        newImg.crossOrigin = 'anonymous'; // Set crossOrigin to handle CORS images properly.
        const promise = new Promise((resolve, reject) => {
          newImg.onload = resolve;
          newImg.onerror = reject;
        });
        // FIX: Cast `img` to `HTMLImageElement` to access the 'src' property. TypeScript was incorrectly inferring its type as 'unknown'.
        newImg.src = (img as HTMLImageElement).src;
        imagePromises.push(promise);
      });

      // Create promises for background-image styles
      backgroundElements.forEach(el => {
        const match = el.style.backgroundImage.match(/url\("?(.+?)"?\)/);
        if (match) {
          const url = match[1];
          const newImg = new Image();
          newImg.crossOrigin = 'anonymous';
          const promise = new Promise((resolve, reject) => {
            newImg.onload = resolve;
            newImg.onerror = reject;
          });
          newImg.src = url;
          imagePromises.push(promise);
        }
      });
      
      // Wait for all image loading promises to resolve.
      await Promise.all(imagePromises);
      
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const pages = elementToCapture.children;

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;
        const canvas = await window.html2canvas(page, {
          scale: 2,
          useCORS: true, // Required for cross-origin images.
          allowTaint: false,
          backgroundColor: '#ffffff', // Ensures content with transparent backgrounds is captured correctly.
        });
        const imgData = canvas.toDataURL('image/png');

        if (i > 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
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