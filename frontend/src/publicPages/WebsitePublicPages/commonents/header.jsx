// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion, useScroll, useTransform } from 'framer-motion';

// const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { scrollY } = useScroll();
//   const location = useLocation();
  
//   // Create a smooth background blur effect
//   const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
//   const backdropBlur = useTransform(scrollY, [0, 100], [0, 12]);
//   const blurEffect = useTransform(backdropBlur, (value) => `blur(${value}px)`);

//   // Check if we're on the homepage
//   const isHomepage = location.pathname === '/';

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu when navigating to a new page
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location.pathname]);

//   const navVariants = {
//     hidden: { y: -100, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 20,
//         duration: 0.8
//       }
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: -20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 200,
//         damping: 20
//       }
//     }
//   };

//   const menuItems = [
//     { to: "/", label: "HOME" },
//     { to: "/about", label: "ABOUT" },
//     { to: "/services", label: "SERVICES" },
//     { to: "/dentists", label: "DENTISTS" },
//     { to: "/testimonials", label: "TESTIMONIALS" },
//   ];

//   // Determine text color based on scroll position and current page
//   const textColor = (isScrolled || !isHomepage) ? 'text-gray-900' : 'text-white';
//   const headerBg = (isScrolled || !isHomepage) ? 'bg-white/95' : 'bg-transparent';

//   return (
//     <motion.header 
//       className={`fixed top-0 w-full z-50 ${headerBg}`}
//       initial="hidden"
//       animate="visible"
//       variants={navVariants}
//     >
//       {/* Animated background with blur effect */}
//       <motion.div
//         className={`absolute inset-0 ${isHomepage ? 'bg-white' : 'hidden'}`}
//         style={{
//           opacity: isHomepage ? backgroundOpacity : 0,
//           backdropFilter: isHomepage ? blurEffect : 'none'
//         }}
//       />
      
//       {/* Gradient overlay for smooth transition */}
//       <motion.div
//         className={`absolute inset-0 ${isHomepage ? 'bg-gradient-to-b from-black/10 to-transparent' : 'hidden'}`}
//         animate={{
//           opacity: isScrolled ? 0 : isHomepage ? 1 : 0
//         }}
//         transition={{ duration: 0.3 }}
//       />

//       <motion.nav 
//         className={`container mx-auto px-4 flex items-center justify-between transition-all duration-500 ${
//           isScrolled ? 'py-4' : 'py-6'
//         }`}
//         variants={containerVariants}
//       >
//         {/* Logo */}
//         <motion.div 
//           className="flex items-center space-x-3"
//           variants={itemVariants}
//           whileHover={{ scale: 1.05 }}
//           transition={{ type: "spring", stiffness: 300, damping: 30 }}
//         >
//           <Link to="/">
//             <motion.div 
//               className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg relative overflow-hidden"
//               whileHover={{ rotate: 360 }}
//               transition={{ duration: 0.8 }}
//             >
//               {/* Shimmer effect on logo */}
//               <motion.div
//                 className="absolute inset-0 bg-white/20"
//                 initial={{ x: "-100%" }}
//                 whileHover={{
//                   x: "100%",
//                   transition: { duration: 0.6 }
//                 }}
//               />
//               <svg className="w-8 h-8 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
//                 <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//               </svg>
//             </motion.div>
//           </Link>
//           <Link to="/" className={`text-2xl font-bold transition-colors duration-300 ${textColor}`}>
//             Dental
//           </Link>
//         </motion.div>
        
//         {/* Desktop Navigation */}
//         <motion.div className="hidden lg:flex items-center">
//           {/* Navigation Menu Background */}
//           <motion.div
//             className={`rounded-full px-8 py-3 backdrop-blur-md transition-all duration-300 ${
//               isScrolled || !isHomepage
//                 ? 'bg-gray-50/80' 
//                 : 'bg-white/10 '
//             }`}
//             layout
//             transition={{ type: "spring", stiffness: 200, damping: 30 }}
//           >
//             <div className={`flex space-x-8 ${textColor}`}>
//               {menuItems.map((item) => (
//                 <motion.div
//                   key={item.label}
//                   className="relative text-sm font-medium transition-colors duration-300 group"
//                   variants={itemVariants}
//                   whileHover={{ scale: 1.05 }}
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 >
//                   <Link 
//                     to={item.to}
//                     className={`relative z-10 group-hover:text-blue-600 transition-colors duration-300 ${
//                       location.pathname === item.to ? 'text-blue-600' : ''
//                     }`}
//                   >
//                     {item.label}
//                   </Link>
//                   {/* Underline animation */}
//                   <motion.div
//                     className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 ${
//                       location.pathname === item.to ? 'w-full' : 'w-0'
//                     }`}
//                     whileHover={{ width: "100%" }}
//                     transition={{ duration: 0.3, ease: "easeOut" }}
//                   />
//                 </motion.div>
//               ))}
              
