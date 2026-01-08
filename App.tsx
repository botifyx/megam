
import React, { useState, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import SuspenseLoader from './components/SuspenseLoader';
import ScrollToTopButton from './components/ScrollToTopButton';
import MegChat from './components/MegChat';
import SEOManager from './components/SEOManager';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load page components
const Home = lazy(() => import('./pages/Home'));
const Suites = lazy(() => import('./pages/Suites'));
const Services = lazy(() => import('./pages/Services'));
const Integrations = lazy(() => import('./pages/Integrations'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));

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
          <SEOManager />
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-brand-dark text-slate-900 dark:text-slate-100 font-sans selection:bg-brand-primary selection:text-white transition-colors duration-500">
            <Navbar />
            <main id="main-content" className="flex-grow">
              <Suspense fallback={<SuspenseLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/suites" element={<Suites />} />
                  <Route path="/suites/:suiteId" element={<Suites />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/integrations" element={<Integrations />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                </Routes>
              </Suspense>
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
