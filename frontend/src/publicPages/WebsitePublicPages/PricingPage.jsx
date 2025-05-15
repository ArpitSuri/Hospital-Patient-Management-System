import React from 'react';
import { motion } from 'framer-motion';
import MeetOurTeam from './commonents/Team';
import BookVisit from './commonents/Booking';


const PricingPage = () => {
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

  const pricingPlans = [
    {
      name: "Basic Checkup",
      price: "$75",
      features: [
        "Comprehensive Dental Exam",
        "Professional Teeth Cleaning",
        "Digital X-rays",
        "Oral Cancer Screening",
        "Home Care Instructions"
      ]
    },
    {
      name: "Standard Care",
      price: "$150",
      popular: true,
      features: [
        "Everything in Basic Checkup",
        "Deep Cleaning & Polishing",
        "Fluoride Treatment",
        "Gum Disease Screening",
        "Personalized Treatment Plan"
      ]
    },
    {
      name: "Premium Package",
      price: "$300",
      features: [
        "Everything in Standard Care",
        "Cosmetic Consultation",
        "Custom Whitening Trays",
        "One Emergency Visit",
        "Priority Scheduling"
      ]
    }
  ];

  const servicesPricing = [
    { service: "Teeth Cleaning", price: "$100 - $200" },
    { service: "Dental Filling", price: "$150 - $300" },
    { service: "Root Canal", price: "$700 - $1,500" },
    { service: "Tooth Extraction", price: "$150 - $400" },
    { service: "Crown", price: "$800 - $1,500" },
    { service: "Dental Bridge", price: "$2,000 - $4,000" },
    { service: "Dental Implant", price: "$3,000 - $5,000" },
    { service: "Teeth Whitening", price: "$300 - $800" },
    { service: "Dental Veneers", price: "$800 - $2,000 per tooth" },
    { service: "Orthodontic Treatment", price: "$3,000 - $7,000" }
  ];

  return (
    <div className="pricing-page pt-32 ">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">Our Pricing Plans</h1>
        <p className="text-lg text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          We offer transparent pricing and flexible payment options to ensure quality dental care remains accessible to all our patients.
        </p>

        {/* Pricing Plans */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl relative ${
                plan.popular ? 'border-2 border-blue-500' : 'border border-gray-200'
              }`}
              variants={itemVariants}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className={`p-8 ${plan.popular ? 'bg-blue-50' : 'bg-white'}`}>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/ visit</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 rounded-lg font-semibold ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Individual Services Pricing */}
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Individual Services</h2>
        <motion.div 
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-8">
            {servicesPricing.map((item, index) => (
              <motion.div 
                key={index}
                className={`flex justify-between py-4 ${
                  index !== servicesPricing.length - 1 ? 'border-b border-gray-200' : ''
                }`}
                variants={itemVariants}
              >
                <span className="text-lg text-gray-800">{item.service}</span>
                <span className="text-lg font-medium text-gray-900">{item.price}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Insurance & Payment Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Insurance & Payment Options</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            We accept most major dental insurance plans and offer flexible payment options to help make your dental care affordable.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Accepted Insurance</h3>
              <ul className="space-y-2 text-left">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Delta Dental</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Cigna</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Aetna</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>MetLife</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Guardian</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Payment Options</h3>
              <ul className="space-y-2 text-left">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Cash or Check</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Credit Cards (Visa, MasterCard, Amex)</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>CareCredit Financing</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Monthly Payment Plans</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Health Savings Account (HSA)</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>


            <MeetOurTeam />
            <BookVisit />

    </div>
  );
};

export default PricingPage;