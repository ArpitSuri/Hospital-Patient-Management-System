import React, { useState, useEffect, useRef } from 'react';

const Services = () => {
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

  const services = [
    {
      icon: '🛡️',
      title: 'Preventive Care',
      description: 'Keep your smile healthy with check-ups, cleanings, and fluoride. Our team ensures your teeth stay strong.',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: '⚕️',
      title: 'Oral Surgery',
      description: 'For complex needs, we provide dental implants, wisdom teeth extractions, and surgery to restore appearance.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: '🚨',
      title: 'Emergency Care',
      description: "If you're in pain or facing an urgent dental issue, we offer prompt, gentle, attentive care to help you feel better.",
      gradient: 'from-pink-500 to-red-600'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full opacity-10 translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-block">
            <svg className="w-16 h-16 mx-auto mb-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L9 9h9l-3-9zM12 24l3-9H6l3 9z"/>
            </svg>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Services</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Whether for a routine check-up or a complex procedure, we prioritize
            your oral health to help you achieve a confident smile.
          </p>
        </div>
        
        <div className="mb-12">
          <p className="text-blue-400 text-center mb-2">GET IN TOUCH</p>
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Dental is a modern dental practice<br />
            committed to providing exceptional care<br />
            in a warm, welcoming environment.
          </h3>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`bg-white rounded-3xl p-8 transform transition-all duration-1000 hover:scale-105 hover:shadow-2xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 text-3xl`}>
                {service.icon}
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h4>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-300">
                LEARN MORE
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;