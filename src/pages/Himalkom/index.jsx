import React from 'react';
import TImages from '../../utils/images';
import MotionReveal from '@/components/common/MotionReveal';

// Import sections untuk halaman 
import HeroSection from '../Home/sections/HeroSection';
import Filosofi from './section/Filosofi';
import Division from './section/Division';
import Description from './section/Description';

// Import custom hooks
import { useFetchData } from '../../hooks/useAPI';

const Himalkom = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Data API
  const { data: divisionData, loading: divisionLoading, error: divisionError } = useFetchData('divisions', baseUrl);

  return (
   <>
   {/* Hero Section */}
    <MotionReveal animation="fade-up">
      <HeroSection />
    </MotionReveal>

    {/* Desc Section */}
    <section className="flex flex-col items-center mt-70 lg:mx-30 sm:items-center md:items-center md:flex-col gap-11 lg:flex-row justify-around h-auto text-white">
      <Description />
    </section>
    

    {/* Filosofi Section */}
    <section className="px-4 flex flex-col text-center mt-50">
      <MotionReveal animation="fade-up">
        <div className='flex flex-col items-center mb-[1px] '>
          {/* Judul */}
          <h1 className="font-semibold pb-[10px] text-[35px] lg:text-[48px] leading-11 text-white">FILOSOFI LOGO</h1>
          {/* Garis */}
          <img
            src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
            alt="Garis Prestasi"
            className="w-[250px] lg:w-[340px]"
          />
        </div>
        <p className="text-xl text-center lg:text-2xl my-[30px] text-white/85">
          <b>Elevor</b> bukan sekadar nama kabinet, tetapi sebuah gerakan yang membawa perubahan nyata dalam Himalkom.
        </p>
      </MotionReveal>
      
      <MotionReveal animation="fade-up" delay={0.2}>
        <Filosofi />
      </MotionReveal>
    </section>

    {/* Departemen Section */}
    <section className="px-4 flex flex-col items-center text-center mt-25 mb-50 lg:my-50 text-white">
      <MotionReveal animation="fade-up">
        <div className='flex flex-col items-center mb-[1px] '>
          {/* Judul */}
          <h1 className="font-semibold pb-[10px] text-[30px] lg:text-[48px] leading-11 text-white">DEPARTEMEN HIMALKOM</h1>
          {/* Garis */}
          <img
            src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
            alt="Garis Prestasi"
            className="pb-8 w-[340px] lg:w-[500px]"
          />
        </div>
      </MotionReveal>
      
      <MotionReveal animation="fade-up" delay={0.3}>
        <Division 
          divisionData={divisionData}
          divisionError={divisionError}
          divisionLoading={divisionLoading}
          baseUrl={baseUrl}
        />
      </MotionReveal>
    </section>
   </>
  );
};

export default Himalkom;
