import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const services = [
    {
      icon: "🦷",
      title: 'Preventive Care',
      description: 'Keep your smile healthy with check-ups, cleanings, and fluoride. Our team ensures your teeth stay strong.',
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      iconBg: 'bg-blue-100'
    },
    {
      icon: "⚕️",
      title: 'Oral Surgery',
      description: 'For complex needs, we provide dental implants, wisdom teeth extractions, and surgery to restore appearance.',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      iconBg: 'bg-indigo-100'
    },
    {
      icon: "🚨",
      title: 'Emergency Care',
      description: "If you're in pain or facing an urgent dental issue, we offer prompt, gentle, attentive care to help you feel better.",
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      iconBg: 'bg-purple-100'
    },
    {
      icon: "🦷",
      title: 'Orthodontics',
      description: 'Straighten your teeth and improve your smile with traditional braces or clear aligners for lasting confidence.',
      color: 'bg-sky-50 text-sky-600 border-sky-100',
      iconBg: 'bg-sky-100'
    },
    {
      icon: "✨",
      title: 'Cosmetic Dentistry',
      description: 'Enhance the natural beauty of your smile with services like teeth whitening, veneers, and smile makeovers.',
      color: 'bg-violet-50 text-violet-600 border-violet-100',
      iconBg: 'bg-violet-100'
    },
    {
      icon: "🔧",
      title: 'Dental Repair',
      description: 'From fillings to crowns and bridges, we restore damaged teeth, improving both their function and appearance.',
      color: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100',
      iconBg: 'bg-fuchsia-100'
    },
  ];

  return (
    <section id='service' ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full -mr-48 -mt-48 opacity-40 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-100 to-sky-100 rounded-full -ml-32 -mb-32 opacity-40 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p 
            className="text-indigo-600 font-medium uppercase tracking-wider mb-2"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            OUR SERVICES
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We are committed to providing a range of 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"> dental services.</span>
          </motion.h2>
        </motion.div>

        <div className="flex justify-end mb-8">
          <motion.button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-full transition duration-300 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            ALL SERVICES
          </motion.button>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className={`rounded-2xl p-6 border transition duration-300 hover:shadow-xl ${service.color} relative overflow-hidden group`}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute right-0 bottom-0 w-40 h-40 rounded-full -mr-20 -mb-20 bg-white opacity-30"></div>
              </div>
              
              <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center text-2xl mb-5 transition duration-300 group-hover:scale-110`}>
                <span>{service.icon}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <motion.button 
                className="flex items-center text-indigo-600 font-medium"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="mr-2">LEARN MORE</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;