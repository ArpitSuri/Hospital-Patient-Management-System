import React from 'react';
import { motion } from 'framer-motion';
import AppointmentSection from './commonents/AppointmentSection';
import BookVisit from './commonents/Booking';

const BookingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="booking-page pt-32 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl font-bold text-center mb-6 text-gray-900"
            variants={itemVariants}
          >
            Schedule Your Dental Appointment
          </motion.h1>
          
          <motion.p 
            className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            We're here to make your dental visit comfortable and convenient. Book your appointment today and take the first step towards a healthier smile.
          </motion.p>
        </motion.div>

        {/* Booking component */}
        <BookVisit />
        
        {/* Additional appointment section */}
        <div className="mt-24">
          <AppointmentSection />
        </div>
        
        {/* Contact information */}
        <motion.div 
          className="mt-24 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Need assistance with booking?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Contact Us Directly</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-700">(555) 123-4567</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700">appointments@dentalpractice.com</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Office Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-700">Monday - Friday</span>
                    <span className="text-gray-700">8:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Saturday</span>
                    <span className="text-gray-700">9:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-700">Sunday</span>
                    <span className="text-gray-700">Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* FAQ Section */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">How far in advance should I schedule my appointment?</h3>
              <p className="text-gray-700">We recommend booking routine check-ups 2-3 weeks in advance. For urgent dental issues, we offer same-day emergency appointments when possible.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">What should I bring to my first appointment?</h3>
              <p className="text-gray-700">Please bring your ID, insurance information, complete medical history, and a list of current medications. Arriving 15 minutes early helps with paperwork.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">What is your cancellation policy?</h3>
              <p className="text-gray-700">We request at least 24 hours' notice for cancellations or rescheduling. Late cancellations may incur a fee.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Do you accept dental insurance?</h3>
              <p className="text-gray-700">Yes, we accept most major dental insurance plans. Please contact our office to verify that we accept your specific insurance provider.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;