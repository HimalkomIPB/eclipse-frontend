import { useState, useEffect } from 'react';
import Logo from './Logo';
import NavMenu from './NavMenu';
import MobileMenu from './MobileMenu';

/**
 * Header utama website yang tampil di seluruh halaman
 */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (isMobileMenuOpen && 
          !e.target.closest('.mobile-menu') && 
          !e.target.closest('.burger-button')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('click', closeOnOutsideClick);
    return () => document.removeEventListener('click', closeOnOutsideClick);
  }, [isMobileMenuOpen]);

  // Mengunci scroll saat menu mobile terbuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="z-50 w-full top-0 left-0 bg-primary">
      <div className="container mx-auto flex items-center justify-between px-6 xl:px-15 py-3">
        {/* Logo */}
        <Logo />
        
        {/* Navigation untuk Desktop */}
        <div className="hidden lg:block">
          <NavMenu />
        </div>
        
        {/* Burger Menu untuk Mobile dengan animasi yang rapi */}
        <div className="block lg:hidden">
          <button 
            className="burger-button relative z-50 p-2 hover:bg-primary-light/40 rounded-md transition-all duration-300"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-6 h-6 flex flex-col justify-center items-center">
              <span 
                className={`absolute h-0.5 w-6 bg-primary-darker rounded-sm transition-all duration-300 ease-in-out transform-gpu ${
                  isMobileMenuOpen 
                    ? 'rotate-45' 
                    : '-translate-y-2'
                }`}
              ></span>
              
              <span 
                className={`absolute h-0.5 w-6 bg-primary-darker rounded-sm transition-all duration-200 ease-in-out transform-gpu ${
                  isMobileMenuOpen 
                    ? 'opacity-0 scale-0' 
                    : 'opacity-100'
                }`}
              ></span>
              
              <span 
                className={`absolute h-0.5 w-6 bg-primary-darker rounded-sm transition-all duration-300 ease-in-out transform-gpu ${
                  isMobileMenuOpen 
                    ? '-rotate-45' 
                    : 'translate-y-2'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu dengan animasi slide dan fade */}
      <div 
        className={`fixed top-0 right-0 w-full h-screen z-40 transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen 
            ? 'translate-x-0 opacity-100 visible' 
            : 'translate-x-full opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 backdrop-blur-sm transition-all" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="mobile-menu absolute top-0 right-0 w-64 bg-white shadow-card transition-transform duration-300 ease-in-out transform">
          <MobileMenu onCloseMenu={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>
    </header>
  );
};

export default Header;