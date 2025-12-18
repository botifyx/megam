
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Suites from './pages/Suites';
import Services from './pages/Services';
import Integrations from './pages/Integrations';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import PageLoader from './components/PageLoader';
import ScrollToTopButton from './components/ScrollToTopButton';
import MegChat from './components/MegChat';
import { ThemeProvider } from './context/ThemeContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <PageLoader onComplete={() => setIsLoading(false)} />
      ) : (
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-brand-dark text-slate-900 dark:text-slate-100 font-sans selection:bg-brand-primary selection:text-white transition-colors duration-500">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/suites" element={<Suites />} />
                <Route path="/suites/:suiteId" element={<Suites />} />
                <Route path="/services" element={<Services />} />
                <Route path="/integrations" element={<Integrations />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
            </main>
            <Footer />
            <ScrollToTopButton />
            <MegChat />
          </div>
        </Router>
      )}
    </>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