//               {/* All Pages Dropdown */}
//               {/* <motion.div 
//                 className="relative group"
//                 variants={itemVariants}
//               >
//                 <div 
//                   className="relative text-sm font-medium group-hover:text-blue-600 transition-colors duration-300 flex items-center cursor-pointer"
//                 >
//                   ALL PAGES
//                   <motion.svg 
//                     className="w-4 h-4 ml-1" 
//                     fill="none" 
//                     stroke="currentColor" 
//                     viewBox="0 0 24 24"
//                     animate={{ rotate: 0 }}
//                     whileHover={{ rotate: 180 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                   </motion.svg>
//                 </div>
                
       
//                 <motion.div 
//                   className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-20 hidden group-hover:block"
//                   initial={{ opacity: 0, y: 10 }}
//                   whileHover={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   <Link to="/teeth-whitening" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
//                     Teeth Whitening
//                   </Link>
//                   <Link to="/testimonials" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
//                     Testimonials
//                   </Link>
//                   <Link to="/book-appointment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
//                     Book Appointment
//                   </Link>
//                 </motion.div>
//               </motion.div> */}
//             </div>
//           </motion.div>
//         </motion.div>
        
//         {/* CTA Button */}
//         <Link to="/appointment">
//           <motion.button 
//             className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-sm font-semibold relative overflow-hidden group shadow-lg"
//             variants={itemVariants}
//             whileHover={{ 
//               scale: 1.05,
//               boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)"
//             }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             <span className="relative z-10">SCHEDULE A VISIT</span>
            
//             {/* Button hover effect */}
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
//               initial={{ scale: 0, opacity: 0 }}
//               whileHover={{ 
//                 scale: 1, 
//                 opacity: 1,
//                 transition: { duration: 0.3 }
//               }}
//               style={{ borderRadius: "inherit" }}
//             />
            
//             {/* Ripple effect */}
//             <motion.div
//               className="absolute inset-0 bg-white/20 rounded-full"
//               initial={{ scale: 0, opacity: 1 }}
//               whileTap={{
//                 scale: 1.2,
//                 opacity: 0,
//                 transition: { duration: 0.3 }
//               }}
//             />
//           </motion.button>
//         </Link>

//         {/* Mobile Menu Button */}
//         <motion.button
//           className={`lg:hidden p-2 rounded-lg ${textColor}`}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           <motion.svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {isMobileMenuOpen ? (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             ) : (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             )}
//           </motion.svg>
//         </motion.button>
//       </motion.nav>

//       {/* Mobile Menu */}
//       <motion.div
//         className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg"
//         initial={{ opacity: 0, height: 0 }}
//         animate={{ 
//           opacity: isMobileMenuOpen ? 1 : 0,
//           height: isMobileMenuOpen ? "auto" : 0
//         }}
//         transition={{ duration: 0.3, ease: "easeInOut" }}
//       >
//         <motion.div 
//           className="container mx-auto px-4 py-6"
//           variants={containerVariants}
//           initial="hidden"
//           animate={isMobileMenuOpen ? "visible" : "hidden"}
//         >
//           {menuItems.map((item) => (
//             <motion.div key={item.label} variants={itemVariants}>
//               <Link
//                 to={item.to}
//                 className={`block py-3 hover:text-blue-600 transition-colors duration-300 ${
//                   location.pathname === item.to ? 'text-blue-600' : 'text-gray-900'
//                 }`}
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 {item.label}
//               </Link>
//             </motion.div>
//           ))}

