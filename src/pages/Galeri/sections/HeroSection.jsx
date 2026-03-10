import React from "react";
import TImages from "../../../utils/images";

const HeroSection = () => (
  <section>
    <div
      id="hero-section"
      className="flex flex-row justify-center items-center gap-6 sm:gap-12 md:gap-16 lg:gap-24 sm:mt-15 md:mt-0 w-full px-4 "
    >
      {/* Logo Syntax */}
      <img
        src={TImages.LOGO.LOGO_IGALLERY}
        alt="Logo Syntax"
        className="w-28 sm:w-40 md:w-60 xl:w-85"
      />
      <div className="flex flex-col items-start text-center text-white sm:text-left mt-4 sm:mt-0">
        {/* Title */}
        <h1 className="max-w-xl text-start font-semibold md:pb-3 text-2xl sm:text-2xl md:text-4xl lg:text-[45px] leading-normal">
          I-Gallery
        </h1>
        
        {/* Garis Dekoratif */}
        <img
          src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
          alt="Garis Elevor"
          className="place-items-start w-[150px] sm:w-[260px] md:w-[300px] lg:w-[361px] my-2 sm:mb-3 md:mb-4 mx-1"
        />
        
        {/* Tagline dan Subtitle */}
        <div className="text-left items-center max-w-sm sm:items-start sm:max-w-xl text-white/85 text-[14px] sm:text-xl md:text-xl lg:text-2xl font-normal">
         <p><b className="text-white">I-Gallery</b> adalah platform yang berisi kumpulan projek-projek yang telah dibuat oleh mahasiswa ilmu komputer. I-Gallery menampilkan projek dari setiap mata kuliah berprojek. Tujuan dari I-Gallery adalah untuk menunjukan projek yang telah dibuat oleh mahasiswa ilmu komputer.</p>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
