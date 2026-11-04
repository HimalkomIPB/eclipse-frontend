import React from 'react';
import { useLocation } from 'react-router-dom';
import bgStars from '../assets/bg-stars.webp';
import bgStars1 from '../assets/bg-stars-1.webp';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isInfoLomba = location.pathname.startsWith('/infolomba');
  const activeBg = isInfoLomba ? bgStars1 : bgStars;

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
          backgroundImage: `url(${activeBg})`,
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