//           <motion.div variants={itemVariants}>
//             <Link to="/appointment" className="block py-3 text-gray-900 hover:text-blue-600 transition-colors duration-300">
//               <motion.button 
//                 className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full font-semibold"
//                 whileTap={{ scale: 0.95 }}
//               >
//                 SCHEDULE A VISIT
//               </motion.button>
//             </Link>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </motion.header>
//   );
// };
// export default Header;


// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';

// const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { scrollY } = useScroll();

//   // Mock location for demo - replace with useLocation() in real app
//   const location = { pathname: '/' };

//   // Create a smooth background blur effect
//   const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
//   const backdropBlur = useTransform(scrollY, [0, 100], [0, 12]);
//   const blurEffect = useTransform(backdropBlur, (value) => `blur(${value}px)`);

//   // Check if we're on the homepage
//   const isHomepage = location.pathname === '/';

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isMobileMenuOpen && !event.target.closest('header')) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, [isMobileMenuOpen]);

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMobileMenuOpen]);

//   const navVariants = {
//     hidden: { y: -100, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 20,
//         duration: 0.8
//       }
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: -20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 200,
//         damping: 20
//       }
//     }
//   };

//   const mobileMenuVariants = {
//     closed: {
//       opacity: 0,
//       height: 0,
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut"
//       }
//     },
//     open: {
//       opacity: 1,
//       height: "auto",
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut"
//       }
//     }
//   };

//   const menuItems = [
//     { to: "/", label: "HOME" },
//     { to: "/about", label: "ABOUT" },
//     { to: "/services", label: "SERVICES" },
//     { to: "/dentists", label: "DENTISTS" },
//     { to: "/testimonials", label: "TESTIMONIALS" },
//   ];

//   // Determine text color based on scroll position and current page
//   const textColor = (isScrolled || !isHomepage) ? 'text-gray-900' : 'text-white';
//   const headerBg = (isScrolled || !isHomepage) ? 'bg-white/95 backdrop-blur-md' : 'bg-transparent';

//   const handleNavClick = (to) => {
//     console.log(`Navigating to: ${to}`);
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <>
//       <motion.header
//         className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerBg}`}
//         initial="hidden"
//         animate="visible"
//         variants={navVariants}
//       >
//         {/* Animated background with blur effect - only on homepage */}
//         {isHomepage && (
//           <motion.div
//             className="absolute inset-0 bg-white"
//             style={{
//               opacity: backgroundOpacity,
//               backdropFilter: blurEffect
//             }}
//           />
//         )}

//         {/* Gradient overlay for smooth transition - only on homepage */}
//         {isHomepage && (
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"
//             animate={{
//               opacity: isScrolled ? 0 : 1
//             }}
//             transition={{ duration: 0.3 }}
//           />
//         )}

//         <motion.nav
//           className={`container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'py-3 sm:py-4' : 'py-4 sm:py-6'
//             }`}
//           variants={containerVariants}
//         >
//           {/* Logo */}
//           <motion.div
//             className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0"
//             variants={itemVariants}
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             <button onClick={() => handleNavClick('/')}>
//               <motion.div
//                 className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg relative overflow-hidden"
//                 whileHover={{ rotate: 360 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 {/* Shimmer effect on logo */}
//                 <motion.div
//                   className="absolute inset-0 bg-white/20"
//                   initial={{ x: "-100%" }}
//                   whileHover={{
//                     x: "100%",
//                     transition: { duration: 0.6 }
//                   }}
//                 />
//                 <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//                 </svg>
//               </motion.div>
//             </button>
//             <button
//               onClick={() => handleNavClick('/')}
//               className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${textColor}`}
//             >
//               Dental
//             </button>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <motion.div className="hidden lg:flex items-center">
//             {/* Navigation Menu Background */}
//             <motion.div
//               className={`rounded-full px-6 xl:px-8 py-3 backdrop-blur-md transition-all duration-300 ${isScrolled || !isHomepage
//                   ? 'bg-gray-50/80 shadow-sm'
//                   : 'bg-white/10'
//                 }`}
//               layout
//               transition={{ type: "spring", stiffness: 200, damping: 30 }}
//             >
//               <div className={`flex space-x-6 xl:space-x-8 ${textColor}`}>
//                 {menuItems.map((item) => (
//                   <motion.div
//                     key={item.label}
//                     className="relative text-sm font-medium transition-colors duration-300 group"
//                     variants={itemVariants}
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   >
//                     <button
//                       onClick={() => handleNavClick(item.to)}
//                       className={`relative z-10 group-hover:text-blue-600 transition-colors duration-300 ${location.pathname === item.to ? 'text-blue-600' : ''
//                         }`}
//                     >
//                       {item.label}
//                     </button>
//                     {/* Underline animation */}
//                     <motion.div
//                       className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 ${location.pathname === item.to ? 'w-full' : 'w-0'
//                         }`}
//                       whileHover={{ width: "100%" }}
//                       transition={{ duration: 0.3, ease: "easeOut" }}
//                     />
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* CTA Button - Hidden on small screens, visible on md+ */}
//           <motion.button
//             onClick={() => handleNavClick('/appointment')}
//             className="hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 lg:px-8 py-2.5 lg:py-3 rounded-full text-xs lg:text-sm font-semibold relative overflow-hidden group shadow-lg flex-shrink-0"
//             variants={itemVariants}
//             whileHover={{
//               scale: 1.05,
//               boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)"
//             }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             <span className="relative z-10 whitespace-nowrap">SCHEDULE A VISIT</span>

