import { useEffect, useMemo, useState, lazy, Suspense } from 'react';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import axios from 'axios';

// Custom hooks — use shared fetch to deduplicate requests
import { useSharedFetch } from '@/hooks/useSharedFetch';

// Common components
import SectionHeader from '@/components/common/SectionHeader';

// Hero is above-fold, always eager
import HeroSection from './sections/HeroSection';
import About from './sections/About';

// Below-fold sections are lazy-loaded
const Ilkomunity = lazy(() => import('./sections/Ilkommunity'));
const Megaproker = lazy(() => import('./sections/Megaproker'));
const GalleryMarquee = lazy(() => import('./sections/GalleryMarquee'));
const Komnews = lazy(() => import('./sections/KomNews'));

/** Maximum number of items to display in the marquee */
const MARQUEE_ITEM_LIMIT = 12;

/**
 * Lightweight section skeleton shown while lazy sections load.
 */
const SectionSkeleton = () => (
  <div
    style={{ minHeight: '200px' }}
    className="flex items-center justify-center py-8 text-white/50 text-sm"
  >
    Memuat...
  </div>
);

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
  } = useSharedFetch('communities', baseUrl);

  const {
    data: megaprokerData,
    loading: loadingMegaproker,
    error: errorMegaproker
  } = useSharedFetch('megaprokers', baseUrl);

  const {
    data: newsData,
    loading: loadingNews,
    error: errorNews
  } = useSharedFetch('komnews/home', baseUrl);

  const {
    data: galleriesData,
  } = useSharedFetch('igalleries', baseUrl);

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

  // Deterministic shuffle with a fixed seed so the result is stable across renders
  const marqueeItems = useMemo(() => {
    const combined = [...galleryItems, ...communityProjects];
    // Simple deterministic shuffle using item IDs
    const sorted = combined.sort((a, b) => {
      const aKey = String(a.id || a.name);
      const bKey = String(b.id || b.name);
      // Alternate by hash-like ordering
      return aKey.localeCompare(bKey);
    });
    // Cap to MARQUEE_ITEM_LIMIT
    return sorted.slice(0, MARQUEE_ITEM_LIMIT);
  }, [galleryItems, communityProjects]);

  return (
    <div className="w-full pb-20 md:pb-24 lg:pb-28">
      {/* Hero — above-fold, no animation delay, eager render */}
      <section className="w-full">
        <HeroSection />
      </section>

      {/* About — near-fold, minimal delay */}
      <section className={`w-full ${sectionGapClass}`}>
        <RevealOnScroll animation="fade-up">
          <About />
        </RevealOnScroll>
      </section>

      {/* Megaproker */}
      <section className={`flex w-full flex-col items-center px-4 ${sectionGapClass}`}>
        <RevealOnScroll animation="fade-up">
          <SectionHeader
            title="MEGAPROKER"
            altText="Program Kerja Utama"
          />
        </RevealOnScroll>
        <RevealOnScroll animation="fade-up" delay={0.15} className="w-full">
          <Suspense fallback={<SectionSkeleton />}>
            <Megaproker
              megaprokerData={megaprokerData}
              loadingMegaproker={loadingMegaproker}
              errorMegaproker={errorMegaproker}
              baseUrl={baseUrl}
            />
          </Suspense>
        </RevealOnScroll>
      </section>

      {/* Ilkomunity */}
      <section className={`flex w-full flex-col items-center px-4 text-center ${sectionGapClass}`}>
        <RevealOnScroll animation="fade-up">
          <SectionHeader
            title="ILKOMUNITY"
            altText="Komunitas Ilmu Komputer"
          />
        </RevealOnScroll>
        <RevealOnScroll animation="fade-up" className="w-full" delay={0.1}>
          <Suspense fallback={<SectionSkeleton />}>
            <Ilkomunity
              communitiesData={communitiesData}
              loadingCommunities={loadingCommunities}
              errorCommunities={errorCommunities}
              baseUrl={baseUrl}
            />
          </Suspense>
        </RevealOnScroll>
      </section>

      {/* Gallery Marquee — capped to MARQUEE_ITEM_LIMIT items */}
      {marqueeItems.length > 0 && (
        <section className={`w-full ${sectionGapClass}`}>
          <div className="px-4 sm:px-6 lg:px-8 xl:px-10">
            <SectionHeader title="Community Projects" altText="Garis Community Projects" />
            <p className="mt-3 text-center text-base text-white sm:text-lg">
              "The world is but a canvas to our imagination." — Henry David Thoreau
            </p>
            <Suspense fallback={<SectionSkeleton />}>
              <GalleryMarquee items={marqueeItems} />
            </Suspense>
          </div>
        </section>
      )}

      {/* KomNews */}
      <section className={`w-full ${sectionGapClass}`}>
        <RevealOnScroll animation="fade-up" className="px-4 sm:px-6 lg:px-8 xl:px-10">
          <SectionHeader
            title="KOMNEWS"
            altText="Berita dan Aktivitas Terkini"
          />
        </RevealOnScroll>
        <RevealOnScroll animation="fade-up" delay={0.15}>
          <Suspense fallback={<SectionSkeleton />}>
            <Komnews
              newsData={newsData}
              loadingNews={loadingNews}
              errorNews={errorNews}
              baseUrl={baseUrl}
            />
          </Suspense>
        </RevealOnScroll>
      </section>
    </div>
  );
};

export default Home;
