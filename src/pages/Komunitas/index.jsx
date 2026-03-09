import React, { useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom";


// Import custom hooks
import { useFetchData } from '../../hooks/useAPI';

// Import reuse komponen
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SectionHeader from '../../components/common/SectionHeader';
import TImages from '../../utils/images';
import MotionReveal from '@/components/common/MotionReveal';
import NotFound from '../NotFound';

// Import section
import DokumKomun from './section/DokumKomun';
import PortoKomun from './section/PortoKomun'

const Komunitas = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { slug } = useParams();
  const { hash, search } = useLocation();

  // Fetch communities data
  const { data, loading, error} = useFetchData(`communities/${slug}`, baseUrl);
  const community = data?.community

  useEffect(() => {
    if (loading || !community) return;
    const section = new URLSearchParams(search).get('section');
    if (hash !== '#portfolio' && section !== 'portfolio') return;
    const target = document.getElementById('portfolio');
    if (target) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, [hash, search, loading, community]);

  // Handle loading and error states
  if (loading) return <LoadingSpinner variant="page" size="large" message="Memuat data komunitas..." />;
  if (error || !community) return <NotFound/>;

  return (
    <div className="w-full">
      <MotionReveal animation="fade-up">
        {/* Hero Section */}
        <section className="font-athiti">
          <div id="hero-section" 
          className="flex flex-row justify-center items-center gap-6 sm:gap-12 md:gap-16 lg:gap-24 mt-10 sm:mt-20 md:mt-8 w-full px-4">
            {/* Logo Komunitas */}
            <img
              src={`${baseUrl}/storage/${community.logo}`}
              alt={community.name}
              className="w-28 sm:w-40 md:w-60 xl:w-85 rounded-full border-2 border-white/40 bg-white/5 drop-shadow-[0_0_30px_rgba(255,255,255,0.6)]"
            />
            <div className="flex flex-col items-start text-center sm:text-left mt-4 sm:mt-0">
              {/* Nama komunitas */}
              <h1 className="font-semibold text-white md:pb-3 text-[70px] leading-24 md:text-[110px] sm:w-[300px] md:w-[363px] lg:text-[110px]">
                {community.name}
              </h1>
              {/* Garis Dekor */}
              <img
                src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
                alt="Garis Elevor"
                className="place-items-start w-[150px] sm:w-[260px] md:w-[300px] lg:w-[361px] my-2 sm:mb-3 md:mb-4 mx-1"
              />
            </div>
          </div>
        </section>
      </MotionReveal>
      
      <MotionReveal animation="fade-up" delay={0.2}>
        {/* Description */}
        <section className="relative w-80 font-athiti md:w-120 lg:w-200 mx-auto mt-[250px] ">
          <p className="text-[16px] sm:text-[20px] md:text-[25px] text-justify leading-relaxed text-white/85">{community.description}</p>
          <img
            src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
            alt="Garis Elevor"
            className="place-items-start w-[260px] md:w-[300px] lg:w-[361px] my-2 sm:mb-3 md:mb-4 mx-1"
          />
        </section>
      </MotionReveal>

      {/* Prestasi Section */}
      <MotionReveal animation="fade-up" delay={0.2}>
        <section className="px-4 flex flex-col mt-[200px]">
          <SectionHeader title="PRESTASI" altText="Garis Prestasi" />
          <div className="flex justify-center items-center">
            <div className="border border-white/12 bg-[linear-gradient(180deg,rgba(27,62,89,0.92)_0%,rgba(14,41,59,0.94)_100%)] shadow-[0_18px_36px_rgba(2,14,26,0.22)] rounded-xl lg:w-[780px] backdrop-blur-xl">
              {/* Punya achievment dan di API ga "-" */}
              {community.achievements.length > 0 &&
                community.achievements.some((item) => item.value.trim() !== "-") ? (
                  <ul className="list-disc py-4 px-10 space-y-2 font-athiti lg:text-[25px] text-white/85">
                    {community.achievements
                      .filter((item) => item.value.trim() !== "-") 
                      .map((item, index) => (
                        <li key={index}>{item.value}</li>
                      ))}
                  </ul>
                ) : (
                  <p className="py-6 px-10 text-center text-white/70 font-athiti text-[22px]">Coming Soon</p>
              )}
            </div>
          </div>
        </section>
      </MotionReveal>

      {/* Dokumentasi Section */}
      <MotionReveal animation="fade-up" delay={0.2}>
        <section className="px-4 flex flex-col mt-[200px] items-center">
          <SectionHeader title="DOKUMENTASI" altText="Garis Dokumentasi" />
          <DokumKomun slides={community.images.map(img => ({
            ...img,      
            url: `${baseUrl}/storage/${img.url}`
            }))} />
        </section>
      </MotionReveal>
      
      <MotionReveal animation="fade-up" delay={0.2}>
        <section id="portfolio" className="px-4 flex flex-col mt-[200px] items-center">
          <SectionHeader title="PORTOFOLIO KOMUNITAS" altText="Garis Dokumentasi" />
          <PortoKomun slug={slug} baseUrl={baseUrl}/>
        </section>
      </MotionReveal>

      {/* Narahubung Section */}
      <MotionReveal animation="fade-up" delay={0.1}>
        <section className="px-4 text-[24px] flex flex-col text-center text-white  my-[200px]">
          <SectionHeader title="NARAHUBUNG" altText="Garis Narahubung" />
          <p>{community.contact}</p>
          <p>WhatsApp: {community.contact_whatsapp}</p>
          <p>@{community.instagram}</p>
        </section>
      </MotionReveal>
    </div>
  );
};

export default Komunitas;
