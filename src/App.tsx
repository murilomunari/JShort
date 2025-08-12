import React from 'react';
import Header from './components/Header';
import UrlShortener from './components/UrlShortener';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <UrlShortener />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;
