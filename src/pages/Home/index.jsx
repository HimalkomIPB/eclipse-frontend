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
 */
const Home = () => {
  const sectionGapClass = 'mt-16 md:mt-20 lg:mt-24 mb-16 md:mb-20 lg:mb-24';
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

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
    <div className="w-full pb-20 md:pb-24 lg:pb-28">
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

      <section className={`flex w-full flex-col items-center px-4 ${sectionGapClass}`}>
        <MotionReveal animation="fade-up">
          <SectionHeader
            title="MEGAPROKER"
            altText="Program Kerja Utama"
          />
        </MotionReveal>
        <MotionReveal animation="fade-up" delay={0.2} className="w-full">
          <Megaproker
            megaprokerData={megaprokerData}
            loadingMegaproker={loadingMegaproker}
            errorMegaproker={errorMegaproker}
            baseUrl={baseUrl}
          />
        </MotionReveal>
      </section>

      <section className={`flex w-full flex-col items-center px-4 text-center ${sectionGapClass}`}>
        <MotionReveal animation="fade-up">
          <SectionHeader
            title="ILKOMUNITY"
            altText="Komunitas Ilmu Komputer"
          />
        </MotionReveal>
        <MotionReveal animation="fade-up" className="w-full" delay={0.15}>
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

      <section className={`w-full ${sectionGapClass}`}>
        <MotionReveal animation="fade-up" className="px-4 sm:px-6 lg:px-8 xl:px-10">
          <SectionHeader
            title="KOMNEWS"
            altText="Berita dan Aktivitas Terkini"
          />
        </MotionReveal>
        <MotionReveal animation="fade-up" delay={0.2}>
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
