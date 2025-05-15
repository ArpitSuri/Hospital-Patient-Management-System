import React from 'react';
import Services from './commonents/service';
import About from './commonents/about';
import Testimonials from './commonents/testimonials';
import AppointmentSection from './commonents/AppointmentSection';
import Header from './commonents/header';
import Footer from './commonents/footer';


const ServicesPage = () => {
  return (
    <div className="services-page pt-15 ">
      <Header />
      <Services/>
      <About />
      <Testimonials  />
      <AppointmentSection />
      <Footer />
    </div>
  );
};

export default ServicesPage;