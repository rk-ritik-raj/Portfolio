import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Layout Components
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import BackgroundEffect from './components/BackgroundEffect';
import ScrollProgress from './components/ScrollProgress';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem('ritik_portfolio_resume');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Error loading resume from localStorage:', e);
      return null;
    }
  });

  const handleUpdateResume = (newResume) => {
    setResumeData(newResume);
    if (newResume) {
      localStorage.setItem('ritik_portfolio_resume', JSON.stringify(newResume));
    } else {
      localStorage.removeItem('ritik_portfolio_resume');
    }
  };

  const handleDownloadResume = () => {
    if (resumeData && resumeData.fileData) {
      const link = document.createElement('a');
      link.href = resumeData.fileData;
      link.download = resumeData.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Trigger default fallback download
      const defaultPdfContent = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595.275 841.889] /Contents 5 0 R >>\nendobj\n4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n5 0 obj\n<< /Length 124 >>\nstream\nBT\n/F1 24 Tf\n70 750 Td\n(Ritik Kumar - Full Stack Developer Portfolio Resume) Tj\n/F1 14 Tf\n0 -40 Td\n(Email: ritikkumar.dev@gmail.com | Website: ritik-kumar.dev) Tj\n0 -30 Td\n(This is a mockup resume. Please upload your actual CV using the edit button!) Tj\nET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f\n0000000009 00000 n\n0000000062 00000 n\n0000000119 00000 n\n0000000262 00000 n\n0000000333 00000 n\ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n0000000508\n%%EOF`;
      const blob = new Blob([defaultPdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Ritik_Kumar_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Portfolio Content */}
      {!isLoading && (
        <div className="relative min-h-screen text-textColor bg-background font-inter selection:bg-primary/30 selection:text-highlight">
          <ScrollProgress />
          <BackgroundEffect />
          <Navbar 
            onOpenResumeManager={() => setIsResumeOpen(true)} 
            downloadResume={handleDownloadResume} 
          />
          
          <main className="relative z-10 w-full overflow-hidden">
            <Hero 
              onOpenResumeManager={() => setIsResumeOpen(true)} 
              downloadResume={handleDownloadResume} 
            />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Achievements />
            <Contact />
          </main>

          <Footer />

          {/* Resume Management Modal */}
          <ResumeModal 
            isOpen={isResumeOpen} 
            onClose={() => setIsResumeOpen(false)} 
            resumeData={resumeData} 
            onUpdateResume={handleUpdateResume} 
          />
        </div>
      )}
    </>
  );
}
