import React, { Suspense, lazy } from 'react';
import ErrorBoundary from '../../Components/ErrorBoundary';
import './Main.css';

// Lazy load components
const HeroSection = lazy(() => import('../../Components/HeroSection/HeroSection'));
const Products = lazy(() => import('./Products/Products'));
const ContactSection = lazy(() => import('../../Components/ContactSection/ContactSection'));
const Footer = lazy(() => import('../../Components/Footer/Footer'));

// Loading component
const SectionLoader = () => (
  <div className="section-loading">
    <div className="loader"></div>
  </div>
);

const Main = () => {
  return (
    <main>
      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <Products />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary>
        <Suspense fallback={<SectionLoader />}>
          <Footer />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
};

export default Main;
