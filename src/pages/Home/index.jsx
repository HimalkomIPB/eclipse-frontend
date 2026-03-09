import MotionReveal from '@/components/common/MotionReveal';

// Custom hooks
import { useFetchData } from '@/hooks/useAPI';
import { useCarousel } from '@/hooks/useCarousel';

// Common components
import SectionHeader from '@/components/common/SectionHeader';

// Page sections
import HeroSection from './sections/HeroSection';
import About from './sections/About';
import Ilkomunity from './sections/Ilkommunity';
import Komnews from './sections/KomNews';
import Megaproker from './sections/Megaproker';

/**
 * Home Page Component
 * 
 * Main landing page of HIMALKOM website featuring:
 * - Hero section
 * - Communities section
 * - Major programs/events section
 * - Latest news section
 * 
 * @returns {JSX.Element}
 */
const Home = () => {
  const sectionGapClass = 'mt-32 md:mt-24 lg:mt-64 mb-32 md:mb-24 lg:mb-64';
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch all required data using custom hook
  const {
    data: communitiesData,
    loading: loadingCommunities,
    error: errorCommunities
  } = useFetchData('communities', baseUrl);

  const {
    data: megaprokerData,
    loading: loadingMegaproker,
    error: errorMegaproker
  } = useFetchData('megaprokers', baseUrl);

  const {
    data: newsData,
    loading: loadingNews,
    error: errorNews
  } = useFetchData('komnews/home', baseUrl);

  // Initialize carousels with custom hook
  const {
    currentIndex: currentNewsIndex,
    goToSlide: goToNewsSlide
  } = useCarousel(newsData?.komnews);

  const {
    currentIndex: currentCommunityIndex,
    goToSlide: goToCommunitySlide,
    setPause: setCommunityCarouselPause
  } = useCarousel(communitiesData?.communities);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full">
        <MotionReveal animation="fade-up">
          <HeroSection />
        </MotionReveal>
      </section>

      <section className={`w-full ${sectionGapClass}`}>
        <MotionReveal animation="fade-up">
          <About />
        </MotionReveal>
      </section>
      
      {/* Megaproker Section */}
      <section className={`px-4 flex flex-col items-center ${sectionGapClass}`}>
        <MotionReveal animation="fade-up">
          <SectionHeader
            title="MEGAPROKER"
            altText="Program Kerja Utama"
          />
        </MotionReveal>
        <MotionReveal animation="fade-up" delay={0.2}>
          <Megaproker
            megaprokerData={megaprokerData}
            loadingMegaproker={loadingMegaproker}
            errorMegaproker={errorMegaproker}
            baseUrl={baseUrl}
          />
        </MotionReveal>
      </section>

      {/* Ilkomunity Section */}
      <section className={`px-4 flex flex-col items-center text-center ${sectionGapClass}`}>
        <MotionReveal animation="fade-up">
          <SectionHeader
            title="ILKOMUNITY"
            altText="Komunitas Ilmu Komputer"
          />
          <Ilkomunity
            communitiesData={communitiesData}
            loadingCommunities={loadingCommunities}
            errorCommunities={errorCommunities}
            currentCommunityIndex={currentCommunityIndex}
            goToCommunitySlide={goToCommunitySlide}
            setCommunityCarouselPause={setCommunityCarouselPause}
            baseUrl={baseUrl}
          />
        </MotionReveal>
      </section>

      {/* Komnews Section */}
      <section className={sectionGapClass}>
        <MotionReveal animation="fade-up">
          <SectionHeader
            title="KOMNEWS"
            altText="Berita dan Aktivitas Terkini"
          />
          <Komnews
            newsData={newsData}
            loadingNews={loadingNews}
            errorNews={errorNews}
            currentNewsIndex={currentNewsIndex}
            goToNewsSlide={goToNewsSlide}
            baseUrl={baseUrl}
          />
        </MotionReveal>
      </section>
    </div>
  );
};

export default Home;