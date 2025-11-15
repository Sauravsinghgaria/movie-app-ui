import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
  icon,
}) => {
  const baseStyles =
    'font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2';

  const variantStyles = {
    primary: 'bg-[var(--primary-color)] text-white hover:bg-green-400 disabled:bg-green-200',
    secondary: 'bg-[var(--input-color)] text-white hover:bg-[var(--card-color)] disabled:bg-gray-400',
    danger: 'bg-[var(--error-color)] text-white hover:bg-red-400 disabled:bg-red-200',
    outline:
      'border-2 border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-green-50 disabled:border-gray-400 disabled:text-gray-400',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-[var(--body-small-size)]',
    md: 'px-4 py-2 text-[var(--body-medium-size)]',
    lg: 'px-6 py-3 text-[var(--body-large-size)]',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className} disabled:cursor-not-allowed`}
      style={{
        fontFamily: 'var(--font-family)',
        lineHeight: 'var(--body-medium-line-height)',
      }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};