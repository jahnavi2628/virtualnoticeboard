

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  // FIX: Add onClick prop to allow the Card component to be clickable, as it's used with onClick handlers.
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div onClick={onClick} className={`bg-white dark:bg-dark-surface rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
