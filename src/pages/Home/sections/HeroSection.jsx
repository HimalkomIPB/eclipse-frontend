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
  <section className="min-h-[calc(100svh-72px)] md:min-h-screen flex items-center">
    <div
      id="hero-section"
      className="flex flex-col md:flex-row justify-center items-center gap-8 sm:gap-10 md:gap-16 lg:gap-24 w-full px-4 sm:px-6 md:px-8 py-8 md:py-0"
    >
      <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-start">
        <MotionReveal animation="fade-right" delay={0.5}>
          {/* Teks Eclipse */}
          <img 
            src={TImages.TEXT.TEKS_ECLIPSE}
            alt="Elevor"
            className="w-[260px] sm:w-[340px] md:w-[460px] lg:w-[560px]" 
          />
        </MotionReveal>
        <MotionReveal animation="fade-up" delay={0.5}>
          {/* Tagline dan Subtitle */}
          <div className="flex gap-2 flex-col text-center md:text-start text-white max-w-[520px]">
            <strong><span className="text-sm sm:text-base md:text-xl lg:text-2xl">Encouraging Innovation, Leading Purpose, Shared Excellence</span></strong>
            <span className="text-sm sm:text-base md:text-xl lg:text-2xl">Himpunan Mahasiswa Ilmu Komputer IPB University 2025/2026</span>
          </div>
        </MotionReveal>
      </div>
         {/* Logo Himalkom Eclipse */}
        <MotionReveal animation="fade-left" delay={0.5}>
          <img
            src={TImages.LOGO.LOGO_ECLIPSE}
            alt="Logo Himalkom"
            className="w-40 sm:w-52 md:w-72 xl:w-96"
          />
        </MotionReveal>
    </div>
  </section>
);

export default HeroSection;
