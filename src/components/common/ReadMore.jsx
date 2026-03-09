import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";

const ReadMoreButton = ({ 
    to, 
    label = "Selengkapnya", 
    newTab = false,
  }) => {

  // Fungsi biar pas di pencet mulai dari atas halaman
  const handleClick = () => {
    if (!newTab) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className='interactive-btn rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 p-1'>
      <Link 
        to={to}
        className="flex items-center justify-center transition-all duration-300 px-2 py-1 gap-4 group"
        onClick={handleClick}
        target={newTab ? "_blank" : "_self"}
        rel={newTab ? "noopener noreferrer" : ""}
      >
        <span className="text-sm font-medium text-primary group-hover:text-primary-dark transition-colors duration-300">
          {label}
        </span>
        <div className="bg-primary p-0.5 rounded flex items-center justify-center transition-all duration-300 group-hover:bg-primary-dark group-hover:transform group-hover:translate-x-1">
          <FaAngleRight 
            size={16} 
            className="text-primary-darker transition-all duration-300" 
          />
        </div>
      </Link>
    </div>
  );
};

export default ReadMoreButton;
