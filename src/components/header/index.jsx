import { useState, useEffect } from 'react';
import Logo from './Logo';
import NavMenu from './NavMenu';
import MobileMenu from './MobileMenu';

/**
 * Header utama website yang tampil di seluruh halaman
 */
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (
        isMobileMenuOpen &&
        !e.target.closest('.mobile-menu') &&
        !e.target.closest('.burger-button')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', closeOnOutsideClick);
    return () => document.removeEventListener('click', closeOnOutsideClick);
  }, [isMobileMenuOpen]);

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

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="w-full">
        <div
          className={`nav-shell relative z-50 px-5 w-full ${
            isScrolled ? 'is-scrolled mt-0' : 'mt-4 sm:mt-5 xl:mt-7'
          }`}
        >
          <div className="nav-shell-bg" aria-hidden="true"></div>
          <div className="relative z-10 mx-auto flex max-w-[1360px] items-center justify-center px-4 py-3 font-montserrat sm:px-6 xl:justify-between xl:px-8 xl:py-4">
            <div className="xl:mx-0">
              <Logo />
            </div>

            <div className="hidden xl:block">
              <NavMenu />
            </div>

            <div className="absolute right-4 block xl:hidden sm:right-6">
              <button
                className="burger-button relative z-50 rounded-full border border-white/15 bg-white/8 p-2 text-white transition-all duration-300 hover:bg-white/12"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <div className="relative flex h-5 w-5 flex-col items-center justify-center sm:h-6 sm:w-6">
                  <span
                    className={`absolute h-0.5 w-5 rounded-sm bg-white transition-all duration-300 ease-in-out transform-gpu sm:w-6 ${
                      isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5 sm:-translate-y-2'
                    }`}
                  ></span>

                  <span
                    className={`absolute h-0.5 w-5 rounded-sm bg-white transition-all duration-200 ease-in-out transform-gpu sm:w-6 ${
                      isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'
                    }`}
                  ></span>

                  <span
                    className={`absolute h-0.5 w-5 rounded-sm bg-white transition-all duration-300 ease-in-out transform-gpu sm:w-6 ${
                      isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5 sm:translate-y-2'
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
      </div>
      </div>

      <div
        className={`fixed inset-0 z-40 transition-[opacity,backdrop-filter,background-color] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-[backdrop-filter,opacity] ${
          isMobileMenuOpen
            ? 'bg-slate-950/20 backdrop-blur-sm opacity-100'
            : 'pointer-events-none bg-slate-950/0 backdrop-blur-0 opacity-0'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <div
        className={`mobile-menu fixed right-4 top-20 z-50 w-[min(22rem,calc(100vw-2rem))] transform transition-transform duration-350 ease-[cubic-bezier(0.22,0.61,0.36,1)] sm:right-6 sm:top-24 lg:right-8 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-[120%]'
        }`}
      >
        <MobileMenu onCloseMenu={() => setIsMobileMenuOpen(false)} />
      </div>
    </header>
  );
};

export default Header;
