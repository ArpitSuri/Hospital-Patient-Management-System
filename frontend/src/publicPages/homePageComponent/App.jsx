import About from "./about"
import AppointmentSection from "./AppointmentSection"
import BookVisit from "./Booking"
import Footer from "./footer"
import Header from "./header"
import Hero from "./hero"
import Services from "./service"
import ServicesPreview from "./ServicesPreview"
import MeetOurTeam from "./Team"
import Testimonials from "./testimonials"
import WhiteningServices from "./WhiteningServices"

function HomePage() {

  return (
          <div className="App">
            <Header/>
            <Hero />
            <ServicesPreview />
            <About />
            <BookVisit />
            <Services />
            <WhiteningServices />
            <MeetOurTeam />
            <Testimonials />
            <AppointmentSection />
            <Footer />
          </div>
        

  )
}

export default HomePage
