import React from 'react';
import Hero from './commonents/hero';
import ServicesPreview from './commonents/ServicesPreview';
import About from './commonents/about';
import BookVisit from './commonents/Booking';
import Services from './commonents/service';
import WhiteningServices from './commonents/WhiteningServices';
import MeetOurTeam from './commonents/Team';
import Testimonials from './commonents/testimonials';
import AppointmentSection from './commonents/AppointmentSection';
import Header from './commonents/header';
import Footer from './commonents/footer';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <ServicesPreview />
      <About />
      {/* <BookVisit /> */}
      <Services />
      <WhiteningServices />
      <MeetOurTeam/>
      <Testimonials />
      <AppointmentSection />
      <Footer />
    </div>
  );
};

export default HomePage;