import React from 'react';
import { Link } from 'react-router-dom';
import TImages from '@/utils/images';
import RevealOnScroll from '@/components/common/RevealOnScroll';

/**
 * Hero Section Component
 *
 * Displays the main header section of the HIMALKOM landing page
 * featuring Elevor logo, tagline, and organizational identity.
 *
 * LCP optimizations:
 *  - No entrance delay on above-fold content
 *  - Eclipse logo has fetchpriority="high" and explicit dimensions
 *  - Uses transform-only animation (no filter animation)
 */
const HeroSection = () => (
  <section className="flex items-start pb-4 pt-12 mt-12 px-4 sm:mt-0 sm:pb-6 sm:pt-12 sm:px-6 lg:px-10 md:items-center md:py-20">
    <div
      id="hero-section"
      className="flex w-full flex-col items-center justify-center gap-5 sm:gap-6 md:flex-row md:gap-16 lg:gap-24"
    >
      <div className="order-2 flex flex-col items-center gap-4 text-center md:order-1 md:items-start md:text-start">
        {/* No delay on above-fold text — renders immediately */}
        <RevealOnScroll animation="fade-right" duration={0.4}>
          <img
            src={TImages.TEXT.TEKS_ECLIPSE}
            alt="Elevor"
            width="560"
            height="80"
            className="w-[260px] sm:w-[340px] md:w-[460px] lg:w-[560px]"
          />
        </RevealOnScroll>
        <RevealOnScroll animation="fade-up" duration={0.4}>
          <div className="flex max-w-[520px] flex-col gap-2 text-center text-white md:text-start">
            <strong><span className="text-sm sm:text-base md:text-xl lg:text-2xl">Encouraging Innovation, Leading Purpose, Shared Excellence</span></strong>
            <span className="text-sm sm:text-base md:text-xl lg:text-2xl">Himpunan Mahasiswa Ilmu Komputer IPB University 2025/2026</span>
          </div>
        </RevealOnScroll>
        <RevealOnScroll animation="fade-up" delay={0.1} duration={0.4}>
          <Link
            to="/explore"
            className="glass-btn interactive-btn inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold italic text-white md:text-base"
          >
            Explore
          </Link>
        </RevealOnScroll>
      </div>

      {/* LCP image — no animation delay, fetchpriority high, explicit dimensions */}
      <div className="order-1 md:order-2">
        <div className="eclipse-logo-float p-4 sm:p-6 md:p-10 lg:p-12">
          <img
            src={TImages.LOGO.LOGO_ECLIPSE}
            alt="Logo Himalkom"
            width="384"
            height="384"
            fetchpriority="high"
            decoding="sync"
            className="w-40 sm:w-52 md:w-72 xl:w-96"
          />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
