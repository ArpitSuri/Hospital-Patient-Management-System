import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const testimonials = [
    {
      name: 'Daniel Dalen',
      service: 'Orthodontic Service',
      quote: '"Wonderful Experience!"',
      review: "I've been visiting Dental for years, and I've always had a great experience. The staff is friendly, the office is clean and modern, and Dr. Martinez always takes the time to explain my treatment options. I'm so happy with my smile!",
      avatar: 'https://framerusercontent.com/images/cPnLmzkyXcZEojXUlOLK54T0yw.jpg'
    },
    {
      name: 'Lisa Miles',
      service: 'Orthodontic Service',
      quote: '"Highly Recommended!"',
      review: 'Dr. Wilson and his team made my orthodontic journey smooth and stress-free. The results are incredible, and I feel more confident than ever. I highly recommend Dental for anyone looking for top-notch dental care!',
      avatar: 'https://framerusercontent.com/images/BobOk65j6uDzBORMNee0gKRWGk.jpg'
    },
    {
      name: 'Anna Frost',
      service: 'Orthodontic Service',
      quote: '"Amazing Experience!"',
      review: 'I was nervous about getting my first root canal, but Dr. Martinez and the whole team were so reassuring, kind, and professional. The procedure was quick, and I felt no pain. I\'m grateful for the excellent care I received!',
      avatar: 'https://framerusercontent.com/images/G45vgYrNZfse4JlMfG3uP8wg.jpg'
    }
  ];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => 
      (prev + newDirection + testimonials.length) % testimonials.length
    );
  };

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
    <section ref={ref} className="py-28 bg-gray-50 overflow-hidden">
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
            TESTIMONIALS
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-8"
            variants={item}
          >
            What our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">patients</span> say.
          </motion.h2>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={container}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`flex items-center space-x-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white shadow-lg scale-105' 
                    : 'bg-transparent hover:bg-white hover:shadow-md'
                }`}
                variants={item}
                whileHover={{ scale: 1.05 }}
              >
                <motion.img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  whileHover={{ rotate: 5 }}
                />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.service}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="relative h-96">
            <AnimatePresence custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg h-full">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {testimonials[currentIndex].quote}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {testimonials[currentIndex].review}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <motion.img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-600">{testimonials[currentIndex].service}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;