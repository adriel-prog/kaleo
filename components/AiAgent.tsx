import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GoogleGenAI } from '@google/genai';
import { config, timelineData, locationsData } from '../config';
import type { BandMember, Message } from '../types';

const generateWebsiteContext = (members: BandMember[]): string => {
  const about = config.about.paragraphs.join('\n');
  const timeline = timelineData.map(e => `- ${e.year}: ${e.description}`).join('\n');
  const memberInfo = members.map(m => `- ${m.name}: ${m.role}. Instagram: ${m.instagram}`).join('\n');
  const locations = locationsData.map(l => `- ${l.city}, ${l.state} (${l.date}): ${l.description} em ${l.local}.`).join('\n');

  return `
    Você é um assistente de IA amigável e prestativo para a banda KALEO. Seu conhecimento é estritamente limitado às informações fornecidas abaixo sobre a história, membros e eventos da banda. Não responda a perguntas fora deste contexto. Responda em Português.

    == Sobre a Banda ==
    Título: ${config.header.title}
    Subtítulo: ${config.header.subtitle}
    História:
    ${about}

    == Linha do Tempo da Banda ==
    ${timeline}

    == Membros da Banda ==
    ${memberInfo}

    == Eventos e Locais Visitados ==
    ${locations}
  `;
};

interface AiAgentProps {
  members: BandMember[];
}

const AiAgent: React.FC<AiAgentProps> = ({ members }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showIntroBubble, setShowIntroBubble] = useState(false);
  const chatContentRef = useRef<HTMLDivElement>(null);
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  const systemInstruction = useMemo(() => generateWebsiteContext(members), [members]);

  useEffect(() => {
    const introTimer = setTimeout(() => {
      if (!isOpen) {
        setShowIntroBubble(true);
      }
    }, 3000);

    const hideTimer = setTimeout(() => {
      setShowIntroBubble(false);
    }, 10000);

    return () => {
      clearTimeout(introTimer);
      clearTimeout(hideTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSend = async () => {
    if (!userInput.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userInput,
            config: {
                systemInstruction: systemInstruction,
            }
        });

      setMessages([...newMessages, { sender: 'ai', text: response.text }]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages([...newMessages, { sender: 'ai', text: 'Desculpe, não consigo responder no momento. Tente novamente mais tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleToggleChat = () => {
    setIsOpen(prev => !prev);
    setShowIntroBubble(false);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Intro Bubble */}
      <div 
        aria-hidden="true"
        className={`fixed bottom-24 right-4 sm:right-6 md:right-8 z-50 p-3 bg-white rounded-lg shadow-lg text-sm transition-all duration-500 ease-in-out ${showIntroBubble ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <p className="font-sans">Olá! Sou a IA da KALEO. 🤖</p>
        <p className="font-sans text-gray-600">Clique em mim para conversar!</p>
         <div className="absolute bottom-[-8px] right-6 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-white border-r-[8px] border-r-transparent"></div>
      </div>


      {/* Chat Popup */}
      <div 
        onClick={e => e.stopPropagation()} 
        className={`fixed bottom-24 right-4 sm:right-6 md:right-8 z-40 w-[calc(100%-2rem)] max-w-sm h-[70%] max-h-[500px] bg-white rounded-lg border border-line shadow-2xl flex flex-col transition-all duration-300 ease-in-out font-sans ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <header className="p-4 border-b border-line flex justify-between items-center bg-gray-50 rounded-t-lg">
          <h3 className="font-display font-bold text-lg text-primary">Converse com a KALEO AI</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>
        <div ref={chatContentRef} className="flex-1 p-4 overflow-y-auto space-y-4">
          {/* Initial Message */}
          {messages.length === 0 && (
              <div className="flex">
                <div className="bg-primary text-white p-3 rounded-lg max-w-xs text-sm">
                    Olá! Sou o assistente virtual da banda KALEO. Como posso ajudar? Pergunte sobre nossa história, membros ou eventos.
                </div>
            </div>
          )}
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              <div className={`${msg.sender === 'user' ? 'bg-gray-200 text-text-main' : 'bg-primary text-white'} p-3 rounded-lg max-w-xs text-sm`}>
                {msg.text}
              </div>
            </div>
          ))}
           {isLoading && (
             <div className="flex">
                <div className="bg-primary text-white p-3 rounded-lg max-w-xs text-sm">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
           )}
        </div>
        <div className="p-4 border-t border-line bg-gray-50 rounded-b-lg">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua pergunta..."
              className="flex-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm"
              disabled={isLoading}
            />
            <button onClick={handleSend} disabled={isLoading} className="bg-primary text-white rounded-full p-3 flex-shrink-0 hover:bg-opacity-80 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={handleToggleChat}
        className="fixed bottom-4 right-4 sm:right-6 md:right-8 z-50 bg-primary text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-80 transition-transform duration-300 ease-in-out transform hover:scale-110"
        aria-label="Abrir chat com assistente AI"
      >
        {!isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8V4H8" />
              <rect x="4" y="12" width="16" height="8" rx="2" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="M12 12v-2" />
              <circle cx="12" cy="6" r="2" />
              <path d="M12 18h.01" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        )}
      </button>
    </>
  );
};

export default AiAgent;