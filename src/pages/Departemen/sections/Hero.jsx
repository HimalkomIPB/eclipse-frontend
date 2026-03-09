import React from 'react';
import TImages from '@/utils/images';
import MotionReveal from '@/components/common/MotionReveal';

/**
 * Hero section for department page
 * Displays department logo, name, and description
 * 
 * @param {Object} props
 * @param {Object} props.department - Department data
 * @returns {JSX.Element}
 */
const HeroSection = ({ department, baseUrl }) => {  
  if (!department) {
    return <div className="text-center py-8">Data departemen tidak tersedia</div>;
  }

  return (
    <MotionReveal animation="fade-up" delay={0.3}>
      <div className="flex flex-row justify-center items-center gap-6 sm:gap-12 md:gap-16 lg:gap-24 w-full px-4 pt-20 sm:pt-20 md:pt-10 lg:pt-8">
        {/* Department logo */}
        {department?.logo ? (
          <img
            src={`${baseUrl}/storage/${department.logo}`}
            alt={department.name || 'Logo Departemen'}
            className="w-45 sm:w-50 md:w-60 xl:w-85"
          />
        ) : (
          <div className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[250px] h-[150px] sm:h-[180px] md:h-[200px] lg:h-[250px] bg-gray-200 animate-pulse rounded"></div>
        )}

        {/* Department name and description */}
        <div className="flex flex-col items-start text-center sm:text-left mt-4 sm:mt-0">
          <h1 className="max-w-xl text-start font-semibold md:pb-3 text-3xl md:text-4xl lg:text-[45px] leading-normal">
            {department?.abbreviation || department?.name || 'Departemen'}
          </h1>
          
          {/* Decorative line */}
          <div className="flex justify-center md:justify-start">
            <img 
              src={TImages.DECORATIVE_ELEMENTS.GARIS_PRESTASI}
              alt="Divider"
              className="place-items-start w-[150px] sm:w-[260px] md:w-[300px] lg:w-[361px] my-2 sm:mb-3 md:mb-4 mx-1"
            />
          </div>
          
          {/* Department description */}
          <p className="text-justify items-center max-w-sm sm:items-start sm:max-w-xl text-black text-[12px] sm:text-[17px] md:text-xl lg:text-2xl font-normal">
            {department?.description || 'Deskripsi tidak tersedia'}
          </p>
        </div>
      </div>
    </MotionReveal>
  );
};

export default HeroSection;