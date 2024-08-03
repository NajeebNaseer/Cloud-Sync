// src/components/StackedCard.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StackedCard = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div
          className="flex justify-between items-center px-6 py-4 cursor-pointer"
          onClick={toggleCard}
        >
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <svg
            className={`h-6 w-6 transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 6.293a1 1 0 011.414 0L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="px-6 py-4"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default StackedCard;