//             {/* Button hover effect */}
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
//               initial={{ scale: 0, opacity: 0 }}
//               whileHover={{
//                 scale: 1,
//                 opacity: 1,
//                 transition: { duration: 0.3 }
//               }}
//               style={{ borderRadius: "inherit" }}
//             />

//             {/* Ripple effect */}
//             <motion.div
//               className="absolute inset-0 bg-white/20 rounded-full"
//               initial={{ scale: 0, opacity: 1 }}
//               whileTap={{
//                 scale: 1.2,
//                 opacity: 0,
//                 transition: { duration: 0.3 }
//               }}
//             />
//           </motion.button>

//           {/* Mobile Menu Button */}
//           <motion.button
//             className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${textColor} flex-shrink-0`}
//             whileTap={{ scale: 0.95 }}
//             onClick={(e) => {
//               e.stopPropagation();
//               setIsMobileMenuOpen(!isMobileMenuOpen);
//             }}
//             aria-label="Toggle mobile menu"
//           >
//             <motion.svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               {isMobileMenuOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </motion.svg>
//           </motion.button>
//         </motion.nav>
//       </motion.header>

//       {/* Mobile Menu Overlay */}
//       <motion.div
//         className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
//           }`}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//         onClick={() => setIsMobileMenuOpen(false)}
//       />

//       {/* Mobile Menu */}
//       <motion.div
//         className="lg:hidden fixed top-[72px] sm:top-[80px] left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200/50 z-40"
//         variants={mobileMenuVariants}
//         initial="closed"
//         animate={isMobileMenuOpen ? "open" : "closed"}
//       >
//         <motion.div
//           className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-h-[calc(100vh-80px)] overflow-y-auto"
//           variants={containerVariants}
//           initial="hidden"
//           animate={isMobileMenuOpen ? "visible" : "hidden"}
//         >
//           {/* Mobile Navigation Links */}
//           <div className="space-y-1">
//             {menuItems.map((item) => (
//               <motion.div key={item.label} variants={itemVariants}>
//                 <button
//                   onClick={() => handleNavClick(item.to)}
//                   className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-300 ${location.pathname === item.to
//                       ? 'text-blue-600 bg-blue-50'
//                       : 'text-gray-900 hover:text-blue-600 hover:bg-gray-50'
//                     }`}
//                 >
//                   {item.label}
//                 </button>
//               </motion.div>
//             ))}
//           </div>

//           {/* Mobile CTA Button */}
//           <motion.div variants={itemVariants} className="mt-6 pt-4 border-t border-gray-200">
//             <motion.button
//               onClick={() => handleNavClick('/appointment')}
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 px-6 rounded-full font-semibold shadow-lg"
//               whileTap={{ scale: 0.95 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             >
//               SCHEDULE A VISIT
//             </motion.button>
//           </motion.div>

//           {/* Contact Info for Mobile */}
//           <motion.div variants={itemVariants} className="mt-6 pt-4 border-t border-gray-200">
//             <div className="text-center space-y-2">
//               <p className="text-sm text-gray-600">Call us today</p>
//               <a
//                 href="tel:+1234567890"
//                 className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
//               >
//                 (123) 456-7890
//               </a>
//             </div>
//           </motion.div>
//         </motion.div>
//       </motion.div>

