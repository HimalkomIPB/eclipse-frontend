import React from 'react';

/**
 * Pure CSS zero-dependency loading spinner component.
 * Replaces react-spinners to eliminate extra JS chunk overhead.
 *
 * @param {Object} props
 * @param {string} props.size - 'small' | 'medium' | 'large'
 * @param {string} props.variant - 'page' | 'section' | 'inline'
 * @param {string} props.message - Optional message
 * @param {string} props.className - Additional CSS classes
 */
const LoadingSpinner = ({
  size = 'medium',
  variant = 'section',
  message = 'Memuat data...',
  className = ''
}) => {
  const pixelSizes = {
    small: 18,
    medium: 32,
    large: 48
  };

  const px = pixelSizes[size] || pixelSizes.medium;

  const renderSpinner = () => {
    if (variant === 'inline') {
      return (
        <span
          style={{
            width: `${px}px`,
            height: `${px}px`,
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderTopColor: '#AFE1EA',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'himalkom-spin 0.65s linear infinite',
          }}
        />
      );
    }

    if (variant === 'page') {
      return (
        <div
          style={{
            width: `${px}px`,
            height: `${px}px`,
            border: '3px solid rgba(175, 225, 234, 0.2)',
            borderTopColor: '#AFE1EA',
            borderRightColor: '#5CA6B3',
            borderRadius: '50%',
            animation: 'himalkom-spin 0.75s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          }}
        />
      );
    }

    // Default: Pulse dots spinner
    return (
      <div className="flex items-center gap-1.5">
        <span
          className="h-2.5 w-2.5 rounded-full bg-[#AFE1EA]"
          style={{ animation: 'himalkom-pulse 1.2s infinite ease-in-out', animationDelay: '0s' }}
        />
        <span
          className="h-2.5 w-2.5 rounded-full bg-[#AFE1EA]"
          style={{ animation: 'himalkom-pulse 1.2s infinite ease-in-out', animationDelay: '0.2s' }}
        />
        <span
          className="h-2.5 w-2.5 rounded-full bg-[#AFE1EA]"
          style={{ animation: 'himalkom-pulse 1.2s infinite ease-in-out', animationDelay: '0.4s' }}
        />
      </div>
    );
  };

  const containerClass = {
    page: 'min-h-[50vh] flex items-center justify-center',
    section: 'py-12 flex items-center justify-center',
    inline: 'inline-flex items-center gap-3'
  };

  return (
    <div className={`${containerClass[variant] || containerClass.section} ${className}`}>
      <style>{`
        @keyframes himalkom-spin { to { transform: rotate(360deg); } }
        @keyframes himalkom-pulse { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
      `}</style>
      <div className="flex flex-col items-center">
        {renderSpinner()}
        {message && (
          <p className="mt-3 text-center text-sm text-white/70">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;