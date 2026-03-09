import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import MotionReveal from '@/components/common/MotionReveal';
import { useFetchData } from '@/hooks/useAPI';
import TImages from '@/utils/images';

const ExploreCard = ({ title, subtitle, image, href, titleClassName = "", subtitleClassName = "" }) => (
  <Link
    to={href}
    className="group flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(27,62,89,0.92)_0%,rgba(14,41,59,0.94)_100%)] shadow-[0_18px_36px_rgba(2,14,26,0.22)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 sm:min-h-[300px] lg:min-h-[320px]"
  >
    <div className="relative h-40 w-full overflow-hidden sm:h-28 lg:h-32">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105 sm:p-4 lg:p-5"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/placeholder-news.jpg';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
    </div>
    <div className="flex flex-1 flex-col p-4">
      <h3 className={`text-lg font-semibold text-white ${titleClassName}`}>{title}</h3>
      {subtitle && (
        <p className={`mt-1 text-sm text-white/70 ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
      <span className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-semibold text-white/80">
        Jelajahi
      </span>
    </div>
  </Link>
);

const ExploreSection = ({ title, description, children }) => (
  <div className="p-2 sm:p-4">
    <h2 className="text-xl font-semibold text-white">{title}</h2>
    {description && <p className="mt-1 text-sm text-white/70">{description}</p>}
    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{children}</div>
  </div>
);

const Explore = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { data: divisionsData } = useFetchData('divisions', baseUrl);
  const { data: communitiesData } = useFetchData('communities', baseUrl);

  const divisions = divisionsData?.divisions || [];
  const communities = communitiesData?.communities || [];

  return (
    <div className="w-full px-4 pb-24 pt-24 sm:px-10 lg:px-20 xl:px-28">
      <MotionReveal animation="fade-up">
        <SectionHeader title="Explore" altText="Explore" />
        <p className="mx-auto mt-3 max-w-3xl text-center text-base text-white/80 sm:text-lg">
          Semua yang tersedia di website Himalkom, dirangkum dalam satu halaman agar kamu bisa
          menjelajahi tiap bagian dengan cepat.
        </p>
      </MotionReveal>

      <div className="mt-12 space-y-12">
        <div className="grid gap-6 md:grid-cols-2">
          <MotionReveal animation="fade-up" delay={0.1}>
            <ExploreSection
              title="Profil"
              description="Kenalan lebih dekat dengan organisasi dan departemen."
            >
            <ExploreCard
              title="Himalkom"
              subtitle="Struktur dan tujuan organisasi"
              image={TImages.LOGO.LOGO_HIMALKOM}
              href="/himalkom"
              titleClassName="text-base sm:text-lg"
            />
            {divisions.map((division) => (
              <ExploreCard
                key={division.id || division.slug}
                title={division.abbreviation || division.name}
                subtitle="Departemen"
                image={`${baseUrl}/storage/${division.logo}`}
                href={`/division/${division.slug}`}
                titleClassName="text-base sm:text-lg"
              />
            ))}
            </ExploreSection>
          </MotionReveal>

          <MotionReveal animation="fade-up" delay={0.15}>
            <ExploreSection
              title="Komunitas"
              description="Jelajahi komunitas dan karya mereka."
            >
              {communities.map((community) => (
                <ExploreCard
                  key={community.id || community.slug}
                  title={community.name}
                  subtitle="Komunitas"
                  image={`${baseUrl}/storage/${community.logo}`}
                  href={`/community/${community.slug}`}
                />
              ))}
            </ExploreSection>
          </MotionReveal>
        </div>

        <MotionReveal animation="fade-up" delay={0.2}>
          <div className="grid gap-4 md:grid-cols-2">
            <ExploreSection
              title="Informasi"
              description="Berita, dokumentasi, dan prestasi."
            >
              <ExploreCard
                title="Komnews"
                subtitle="Berita dan aktivitas"
                image={TImages.LOGO.LOGO_KOMNEWS}
                href="/komnews"
              />
              <ExploreCard
                title="Galeri"
                subtitle="Projek mahasiswa"
                image={TImages.LOGO.LOGO_IGALLERY}
                href="/galeri"
              />
              <ExploreCard
                title="Prestasi"
                subtitle="Pencapaian Ilkomerz"
                image={TImages.LOGO.LOGO_HIMALKOM}
                href="/prestasi"
              />
            </ExploreSection>
            <ExploreSection
              title="Program & Kegiatan"
              description="Proker, riset, dan kegiatan lainnya."
            >
              <ExploreCard
                title="Megaproker"
                subtitle="Program kerja utama"
                image={TImages.LOGO.LOGO_MEGAPROKER}
                href="/megaproker"
              />
              <ExploreCard
                title="Riset"
                subtitle="Riset Ilkomerz"
                image={TImages.LOGO.LOGO_RISET}
                href="/riset"
              />
              <ExploreCard
                title="Syntax"
                subtitle="Media & publikasi"
                image={TImages.LOGO.LOGO_SYNTAX}
                href="/syntax"
              />
            </ExploreSection>
          </div>
        </MotionReveal>
      </div>
    </div>
  );
};

export default Explore;
