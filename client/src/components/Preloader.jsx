import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../assets/logo.png';

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Smooth realistic counter progress (Customized for premium timing and readability)
  useEffect(() => {
    if (count >= 100) {
      // Hold for a moment before starting exit animation
      const timeout = setTimeout(() => {
        setIsExiting(true);
      }, 700);
      return () => clearTimeout(timeout);
    }

    // Varied delay to simulate realistic loading sequence (slowing down as it reaches completion)
    const delay = count < 30 ? 25 : count < 70 ? 40 : 55;

    const timer = setTimeout(() => {
      // Smooth increments
      const increment = count >= 90 
        ? 1 
        : count >= 70 
        ? Math.floor(Math.random() * 3) + 2 
        : Math.floor(Math.random() * 5) + 3;
      setCount(prev => Math.min(prev + increment, 100));
    }, delay);

    return () => clearTimeout(timer);
  }, [count]);

  // Disable scroll when preloader is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Trigger onComplete after exiting animation completes
  const handleExitComplete = () => {
    onComplete();
  };

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          key="preloader-overlay"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%", 
            transition: { 
              duration: 1.1, 
              ease: [0.76, 0, 0.24, 1] // Custom premium cubic-bezier ease
            }
          }}
          onAnimationComplete={handleExitComplete}
          className="fixed inset-0 z-[9999] bg-[#0b0b0b] text-[#fdf9f0] w-screen h-screen flex flex-col items-center justify-center gap-6 select-none"
        >
          {/* Logo Container */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-16 md:h-20 flex items-center justify-center select-none"
          >
            <img src={logo} alt="3ft Logo" className="object-contain h-full w-auto" />
          </motion.div>

          {/* Elegant minimalist horizontal line loader */}
          <div className="w-36 md:w-48 h-[1.5px] bg-[#fdf9f0]/10 relative overflow-hidden rounded-full">
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-[#fdf9f0]" 
              style={{ width: `${count}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
