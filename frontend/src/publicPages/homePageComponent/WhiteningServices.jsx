import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WhiteningServices = () => {
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

  const services = [
    {
      title: "In-Office Professional Whitening",
      description: "Our whitening treatment combines advanced technology, expert techniques, and quality products to deliver results.",
      icon: "https://framerusercontent.com/images/IcJUnaGk8VeLcwULCEg3wzQlhI.svg",
      iconAlt: "Professional whitening icon"
    },
    {
      title: "Take-Home Whitening Kits",
      description: "With custom trays and professional-grade gel, you can whiten your smile comfortably at your own pace from home.",
      icon: "https://framerusercontent.com/images/MPmtH9mXcmlTUsoivBgF7sorYA.svg",
      iconAlt: "Home whitening kit icon"
    },
    {
      title: "Stain Removal and Polishing",
      description: "Our cleaning and polishing treatments eliminate stains from food, drinks, and smoking, bringing back your teeth's natural shine.",
      icon: "https://framerusercontent.com/images/Uad0icXI22m7urNiziHHdiV22ow.svg",
      iconAlt: "Stain removal icon"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
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
            ACHIEVE A BRIGHTER, WHITER SMILE
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
            variants={item}
          >
            We offer effective <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">teeth whitening</span> solutions.
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            variants={item}
          >
            Whether you're looking to enhance your smile for a special occasion or simply want to improve your everyday appearance.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-lg transition-all duration-300"
              variants={item}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center"
                whileHover={{ rotate: 5 }}
              >
                <img src={service.icon} alt={service.iconAlt} className="w-12 h-12" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
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
            MAKE YOUR TEETH WHITER
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="mt-24 relative mx-auto max-w-5xl"
          variants={item}
          initial="hidden" 
          animate={inView ? "visible" : "hidden"}
        >
          <div className="rounded-3xl overflow-hidden shadow-xl relative">
            <div className="relative">
              <img 
                src="/7zUhY9tbKk709Vw1k1wRc73HBk.avif" 
                alt="Teeth whitening before and after" 
                className="w-full h-auto"
              />
              
              {/* Divider line */}
              <div className="absolute inset-0 flex justify-center pointer-events-none">
                <div className="w-1 bg-white shadow-lg" />
              </div>
              
              {/* Before label */}
              <div className="absolute bottom-6 left-6 bg-gray-900/70 text-white px-4 py-2 rounded-full text-sm font-bold">
                BEFORE
              </div>
              
              {/* After label */}
              <div className="absolute bottom-6 right-6 bg-blue-600/80 text-white px-4 py-2 rounded-full text-sm font-bold">
                AFTER
              </div>
            </div>
          </div>
          
          {/* Interactive slider indicator */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            animate={{ y: [0, -5, 0] }}
            transition={{ 
              repeat: Infinity,
              duration: 2
            }}
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
            </div>
            <div className="w-1 h-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhiteningServices;