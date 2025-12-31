
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG, APP_NAME } from '../constants';

const SEOManager: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let config = SEO_CONFIG.home;
    
    if (pathname === '/suites' || pathname.startsWith('/suites/')) {
      config = SEO_CONFIG.suites;
    } else if (pathname === '/services') {
      config = SEO_CONFIG.services;
    } else if (pathname === '/integrations') {
      config = SEO_CONFIG.integrations;
    } else if (pathname === '/contact') {
      config = SEO_CONFIG.contact;
    }

    // Update document title
    document.title = config.title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', config.description);
    }

    // Update OpenGraph Title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', config.title);

    // Update OpenGraph Description
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', config.description);

  }, [pathname]);

  return null;
};

export default SEOManager;
