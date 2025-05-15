import React from 'react';
import MeetOurTeam from './commonents/Team';
import Services from './commonents/service';
import AppointmentSection from './commonents/AppointmentSection';
import Header from './commonents/header';
import Footer from './commonents/footer';


const DentistsPage = () => {
  return (
    <div className="dentists-page pt-15">
      <Header />
      <MeetOurTeam />
      <Services />
      <AppointmentSection />
      <Footer />
    </div>
  );
};

export default DentistsPage;