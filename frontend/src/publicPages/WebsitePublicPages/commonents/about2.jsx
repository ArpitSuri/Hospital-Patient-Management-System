import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const [missionRef, missionInView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const [valuesRef, valuesInView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const [historyRef, historyInView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  // Core values data
  const coreValues = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: "Patient-Centered Care",
      description: "Our patients are at the heart of everything we do. We listen to your concerns, understand your needs, and create personalized treatment plans that prioritize your health and comfort.",
      color: "bg-blue-100 text-blue-600 border-blue-200"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "Excellence in Dentistry",
      description: "Our team uses the latest technology and techniques to ensure that you receive the most effective treatments for optimal results. We continuously invest in education and equipment.",
      color: "bg-purple-100 text-purple-600 border-purple-200"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Integrity and Transparency",
      description: "We believe in honesty and transparency in all aspects of our practice. From clear communication about your treatment options to ethical business practices, we strive to build trust with our patients.",
      color: "bg-indigo-100 text-indigo-600 border-indigo-200"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Advanced Technology",
      description: "We are dedicated to providing the highest standard of dental care using advanced techniques and state-of-the-art technology, ensuring comfortable treatments and optimal results.",
      color: "bg-sky-100 text-sky-600 border-sky-200"
    }
  ];

  // Timeline history data
  const timeline = [
    {
      year: "2010",
      title: "Our Beginnings",
      description: "Dental was founded with a vision to combine advanced dental technology with compassionate care."
    },
    {
      year: "2015",
      title: "Growing with our Community",
      description: "We expanded our practice and added specialized services to better serve our growing patient community."
    },
    {
      year: "2020",
      title: "A Legacy of Innovation",
      description: "Implementing cutting-edge treatments and techniques while maintaining our commitment to personalized care."
    },
    {
      year: "2025",
      title: "Looking Ahead",
      description: "Continuing our mission to transform dental visits into positive experiences with new technologies and approaches."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative bg-gradient-to-b from-gray-50 to-white pt-32 pb-16 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full -mr-48 -mt-48 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full -ml-48 -mb-48 opacity-20 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-600 font-medium uppercase tracking-wider">ABOUT US</span>
            <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-indigo-600">
              Modern care,<br />friendly smiles
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
              We're more than just a dental practice. We're a team dedicated to transforming your dental experience into something you can smile about.
            </p>
          </motion.div>

          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto aspect-video mb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            
            <img 
              src="https://framerusercontent.com/images/O4YwFwoCCwV0QcJCmNDsIkmkh8.png" 
              alt="Modern dental care" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
            variants={container}
          >
            {/* Left Column - Image */}
            <motion.div 
              className="relative rounded-2xl overflow-hidden shadow-xl"
              variants={item}
            >
              <img 
                src="https://framerusercontent.com/images/vFDZpkWiCWHzsbiY5t09wlxpOg.png?scale-down-to=1024" 
                alt="Dental clinic interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 to-transparent flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                  <p className="text-white/90">Creating healthier smiles and positive dental experiences</p>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column - Text Content */}
            <motion.div 
              className="space-y-8"
              variants={container}
            >
              <motion.div variants={item}>
                <span className="text-indigo-600 font-semibold tracking-widest uppercase">
                  WHAT DRIVES US
                </span>
              </motion.div>
              
              <motion.h2 
                className="text-4xl font-bold text-gray-900 leading-tight"
                variants={item}
              >
                A dream takes shape in healthy smiles.
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed"
                variants={item}
              >
                Dental was born out of a vision to combine advanced dental technology with compassionate care. Dr. Jacob Wilson, our founder, began this journey with a single chair, a team of dedicated staff, and a mission to transform dental visits into positive experiences.
              </motion.p>
              
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed"
                variants={item}
              >
                We believe that exceptional dental care goes beyond treatments and procedures. It's about creating an environment where patients feel valued, understood, and comfortable. Every aspect of our practice—from our welcoming office design to our attentive staff—is designed with your comfort in mind.
              </motion.p>
              
              <motion.div 
                className="pt-4"
                variants={item}
              >
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl">
                  MEET OUR TEAM
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section ref={valuesRef} className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-600 font-medium uppercase tracking-wider">OUR VALUES</span>
            <h2 className="text-4xl font-bold mt-4 mb-6 text-gray-900">
              From the way we interact with our patients<br />
              to the care we provide.
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              These values are the foundation of our practice, ensuring that each patient receives the best possible dental care in a welcoming environment.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            variants={container}
          >
            {coreValues.map((value, index) => (
              <motion.div 
                key={index}
                className={`flex items-start space-x-5 p-6 rounded-xl border ${value.color} hover:shadow-lg transition-all duration-300`}
                variants={item}
                whileHover={{ y: -5 }}
              >
                <div className={`${value.color.split(' ')[0]} p-4 rounded-xl`}>
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our History */}
      <section ref={historyRef} className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={historyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo-600 font-medium uppercase tracking-wider">OUR HISTORY</span>
            <h2 className="text-4xl font-bold mt-4 mb-6 text-gray-900">
              Growing to serve you better
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((event, index) => (
              <motion.div 
                key={index}
                className="flex mb-12 last:mb-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={historyInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className="w-24 flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {event.year}
                  </div>
                </div>
                <div className="border-l-2 border-gray-200 pl-8 pb-8 relative -mt-2">
                  <div className="absolute w-4 h-4 rounded-full bg-indigo-600 -left-2 top-1"></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-indigo-800 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-indigo-200 font-medium uppercase tracking-wider">WHY CHOOSE US</span>
              <h2 className="text-4xl font-bold mt-4 mb-8 text-white">
                The Dental difference is clear from the moment you walk in
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Personalized Treatment Plans</h4>
                    <p className="text-indigo-100">
                      We develop customized care strategies suited to your unique dental needs and goals.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Convenient Scheduling</h4>
                    <p className="text-indigo-100">
                      We offer flexible appointment times to accommodate your busy lifestyle, including evening availability.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Transparent Pricing</h4>
                    <p className="text-indigo-100">
                      We provide clear information about treatment costs and work with you to maximize insurance benefits.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <button className="bg-white text-indigo-800 hover:bg-indigo-50 px-8 py-3 rounded-full font-medium transition-colors shadow-lg">
                  SCHEDULE A VISIT
                </button>
              </div>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/api/placeholder/600/700"
                alt="Dental clinic reception"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-medium uppercase tracking-wider">FAQs</span>
            <h2 className="text-4xl font-bold mt-4 mb-6 text-gray-900">
              Common Questions
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              We've compiled answers to questions we frequently receive from our patients.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-xl font-semibold text-gray-900">What insurance plans do you accept?</h3>
                  <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="p-6 pt-0 text-gray-600">
                  <p>
                    We accept most major dental insurance plans including Delta Dental, Cigna, Aetna, and many others. Our friendly administrative team will help verify your coverage before your appointment and maximize your benefits.
                  </p>
                </div>
              </details>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-xl font-semibold text-gray-900">How often should I visit the dentist?</h3>
                  <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="p-6 pt-0 text-gray-600">
                  <p>
                    We recommend most patients visit us every six months for a check-up and professional cleaning. However, depending on your specific dental health needs, we may suggest more frequent visits for optimal care.
                  </p>
                </div>
              </details>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="text-xl font-semibold text-gray-900">What should I do in a dental emergency?</h3>
                  <span className="text-indigo-600 group-open:rotate-180 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="p-6 pt-0 text-gray-600">
                  <p>
                    Contact our office immediately if you're experiencing a dental emergency. We reserve time in our schedule for urgent care and same-day appointments. If you're experiencing severe pain, bleeding, or a dental injury after hours, call our emergency line for guidance.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;