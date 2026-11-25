import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';
import NavMenu from './NavMenu';
import MobileMenu from './MobileMenu';

// Match Tailwind's xl breakpoint used by the desktop navigation.
const desktopMediaQuery = '(min-width: 80rem)';

const Header = () => {
  const { key: locationKey } = useLocation();
  const menuButtonRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [locationKey]);

  useEffect(() => {
    const desktop = window.matchMedia(desktopMediaQuery);
    const closeOnDesktop = event => {
      if (event.matches) setIsMobileMenuOpen(false);
    };

    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleEscape = event => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className={`nav-shell relative z-50 w-full px-5 ${isScrolled ? 'is-scrolled mt-0' : 'mt-4 sm:mt-5 xl:mt-7'}`}>
        <div className="nav-shell-bg" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex max-w-[1360px] items-center justify-center px-4 py-3 font-montserrat sm:px-6 xl:justify-between xl:px-8 xl:py-4">
          <Logo />

          <div className="hidden xl:block">
            <NavMenu />
          </div>

          <div className="absolute right-4 block sm:right-6 xl:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              className="burger-button relative z-50 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition-all duration-300 hover:bg-white/12"
              onClick={() => setIsMobileMenuOpen(open => !open)}
              aria-label="Menu navigasi"
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
            >
              <span aria-hidden="true" className="relative flex h-5 w-5 items-center justify-center sm:h-6 sm:w-6">
                <span className={`absolute h-0.5 w-full rounded-sm bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5 sm:-translate-y-2'}`} />
                <span className={`absolute h-0.5 w-full rounded-sm bg-white transition-opacity duration-200 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute h-0.5 w-full rounded-sm bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5 sm:translate-y-2'}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 transition-[opacity,backdrop-filter,background-color] duration-400 motion-reduce:transition-none xl:hidden ${
          isMobileMenuOpen ? 'bg-slate-950/20 opacity-100 backdrop-blur-sm' : 'pointer-events-none opacity-0'
        }`}
        onClick={closeMobileMenu}
      />
      <div
        id="mobile-navigation"
        inert={!isMobileMenuOpen}
        className={`absolute right-4 top-full z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] transition-[translate,opacity,visibility] duration-350 motion-reduce:transition-none sm:right-6 lg:right-8 xl:hidden ${
          isMobileMenuOpen ? 'visible translate-x-0 opacity-100' : 'invisible translate-x-full opacity-0'
        }`}
      >
        <MobileMenu isOpen={isMobileMenuOpen} onCloseMenu={closeMobileMenu} />
      </div>
    </header>
  );
};

export default Header;