//       {/* Spacer to prevent content from hiding behind fixed header */}
//       <div className="h-16 sm:h-20 lg:h-24"></div>
//     </>
//   );
// };

// export default Header;




// import React, { useState, useEffect } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [currentPath, setCurrentPath] = useState('/');
//   const { scrollY } = useScroll();
//   const navigate = useNavigate();

//   // Mock location object for demo
//   const location = useLocation();

//   // Create a smooth background blur effect
//   const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
//   const backdropBlur = useTransform(scrollY, [0, 100], [0, 12]);
//   const blurEffect = useTransform(backdropBlur, (value) => `blur(${value}px)`);

//   // Check if we're on the homepage
//   const isHomepage = location.pathname === '/';

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isMobileMenuOpen && !event.target.closest('header')) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, [isMobileMenuOpen]);

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMobileMenuOpen]);

//   const navVariants = {
//     hidden: { y: -100, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 20,
//         duration: 0.8
//       }
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: -20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 200,
//         damping: 20
//       }
//     }
//   };

//   const mobileMenuVariants = {
//     closed: {
//       opacity: 0,
//       height: 0,
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut"
//       }
//     },
//     open: {
//       opacity: 1,
//       height: "auto",
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut"
//       }
//     }
//   };

//   const menuItems = [
//     { to: "/", label: "HOME" },
//     { to: "/about", label: "ABOUT" },
//     { to: "/services", label: "SERVICES" },
//     { to: "/dentists", label: "DENTISTS" },
//     { to: "/testimonials", label: "TESTIMONIALS" },
//   ];

//   // Determine text color based on scroll position and current page
//   const textColor = (isScrolled || !isHomepage) ? 'text-gray-900' : 'text-white';
//   const headerBg = (isScrolled || !isHomepage) ? 'bg-white/95 backdrop-blur-md' : 'bg-transparent';

//   const handleNavClick = (to) => {
//     navigate(to);
//     setIsMobileMenuOpen(false);

//   };

//   return (
//     <>
//       <motion.header
//         className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerBg}`}
//         initial="hidden"
//         animate="visible"
//         variants={navVariants}
//       >
//         {/* Animated background with blur effect - only on homepage */}
//         {isHomepage && (
//           <motion.div
//             className="absolute inset-0 bg-white"
//             style={{
//               opacity: backgroundOpacity,
//               backdropFilter: blurEffect
//             }}
//           />
//         )}

//         {/* Gradient overlay for smooth transition - only on homepage */}
//         {isHomepage && (
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"
//             animate={{
//               opacity: isScrolled ? 0 : 1
//             }}
//             transition={{ duration: 0.3 }}
//           />
//         )}

//         <motion.nav
//           className={`container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-500 ${isScrolled ? 'py-3 sm:py-4' : 'py-4 sm:py-6'
//             }`}
//           variants={containerVariants}
//         >
//           {/* Logo */}
//           <motion.div
//             className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0"
//             variants={itemVariants}
//             whileHover={{ scale: 1.05 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             <button onClick={() => handleNavClick('/')}>
//               <motion.div
//                 className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg relative overflow-hidden"
//                 whileHover={{ rotate: 360 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 {/* Shimmer effect on logo */}
//                 <motion.div
//                   className="absolute inset-0 bg-white/20"
//                   initial={{ x: "-100%" }}
//                   whileHover={{
//                     x: "100%",
//                     transition: { duration: 0.6 }
//                   }}
//                 />
//                 <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//                 </svg>
//               </motion.div>
//             </button>
//             <button
//               onClick={() => handleNavClick('/')}
//               className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${textColor}`}
//             >
//               Dental
//             </button>
//           </motion.div>

