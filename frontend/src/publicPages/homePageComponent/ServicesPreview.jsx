import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ServicesPreview = () => {
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

  const approachItems = [
    {
      icon: "🔍",
      title: "Personalized Assessment",
      description: "We begin with a thorough examination to understand your unique dental needs."
    },
    {
      icon: "📋",
      title: "Custom Treatment Plans",
      description: "Every patient receives a tailored approach designed specifically for their oral health goals."
    },
    {
      icon: "🦷",
      title: "Modern Techniques",
      description: "We utilize the latest dental technologies to ensure efficient and comfortable care."
    },
    {
      icon: "👨‍⚕️",
      title: "Expert Team",
      description: "Our specialists are highly trained with years of experience in various dental fields."
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
        >
          <motion.p 
            className="text-blue-600 font-semibold mb-4"
            variants={item}
          >
            OUR COMPREHENSIVE DENTAL APPROACH
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
            variants={item}
          >
            We provide <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">exceptional care</span> for your smile.
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            variants={item}
          >
            We believe in providing comprehensive care that addresses both immediate concerns and long-term dental health.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {approachItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl p-8 text-center hover:shadow-lg transition-all duration-300"
              variants={item}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center"
                whileHover={{ rotate: 5 }}
              >
                <span className="text-3xl">{item.icon}</span>
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          variants={item}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.button
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            LEARN MORE ABOUT OUR APPROACH
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="mt-24 relative mx-auto max-w-5xl bg-white rounded-3xl overflow-hidden shadow-xl p-8"
          variants={item}
          initial="hidden" 
          animate={inView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Patient-Focused Dentistry</h3>
              <p className="text-gray-600 mb-6">
                Our practice is built around providing personalized care in a comfortable, 
                state-of-the-art environment. We take the time to listen to your concerns 
                and develop solutions that work for your lifestyle.
              </p>
              <ul className="space-y-3">
                {['Gentle and compassionate care', 'Transparent treatment options', 'Flexible scheduling'].map((benefit, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center text-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div 
              className="rounded-2xl overflow-hidden shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://framerusercontent.com/images/O4YwFwoCCwV0QcJCmNDsIkmkh8.png" 
                alt="Dental care" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;