import { useEffect, useMemo, useState } from 'react';
import MotionReveal from '@/components/common/MotionReveal';
import axios from 'axios';

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
import GalleryMarquee from './sections/GalleryMarquee';

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
    data: galleriesData,
  } = useFetchData('igalleries', baseUrl);
  const [communityPortfolios, setCommunityPortfolios] = useState([]);

  const galleryItems = useMemo(() => (
    galleriesData?.igalleries
      ? galleriesData.igalleries.flatMap(subject =>
          (subject.i_galleries || []).map(gallery => ({
            id: gallery.id,
            name: gallery.name,
            imageUrl: `${baseUrl}/storage/${gallery.image}`,
            href: `/galeri/${gallery.id}`,
            external: false,
            subtitle: subject.name,
          }))
        )
      : []
  ), [galleriesData, baseUrl]);

  const mapCommunityPorto = (porto, slug, label) => {
    return {
      id: porto.id ? `${slug}-${porto.id}` : `${slug}-${porto.name}`,
      name: porto.name || 'Project',
      imageUrl: `${baseUrl}/storage/${porto.image}`,
      href: `/community/${slug}#portfolio`,
      external: false,
      subtitle: label,
    };
  };

  const communitySlugKey = (communitiesData?.communities || [])
    .map((community) => community.slug)
    .join('|');

  useEffect(() => {
    if (!communitiesData?.communities?.length) {
      setCommunityPortfolios([]);
      return;
    }

    let cancelled = false;

    const fetchCommunityPortfolios = async () => {
      const results = await Promise.all(
        communitiesData.communities.map(async (community) => {
          try {
            const response = await axios.get(
              `${baseUrl}/communities/${community.slug}/portofolio`
            );
            const list = response.data?.communityPortofolios || [];
            return list.map((porto) =>
              mapCommunityPorto(porto, community.slug, community.name)
            );
          } catch (error) {
            return [];
          }
        })
      );

      if (!cancelled) {
        setCommunityPortfolios(results.flat());
      }
    };

    fetchCommunityPortfolios();
    return () => {
      cancelled = true;
    };
  }, [baseUrl, communitySlugKey]);

  const communityProjects = communityPortfolios;

  const shuffleItems = (items) => {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  const marqueeItems = useMemo(
    () => shuffleItems([...galleryItems, ...communityProjects]),
    [galleryItems, communityProjects]
  );

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

      {marqueeItems.length > 0 && (
        <section className={`w-full ${sectionGapClass}`}>
          <div className="px-4 sm:px-6 lg:px-8 xl:px-10">
            <SectionHeader title="Community Projects" altText="Garis Community Projects" />
            <p className="mt-3 text-center text-base text-white sm:text-lg">
              "The world is but a canvas to our imagination." — Henry David Thoreau
            </p>
            <GalleryMarquee items={marqueeItems} />
          </div>
        </section>
      )}

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
