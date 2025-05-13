import React, { useState, useEffect, useRef } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/About.png" 
                alt="Dental office interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <p className="text-blue-600 font-semibold mb-4">ABOUT CLINIC</p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              We are committed to providing
              a wide range of dental services.
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Our clinic is equipped with the latest technology and staffed by highly trained
              professionals who prioritize your comfort and well-being.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Patient-Centered Care</h4>
                  <p className="text-gray-600">
                    We are dedicated to providing the highest standard of dental care
                    using advanced techniques and state-of-the-art technology, ensuring
                    optimal results for our patients.
                  </p>
                </div>
              </div>
            </div>
            
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
              ABOUT OUR CLINIC
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;