import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-[var(--card-color)] text-white rounded-lg p-6 shadow-md ${className}`}
      style={{
        fontFamily: 'var(--font-family)',
        fontSize: 'var(--body-medium-size)',
        lineHeight: 'var(--body-medium-line-height)',
      }}
    >
      {children}
    </div>
  );
};

export default Card;