//           {/* Desktop Navigation */}
//           <motion.div className="hidden lg:flex items-center">
//             {/* Navigation Menu Background */}
//             <motion.div
//               className={`rounded-full px-6 xl:px-8 py-3 backdrop-blur-md transition-all duration-300 ${isScrolled || !isHomepage
//                   ? 'bg-gray-50/80 shadow-sm'
//                   : 'bg-white/10'
//                 }`}
//               layout
//               transition={{ type: "spring", stiffness: 200, damping: 30 }}
//             >
//               <div className={`flex space-x-6 xl:space-x-8 ${textColor}`}>
//                 {menuItems.map((item) => (
//                   <motion.div
//                     key={item.label}
//                     className="relative text-sm font-medium transition-colors duration-300 group"
//                     variants={itemVariants}
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   >
//                     <button
//                       onClick={() => handleNavClick(item.to)}
//                       className={`relative z-10 group-hover:text-blue-600 transition-colors duration-300 ${location.pathname === item.to ? 'text-blue-600' : ''
//                         }`}
//                     >
//                       {item.label}
//                     </button>
//                     {/* Underline animation */}
//                     <motion.div
//                       className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 ${location.pathname === item.to ? 'w-full' : 'w-0'
//                         }`}
//                       whileHover={{ width: "100%" }}
//                       transition={{ duration: 0.3, ease: "easeOut" }}
//                     />
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* CTA Button - Hidden on small screens, visible on md+ */}
//           <motion.button
//             onClick={() => handleNavClick('/appointment')}
//             className="hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 lg:px-8 py-2.5 lg:py-3 rounded-full text-xs lg:text-sm font-semibold relative overflow-hidden group shadow-lg flex-shrink-0"
//             variants={itemVariants}
//             whileHover={{
//               scale: 1.05,
//               boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)"
//             }}
//             whileTap={{ scale: 0.95 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             <span className="relative z-10 whitespace-nowrap">SCHEDULE A VISIT</span>

//             {/* Button hover effect */}
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
//               initial={{ scale: 0, opacity: 0 }}
//               whileHover={{
//                 scale: 1,
//                 opacity: 1,
//                 transition: { duration: 0.3 }
//               }}
//               style={{ borderRadius: "inherit" }}
//             />

//             {/* Ripple effect */}
//             <motion.div
//               className="absolute inset-0 bg-white/20 rounded-full"
//               initial={{ scale: 0, opacity: 1 }}
//               whileTap={{
//                 scale: 1.2,
//                 opacity: 0,
//                 transition: { duration: 0.3 }
//               }}
//             />
//           </motion.button>

//           {/* Mobile Menu Button */}
//           <motion.button
//             className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${textColor} flex-shrink-0`}
//             whileTap={{ scale: 0.95 }}
//             onClick={(e) => {
//               e.stopPropagation();
//               setIsMobileMenuOpen(!isMobileMenuOpen);
//             }}
//             aria-label="Toggle mobile menu"
//           >
//             <motion.svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               {isMobileMenuOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </motion.svg>
//           </motion.button>
//         </motion.nav>
//       </motion.header>

//       {/* Mobile Menu Overlay */}
//       <motion.div
//         className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
//           }`}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//         onClick={() => setIsMobileMenuOpen(false)}
//       />

//       {/* Mobile Menu */}
//       <motion.div
//         className="lg:hidden fixed top-[72px] sm:top-[80px] left-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-200/50 z-40"
//         variants={mobileMenuVariants}
//         initial="closed"
//         animate={isMobileMenuOpen ? "open" : "closed"}
//       >
//         <motion.div
//           className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-h-[calc(100vh-80px)] overflow-y-auto"
//           variants={containerVariants}
//           initial="hidden"
//           animate={isMobileMenuOpen ? "visible" : "hidden"}
//         >
//           {/* Mobile Navigation Links */}
//           <div className="space-y-1">
//             {menuItems.map((item) => (
//               <motion.div key={item.label} variants={itemVariants}>
//                 <button
//                   onClick={() => handleNavClick(item.to)}
//                   className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-300 ${location.pathname === item.to
//                       ? 'text-blue-600 bg-blue-50'
//                       : 'text-gray-900 hover:text-blue-600 hover:bg-gray-50'
//                     }`}
//                 >
//                   {item.label}
//                 </button>
//               </motion.div>
//             ))}
//           </div>

//           {/* Mobile CTA Button */}
//           <motion.div variants={itemVariants} className="mt-6 pt-4 border-t border-gray-200">
//             <motion.button
//               onClick={() => handleNavClick('/appointment')}
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 px-6 rounded-full font-semibold shadow-lg"
//               whileTap={{ scale: 0.95 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             >
//               SCHEDULE A VISIT
//             </motion.button>
//           </motion.div>

