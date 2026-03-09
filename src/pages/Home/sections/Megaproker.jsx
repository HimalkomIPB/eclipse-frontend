import React from 'react';
import ReadMoreButton from '@/components/common/ReadMore';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MotionReveal from '@/components/common/MotionReveal';

/**
 * MegaprokerCard Component
 */
const MegaprokerCard = ({ megaproker, baseUrl }) => (
  <MotionReveal animation="fade-up" delay={0.2}>
    <div
      className="h-[180px] w-[320px] rounded-[15px] border border-white/20 bg-white/10 p-5 shadow-card backdrop-blur-md flex items-center justify-between md:h-[220px] md:w-[390px] md:justify-evenly lg:h-[274px] lg:w-[400px] xl:w-[557px]"
    >
      <div className="flex h-full items-center justify-center">
        <img
          src={`${baseUrl}/storage/${megaproker.logo}`}
          alt={megaproker.name}
          className="w-[130px] lg:w-[220px]"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/placeholder-logo.jpg';
          }}
        />
      </div>

      <div className='flex h-full flex-col items-center justify-center gap-4'>
        <h3 className="text-center text-xl font-bold text-white md:text-2xl">{megaproker.name}</h3>
        <ReadMoreButton to={`/megaproker/`} />
      </div>
    </div>
  </MotionReveal>
);

const Megaproker = ({ megaprokerData, loadingMegaproker, errorMegaproker, baseUrl }) => {
  if (loadingMegaproker) {
    return <LoadingSpinner variant="section" message="Memuat megaproker..." />;
  }

  if (errorMegaproker) {
    return <p className="text-center text-xl font-bold text-red-500">Error: {errorMegaproker}</p>;
  }

  if (!megaprokerData?.megaprokers || megaprokerData.megaprokers.length === 0) {
    return <p className="my-8 text-center text-gray-500">Tidak ada data megaproker</p>;
  }

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-6 py-4 md:py-5 lg:grid-cols-2 lg:gap-10 lg:py-6">
      {megaprokerData.megaprokers.map((megaproker) => (
        <MegaprokerCard
          key={megaproker.id || `megaproker-${megaproker.slug}`}
          megaproker={megaproker}
          baseUrl={baseUrl}
        />
      ))}
    </div>
  );
};

export default Megaproker;
