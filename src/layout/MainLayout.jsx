import React from 'react';
import bgStars from '../assets/bg-stars.webp';

const MainLayout = ({ children }) => {
  return (
    <div
      className="relative min-h-screen flex-1 overflow-x-hidden md:pt-14 lg:pt-20"
      style={{
        backgroundImage: `url(${bgStars})`,
        backgroundColor: '#0E293B',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundAttachment: 'scroll',
      }}
    >
      <div className="relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