//           {/* Contact Info for Mobile */}
//           <motion.div variants={itemVariants} className="mt-6 pt-4 border-t border-gray-200">
//             <div className="text-center space-y-2">
//               <p className="text-sm text-gray-600">Call us today</p>
//               <a
//                 href="tel:+1234567890"
//                 className="text-lg font-semibold text-blue-600 hover:text-blue-700 transition-colors"
//               >
//                 (123) 456-7890
//               </a>
//             </div>
//           </motion.div>
//         </motion.div>
//       </motion.div>

//       {/* Spacer to prevent content from hiding behind fixed header */}
//       <div className="h-16 sm:h-20 lg:h-24"></div>
//     </>
//   );
// };

// export default Header;


// import { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Menu, X } from 'lucide-react';

// const navItems = [
//   { label: 'Home', to: '/' },
//   { label: 'About', to: '/about' },
//   { label: 'Services', to: '/services' },
//   { label: 'Contact', to: '/contact' },
// ];

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { scrollY } = useScroll();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   // Framer Motion transforms
//   const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 1]);
//   const blurEffect = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(8px)']);

//   useEffect(() => {
//     return scrollY.onChange((y) => {
//       setIsScrolled(y > 50);
//     });
//   }, [scrollY]);

//   const handleNavClick = (to) => {
//     navigate(to);
//     setIsMobileMenuOpen(false);
//   };

//   const isHomepage = location.pathname === '/';

//   return (
//     <motion.header
//       className={`fixed top-0 left-0 w-full z-50 ${isScrolled ? 'shadow-md' : ''
//         }`}
//       style={{
//         opacity: backgroundOpacity,
//         backdropFilter: blurEffect.get(), // use .get() to apply value
//         WebkitBackdropFilter: blurEffect.get(),
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         <div className="text-2xl font-bold cursor-pointer" onClick={() => handleNavClick('/')}>
//           DentalCare
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex gap-8">
//           {navItems.map((item) => (
//             <div
//               key={item.to}
//               onClick={() => handleNavClick(item.to)}
//               className={`cursor-pointer transition-colors duration-300 relative z-10 ${location.pathname === item.to ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
//                 }`}
//             >
//               {item.label}
//             </div>
//           ))}
//         </nav>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             aria-label="Toggle mobile menu"
//           >
//             {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           className="md:hidden bg-white shadow-lg px-4 py-2"
//         >
//           {navItems.map((item) => (
//             <div
//               key={item.to}
//               onClick={() => handleNavClick(item.to)}
//               className={`py-2 cursor-pointer ${location.pathname === item.to ? 'text-blue-600' : 'text-gray-800'
//                 }`}
//             >
//               {item.label}
//             </div>
//           ))}
//         </motion.div>
//       )}
//     </motion.header>
//   );
// };

// export default Header;


// import { useEffect, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Menu, X } from 'lucide-react';

// const navItems = [
//   { to: "/", label: "HOME" },
//   { to: "/about", label: "ABOUT" },
//   { to: "/services", label: "SERVICES" },
//   { to: "/dentists", label: "DENTISTS" },
//   { to: "/testimonials", label: "TESTIMONIALS" },
// ];

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { scrollY } = useScroll();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 1]);
//   const blurEffect = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(8px)']);

//   useEffect(() => {
//     return scrollY.onChange((y) => {
//       setIsScrolled(y > 50);
//     });
//   }, [scrollY]);

//   const handleNavClick = (to) => {
//     navigate(to);
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <motion.header
//       className={`fixed top-0 left-0 w-full z-50 ${isScrolled ? 'shadow-md' : ''}`}
//       style={{
//         opacity: backgroundOpacity,
//         backdropFilter: blurEffect.get(),
//         WebkitBackdropFilter: blurEffect.get(),
//       }}
//     >
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         <div
//           className="text-2xl font-bold cursor-pointer text-blue-600"
//           onClick={() => handleNavClick('/')}
//         >
//           DentalCare
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-8">
//           <nav className="flex gap-6">
//             {navItems.map((item) => (
//               <div
//                 key={item.to}
//                 onClick={() => handleNavClick(item.to)}
//                 className={`cursor-pointer transition-colors duration-300 ${location.pathname === item.to ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
//                   }`}
//               >
//                 {item.label}
//               </div>
//             ))}
//           </nav>

