import React from 'react'
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Service';
import About from '../components/About';
import Testimonials from '../components/Testimonial';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default HomePage