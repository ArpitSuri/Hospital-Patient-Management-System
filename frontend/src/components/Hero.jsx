import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/Hero.png)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      
      {/* Content */}
      <div className={`relative z-10 text-center text-white px-4 transform transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Schedule an appointment<br />
          with us today!
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Whether you're visiting for a routine check-up or a more advanced procedure, we ensure
          your oral health is in the best hands, helping you achieve a confident, healthy smile.
        </p>
        <button className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
          SCHEDULE AN APPOINTMENT
        </button>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;