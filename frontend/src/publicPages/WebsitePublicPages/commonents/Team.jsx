import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MeetOurTeam = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const [activeDoctor, setActiveDoctor] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Jacob Wilson',
      title: 'Orthodontist',
      bio: 'Dr. Wilson specializes in correcting misaligned teeth and jaws. With over 10 years of experience, he is committed to creating beautiful smiles that last a lifetime.',
      avatar: 'https://framerusercontent.com/images/59ccaHEry6LmkQC2s7WW4oeuw.png'
    },
    {
      id: 2,
      name: 'Dr. Olivia Martinez',
      title: 'Chief Dentist',
      bio: 'As our lead dentist, Dr. Martinez oversees all aspects of patient care. Her gentle approach and attention to detail ensure that every patient receives exceptional treatment.',
      avatar: 'https://framerusercontent.com/images/BgzDweKKcYi3foYwXJZyMcZYmv4.png'
    },
    {
      id: 3,
      name: 'Lia Shanna',
      title: 'Dental Assistant',
      bio: 'Lia assists our dentists with procedures and ensures patients are comfortable throughout their visit. Her friendly demeanor helps put even the most anxious patients at ease.',
      avatar: 'https://framerusercontent.com/images/GGnOiqzPpii2W1kI8LFkTIFJvs0.jpg'
    },
    {
      id: 4,
      name: 'Emily Parker',
      title: 'Patient Coordinator',
      bio: 'Emily manages scheduling and helps patients navigate insurance and payment options. She is dedicated to making your dental experience as smooth and stress-free as possible.',
      avatar: 'https://framerusercontent.com/images/1ry27CM8DZ4TfIL4fu1Z2owiZj4.png'
    }
  ];

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
    <section ref={ref} className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-white overflow-hidden">
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
            ABOUT CLINIC
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            variants={item}
          >
            Meet the team <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">behind your smile.</span>
          </motion.h2>
          <motion.p 
            className="max-w-3xl mx-auto text-lg text-gray-600"
            variants={item}
          >
            Our highly skilled team of dental professionals is dedicated to providing you with the highest quality care in a comfortable environment.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={container}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              className="relative group"
              variants={item}
              whileHover={{ y: -10 }}
              onClick={() => setActiveDoctor(activeDoctor === member.id ? null : member.id)}
            >
              <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
                <div className="h-64 overflow-hidden">
                  <motion.img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 mb-4">{member.title}</p>
                  
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: activeDoctor === member.id ? "auto" : 0,
                      opacity: activeDoctor === member.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                  </motion.div>
                  
                  <motion.button
                    className="text-sm font-semibold text-blue-600 flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    {activeDoctor === member.id ? "Show less" : "Read more"} 
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-4 w-4 ml-1 transition-transform duration-300 ${activeDoctor === member.id ? "rotate-90" : ""}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Wanna be a part of our team?</h3>
              <p className="text-gray-600 mb-6">
                If you're committed to providing exceptional dental care and making a positive impact on our patients' smiles, we'd love to hear from you.
              </p>
              <motion.button
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                VIEW OPEN POSITIONS
              </motion.button>
            </div>
            <motion.div
              className="w-32 h-32 flex items-center justify-center bg-blue-100 rounded-full"
              whileHover={{ rotate: 15 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetOurTeam;