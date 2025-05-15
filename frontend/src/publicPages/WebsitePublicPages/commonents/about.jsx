import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  return (
    <section ref={ref} id="about" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
        >
          {/* Left Column - Text Content */}
          <motion.div 
            className="space-y-8"
            variants={container}
          >
            <motion.div 
              className="inline-block"
              variants={item}
            >
              <span className="text-blue-600 font-semibold tracking-widest">
                ABOUT CLINIC
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight"
              variants={item}
            >
              Dental is a modern practice dedicated to exceptional care in a welcoming environment.
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 mb-8 leading-relaxed"
              variants={item}
            >
              Our clinic is equipped with the latest technology and staffed by highly trained
              professionals who prioritize your comfort and well-being.
            </motion.p>
            
            <motion.div 
              className="space-y-6 mb-8"
              variants={container}
            >
              {/* Patient-Centered Care Card */}
              <motion.div 
                className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                variants={item}
                whileHover={{ y: -5 }}
              >
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Patient-Centered Care</h4>
                  <p className="text-gray-600">
                    We prioritize the well-being and comfort of our patients, offering
                    personalized treatments and a supportive environment to make every
                    visit a positive experience.
                  </p>
                </div>
              </motion.div>
              
              {/* Advanced Technology Card */}
              <motion.div 
                className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                variants={item}
                whileHover={{ y: -5 }}
              >
                <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Advanced Technology</h4>
                  <p className="text-gray-600">
                    We are dedicated to providing the highest standard of dental care
                    using advanced techniques and state-of-the-art technology, ensuring
                    optimal results for our patients.
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div variants={item}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
                ABOUT OUR CLINIC
              </button>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Video Box */}
          <motion.div 
            className="relative h-full min-h-[400px] rounded-xl overflow-hidden shadow-xl"
            variants={item}
          >
            {/* Video with fallback */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/images/about-clinic-video-poster.jpg"
            >
              <source src="/QIxj4M3Ku5fa6SWTZWqzNoDt1A.mp4" type="video/mp4" />
              <source src="/videos/about-clinic.webm" type="video/webm" />
              {/* Fallback image */}
              <img src="/images/about-clinic-fallback.jpg" alt="Dental clinic interior" className="w-full h-full object-cover" />
            </video>
            
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end p-8">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">Our Clinic</h3>
                <p className="mb-4">See our state-of-the-art facilities and welcoming environment</p>
                <button className="border-2 border-white text-white px-6 py-2 rounded-full hover:bg-white/10 transition-colors">
                  Take a Tour
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;