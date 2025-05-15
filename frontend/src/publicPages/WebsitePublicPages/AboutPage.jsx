import React from 'react';
import About from './commonents/about2';
import Header from './commonents/header';
import Footer from './commonents/footer';


const AboutPage = () => {
  return (
    <div className="about-page pt-10 pb-16">
      <Header />
        <About />
        <Footer />
      
    </div>
  );
};

export default AboutPage;