//           {/* CTA Button */}
//           <button
//             onClick={() => handleNavClick('/appointment')}
//             className="ml-4 px-5 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
//           >
//             Get Started
//           </button>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             aria-label="Toggle mobile menu"
//           >
//             {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           className="md:hidden bg-white shadow-lg px-4 py-2"
//         >
//           {navItems.map((item) => (
//             <div
//               key={item.to}
//               onClick={() => handleNavClick(item.to)}
//               className={`py-2 cursor-pointer ${location.pathname === item.to ? 'text-blue-600' : 'text-gray-800'
//                 }`}
//             >
//               {item.label}
//             </div>
//           ))}

//           {/* CTA Button in Mobile */}
//           <div className="mt-3">
//             <button
//               onClick={() => handleNavClick('/appointment')}
//               className="w-full px-5 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
//             >
//               Get Started
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </motion.header>
//   );
// };

// export default Header;

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { to: "/", label: "HOME" },
  { to: "/about", label: "ABOUT" },
  {
    to: "/services",
    label: "SERVICES"},
  { to: "/dentists", label: "DENTISTS" },
  { to: "/testimonials", label: "TESTIMONIALS" },
];

const Header = () => {
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeNavItem, setActiveNavItem] = useState("/");
  const navigate = useNavigate();

  const backgroundOpacity = useTransform(scrollY, [0, 80], [0, 0.95]);
  const headerHeight = useTransform(scrollY, [0, 100], [80, 70]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((y) => {
      setIsScrolled(y > 30);
    });
    return unsubscribe;
  }, [scrollY]);

  const handleNavClick = (to) => {
    navigate(to);
    setActiveNavItem(to);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleDropdownToggle = (index, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleMouseEnter = (index) => {
    if (navItems[index].dropdown) {
      setActiveDropdown(index);
    }
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg backdrop-blur-md' : ''
          }`}
        style={{
          height: headerHeight,
          background: isScrolled
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(255, 255, 255, 0.8)',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavClick('/')}
            style={{ scale: logoScale }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl mr-3 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              DentalCare
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex gap-1">
              {navItems.map((item, index) => (
                <div key={item.to} className="relative group">
                  <motion.div
                    className={`px-4 py-2 cursor-pointer transition-all duration-300 rounded-lg font-medium text-sm tracking-wide flex items-center gap-1 ${activeNavItem === item.to || activeNavItem.startsWith(item.to + '/')
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    onClick={() => !item.dropdown && handleNavClick(item.to)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    whileHover={{ y: -1 }}
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''
                          }`}
                      />
                    )}
                  </motion.div>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => setActiveDropdown(index)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {item.dropdown.map((subItem, subIndex) => (
                            <motion.div
                              key={subItem.to}
                              className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 cursor-pointer transition-colors duration-200 text-sm"
                              onClick={() => handleNavClick(subItem.to)}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: subIndex * 0.05 }}
                              whileHover={{ x: 4 }}
                            >
                              {subItem.label}
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.button
              onClick={() => handleNavClick('/appointment')}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl font-medium text-sm tracking-wide relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl z-50 lg:hidden overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="p-6">
                {navItems.map((item, index) => (
                  <div key={item.to}>
                    <motion.div
                      className={`flex items-center justify-between py-3 cursor-pointer rounded-lg px-3 ${activeNavItem === item.to || activeNavItem.startsWith(item.to + '/')
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-800 hover:bg-gray-50'
                        }`}
                      onClick={(e) => item.dropdown ? handleDropdownToggle(index, e) : handleNavClick(item.to)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="font-medium">{item.label}</span>
                      {item.dropdown && (
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''
                            }`}
                        />
                      )}
                    </motion.div>

                    {/* Mobile Dropdown */}
                    {item.dropdown && (
                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            className="ml-4 mt-2 space-y-1"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.dropdown.map((subItem, subIndex) => (
                              <motion.div
                                key={subItem.to}
                                className="py-2 px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer rounded-lg transition-colors duration-200"
                                onClick={() => handleNavClick(subItem.to)}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.05 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {subItem.label}
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}

                {/* Mobile CTA Button */}
                <motion.button
                  onClick={() => handleNavClick('/appointment')}
                  className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg font-medium relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-active:opacity-100 transition-opacity duration-200"></div>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
