import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

const Countdown = ({ targetDate, timezone = 'UTC', isDarkMode }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDateTime = new Date(targetDate);
      const currentTime = new Date();
      
      const difference = targetDateTime - currentTime;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation

    return () => clearInterval(timer);
  }, [targetDate, timezone]);

  const TimeUnit = ({ value, label }) => (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center px-2 px-md-3"
    >
      <div 
        className="rounded-4 p-2 p-md-3 mb-2"
        style={{
          background: isDarkMode ? '#2d2d2d' : '#f8f9fa',
          minWidth: '65px',
          width: '100%',
          maxWidth: '120px',
          boxShadow: isDarkMode 
            ? '0 4px 15px rgba(0,0,0,0.3)'
            : '0 4px 15px rgba(0,0,0,0.1)'
        }}
      >
        <span 
          className="fw-bold"
          style={{ 
            color: isDarkMode ? '#fff' : '#2c3e50',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)'
          }}
        >
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <div 
        className="text-uppercase"
        style={{ 
          fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
          color: isDarkMode ? '#ccc' : '#6c757d'
        }}
      >
        {label}
      </div>
    </motion.div>
  );

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="d-flex justify-content-center align-items-center flex-wrap gap-2 gap-md-3">
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
