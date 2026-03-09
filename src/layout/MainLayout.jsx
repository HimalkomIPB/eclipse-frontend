import React from 'react';
import bgStars from '../assets/bg-stars.webp';

const MainLayout = ({ children }) => {
  return (
    <div
      className="relative min-h-screen flex-1 overflow-x-hidden md:pt-14 lg:pt-20"
      style={{
        backgroundColor: '#0E293B',
      }}
    >
      <div
        className="page-bg-blur"
        style={{
          backgroundImage: `url(${bgStars})`,
        }}
        aria-hidden="true"
      ></div>
      <div className="relative z-10 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
