import React, { useState, useEffect, useRef } from 'react';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      name: 'Daniel Dalen',
      service: 'Orthodontic Service',
      quote: '"Wonderful Experience!"',
      review: "I've been visiting Dental for years, and I've always had a great experience. The staff is friendly, the office is clean and modern, and Dr. Martinez always takes the time to explain my treatment options. I'm so happy with my smile!",
      avatar: '/api/placeholder/80/80'
    },
    {
      name: 'Lisa Miles',
      service: 'Orthodontic Service',
      quote: '"Highly Recommended!"',
      review: 'Dr. Wilson and his team made my orthodontic journey smooth and stress-free. The results are incredible, and I feel more confident than ever. I highly recommend Dental for anyone looking for top-notch dental care!',
      avatar: '/api/placeholder/80/80'
    },
    {
      name: 'Anna Frost',
      service: 'Orthodontic Service',
      quote: '"Amazing Experience!"',
      review: 'I was nervous about getting my first root canal, but Dr. Martinez and the whole team were so reassuring, kind, and professional. The procedure was quick, and I felt no pain. I\'m grateful for the excellent care I received!',
      avatar: '/api/placeholder/80/80'
    }
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-blue-600 font-semibold mb-4">TESTIMONIALS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            What our patients say.
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex items-center space-x-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white shadow-lg scale-105' 
                    : 'bg-transparent hover:bg-white hover:shadow-md'
                }`}
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.service}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className={`text-center transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {testimonials[currentIndex].quote}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {testimonials[currentIndex].review}
              </p>
              
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600">{testimonials[currentIndex].service}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;