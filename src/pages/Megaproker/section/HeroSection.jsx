import React from "react";
import TImages from "@/utils/images";

const HeroSection = () => (
  <section>
    <div
      id="hero-section"
      className="flex flex-row justify-center items-center gap-6 sm:gap-12 md:gap-16 lg:gap-24 mt-15 w-full px-4"
    >
      {/* Logo Megaproker */}
      <img
        src={TImages.LOGO.LOGO_MEGAPROKER}
        alt="Logo Megaproker"
        className="w-28 sm:w-40 md:w-60 xl:w-90"
      />
      <div className="flex flex-col items-start text-center text-white sm:text-left mt-4 sm:mt-0">
        {/* Title */}
        <h1 className="max-w-xl text-start font-semibold md:pb-3 text-[18px] sm:text-2xl md:text-4xl lg:text-[45px] leading-normal">
          MEGAPROKER HIMALKOM IPB UNIVERSITY 2026/2027
        </h1>
        
        {/* Garis Dekoratif */}
        <img
          src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          alt="Garis Elevor"
          className="place-items-start w-[200px] sm:w-[260px] md:w-[300px] lg:w-[361px] my-2 sm:mb-3 md:mb-4 mx-1"
        />
      </div>
    </div>
  </section>
);

export default HeroSection;
