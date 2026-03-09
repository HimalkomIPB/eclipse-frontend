import React from 'react';
import ReadMoreButton from '@/components/common/ReadMore';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MotionReveal from '@/components/common/MotionReveal';

/**
 * MegaprokerCard Component
 * 
 * Menampilkan informasi untuk satu program kerja utama dalam bentuk card
 * dengan logo dan navigasi ke halaman detail
 * 
 * @param {Object} props
 * @param {Object} props.megaproker - Data megaproker dari API
 * @param {string} props.megaproker.name - Nama megaproker
 * @param {string} props.megaproker.logo - Path ke logo megaproker
 * @param {string} props.megaproker.slug - Slug untuk navigasi
 * @param {string} props.baseUrl - URL dasar API untuk assets
 * @returns {JSX.Element}
 */
const MegaprokerCard = ({ megaproker, baseUrl }) => (
  <MotionReveal animation="fade-up" delay={0.2}>
    <div
      className="w-[320px] h-[180px] md:w-[390px] md:h-[220px] lg:w-[400px] lg:h-[274px] xl:w-[557px] rounded-[15px] bg-white/10 backdrop-blur-md border border-white/20 shadow-card flex items-center justify-between md:justify-evenly p-5"
    >
      {/* Logo megaproker - container dengan ukuran tetap */}
      <div className="flex justify-center items-center h-full ">
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
      
      {/* Informasi dan tombol navigasi */}
      <div className='flex flex-col items-center justify-center gap-4 h-full'>
        <h3 className="font-bold text-white text-xl md:text-2xl text-center">{megaproker.name}</h3>
        <ReadMoreButton to={`/megaproker/`} />
      </div>
    </div>
  </MotionReveal>
);

/**
 * Megaproker Section Component
 * 
 * Menampilkan daftar program kerja utama HIMALKOM
 * dalam layout grid responsif dengan 1 kolom (mobile) atau 2 kolom (desktop)
 * 
 * @param {Object} props
 * @param {Object} props.megaprokerData - Data megaproker dari API
 * @param {Array} props.megaprokerData.megaprokers - Daftar megaproker
 * @param {boolean} props.loadingMegaproker - Status loading data
 * @param {string|null} props.errorMegaproker - Pesan error jika ada
 * @param {string} props.baseUrl - URL dasar API untuk assets
 * @returns {JSX.Element|null}
 */
const Megaproker = ({ megaprokerData, loadingMegaproker, errorMegaproker, baseUrl }) => {
  // Handle loading state
  if (loadingMegaproker) {
    return <LoadingSpinner variant="section" message="Memuat megaproker..." />;
  }
  
  // Handle error state
  if (errorMegaproker) {
    return <p className="text-red-500 font-bold text-xl text-center">Error: {errorMegaproker}</p>;
  }
  
  // Handle empty data
  if (!megaprokerData?.megaprokers || megaprokerData.megaprokers.length === 0) {
    return <p className="text-center text-gray-500 my-8">Tidak ada data megaproker</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-18 justify-items-center mx-auto max-w-6xl py-8">
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