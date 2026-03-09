import React from 'react';
import TImages from '@/utils/images';
import MotionReveal from '@/components/common/MotionReveal';

/**
 * Hero Section Component
 * 
 * Displays the main header section of the HIMALKOM landing page
 * featuring Elevor logo, tagline, and organizational identity
 * 
 * @returns {JSX.Element} The Hero section component
 */
const HeroSection = () => (
  <section className="flex items-start pb-4 pt-12 mt-12 px-4 sm:mt-0 sm:pb-6 sm:pt-12 sm:px-6 lg:px-10 md:items-center md:py-20">
    <div
      id="hero-section"
      className="flex w-full flex-col items-center justify-center gap-5 sm:gap-6 md:flex-row md:gap-16 lg:gap-24"
    >
      <div className="order-2 flex flex-col items-center gap-4 text-center md:order-1 md:items-start md:text-start">
        <MotionReveal animation="fade-right" delay={0.5}>
          <img
            src={TImages.TEXT.TEKS_ECLIPSE}
            alt="Elevor"
            className="w-[260px] sm:w-[340px] md:w-[460px] lg:w-[560px]"
          />
        </MotionReveal>
        <MotionReveal animation="fade-up" delay={0.5}>
          <div className="flex max-w-[520px] flex-col gap-2 text-center text-white md:text-start">
            <strong><span className="text-sm sm:text-base md:text-xl lg:text-2xl">Encouraging Innovation, Leading Purpose, Shared Excellence</span></strong>
            <span className="text-sm sm:text-base md:text-xl lg:text-2xl">Himpunan Mahasiswa Ilmu Komputer IPB University 2025/2026</span>
          </div>
        </MotionReveal>
        <MotionReveal animation="fade-up" delay={0.6}>
          <a
            href="#about"
            className="glass-btn interactive-btn inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold italic text-white md:text-base"
          >
            Explore
          </a>
        </MotionReveal>
      </div>

      <MotionReveal animation="fade-left" delay={0.5} className="order-1 md:order-2">
        <div className="eclipse-logo-float p-4 sm:p-6 md:p-10 lg:p-12">
          <img
            src={TImages.LOGO.LOGO_ECLIPSE}
            alt="Logo Himalkom"
            className="w-40 sm:w-52 md:w-72 xl:w-96"
          />
        </div>
      </MotionReveal>
    </div>
  </section>
);

export default HeroSection;
