import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * Otomatis scroll ke atas halaman saat route berubah
 * Letakkan komponen ini di dalam Router, tapi di luar Routes
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto';
    }
  }, []);

  return null;
}

export default ScrollToTop;
