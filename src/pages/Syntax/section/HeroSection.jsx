import React from "react";
import TImages from "../../../utils/images";

const HeroSection = () => (
  <section>
    <div
      id="hero-section"
      className="flex flex-row justify-center items-center gap-6 sm:gap-12 md:gap-16 lg:gap-24 w-full px-4 pt-12 sm:pt-16 md:pt-20 lg:pt-24"
    >
      {/* Logo Syntax */}
      <img
        src={TImages.LOGO.LOGO_SYNTAX}
        alt="Logo Syntax"
        className="w-28 sm:w-40 md:w-60 xl:w-85"
      />
      <div className="flex flex-col items-start text-center sm:text-left mt-4 sm:mt-0">
        {/* Title */}
        <h1 className="max-w-xl text-start font-semibold md:pb-3 text-2xl sm:text-2xl md:text-4xl lg:text-[45px] leading-normal text-white">
          SYNTAX
        </h1>
        
        {/* Garis Dekoratif */}
        <img
          src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          alt="Garis Elevor"
          className="place-items-start w-[150px] sm:w-[260px] md:w-[300px] lg:w-[361px] my-2 sm:mb-3 md:mb-4 mx-1"
        />
        
        {/* Tagline dan Subtitle */}
        <div className="text-left items-center max-w-sm sm:items-start sm:max-w-xl text-white/80 text-[14px] sm:text-xl md:text-xl lg:text-2xl font-normal">
         <p><b>Syntax</b> merupakan majalah tahunan yang dibuat oleh HImalkom IPB untuk memberikan informasi mengenai kaleidoskop program kerja yang telah terlaksana serta informasi lainnya dalam ruang lingkup departemen Ilmu Komputer IPB.</p>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
