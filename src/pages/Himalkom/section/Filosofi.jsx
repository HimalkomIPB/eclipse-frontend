import React from "react";
import TImages from "../../../utils/images";
import MotionReveal from '@/components/common/MotionReveal';

const Filosofi = () => {
  return(
    <div className="px-10 py-10 flex flex-col md:flex-row lg:px-30 items-center md:items-start gap-8">
      {/* Logo + Teks Elevor (Kiri) */}
      <MotionReveal animation="fade-left" delay={0.3}>
        <div className="flex flex-col items-center md:items-start gap-6 w-full">
          <img 
            src={TImages.LOGO.LOGO_ELEVOR}
            alt="Logo Elevor"
            className="w-50 md:w-66 lg:w-90"
          />
          <img
            src={TImages.TEXT.TEKS_ELEVOR}
            alt="Elevor"
            className="w-47 md:w-64 lg:w-85"
          />
        </div>
      </MotionReveal>

      {/* Explanation Cards (Kanan) */}
      <div className="relative w-full py-15 items-center flex flex-col gap-6 md:items-end lg:items-end">
        <MotionReveal animation="fade-right">
          <div className="rounded-lg border border-white/15 bg-[linear-gradient(180deg,rgba(27,62,89,0.92)_0%,rgba(14,41,59,0.94)_100%)] p-4 text-center shadow-[0_18px_36px_rgba(2,14,26,0.22)] w-[330px] lg:text-start xl:w-[505px] lg:w-[400px] backdrop-blur-xl">
            <h1 className="text-lg font-bold text-white">ELEVATE</h1>
            <p className="text-white/85">Meninggikan Potensi, Meningkatkan Kualitas</p>
          </div>
        </MotionReveal>
       <MotionReveal animation="fade-right" delay={0.3}>
        <div className="rounded-lg border border-white/15 bg-[linear-gradient(180deg,rgba(27,62,89,0.92)_0%,rgba(14,41,59,0.94)_100%)] p-4 text-center shadow-[0_18px_36px_rgba(2,14,26,0.22)] w-[330px] xl:w-[705px] lg:text-start lg:w-[400px] backdrop-blur-xl">
            <h1 className="text-lg font-bold text-white">INVEST</h1>
            <p className="text-white/85">Menanam Nilai, Menuai Masa Depan</p>
          </div>
       </MotionReveal>
        <MotionReveal animation="fade-right" delay={0.5}>
          <div className="rounded-lg border border-white/15 bg-[linear-gradient(180deg,rgba(27,62,89,0.92)_0%,rgba(14,41,59,0.94)_100%)] p-4 text-center shadow-[0_18px_36px_rgba(2,14,26,0.22)] w-[330px] lg:text-start xl:w-[505px] lg:w-[400px] backdrop-blur-xl">
            <h1 className="text-lg font-bold text-white">OPPORTUNITY</h1>
            <p className="text-white/85">Membuka Jalan, Mewujudkan Peluang</p>
          </div>
        </MotionReveal>
      </div>
    </div>


  );
};

export default Filosofi;
