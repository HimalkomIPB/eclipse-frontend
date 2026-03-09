import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReadMoreButton from '@/components/common/ReadMore';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MotionReveal from '@/components/common/MotionReveal';

const CommunityCard = ({ community, loading, baseUrl }) => {
  const navigate = useNavigate();
  const truncateDescription = (desc) => {
    if (!desc) return '';
    return desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
  };

  const description = community.description || '';
  const truncatedDescription = truncateDescription(description);

  return (
    <MotionReveal animation="fade-up" delay={0.1}>
      <div
        className="community-card flex h-[240px] w-[170px] cursor-pointer flex-col items-center justify-around rounded-[15px] bg-white p-8 text-white shadow-card md:h-[300px] md:w-[240px] lg:h-[400px] lg:w-[270px]"
        role="link"
        tabIndex={0}
        onClick={(event) => {
          if (event.target.closest('a,button')) return;
          navigate(`/community/${community.slug}`);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            navigate(`/community/${community.slug}`);
          }
        }}
      >
        <img
          src={`${baseUrl}/storage/${community.logo}`}
          alt={community.name}
          className="h-[122px] w-[122px]"
        />

        <h3 className="mt-3 text-center text-2xl font-bold">{community.name}</h3>

        <div className="mb-auto hidden h-[120px] overflow-hidden lg:block">
          {loading ? (
            <LoadingSpinner variant="inline" size="small" message="Memuat detail..." />
          ) : (
            <p className="line-clamp-5 text-center">
              {truncatedDescription || community.slug}
            </p>
          )}
        </div>

        <div className="mt-4">
          <ReadMoreButton to={`/community/${community.slug}`} />
        </div>
      </div>
    </MotionReveal>
  );
};

const Ilkomunity = ({
  communitiesData,
  loadingCommunities,
  errorCommunities,
  loadingDetails,
  baseUrl
}) => {
  if (loadingCommunities) {
    return <div className="py-8 text-center">Memuat data komunitas...</div>;
  }

  if (errorCommunities) {
    return <div className="py-8 text-center text-red-500">Gagal memuat data komunitas</div>;
  }

  if (!communitiesData?.communities || communitiesData.communities.length === 0) {
    return <div className="py-8 text-center">Tidak ada data komunitas</div>;
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-2 justify-items-center gap-5 gap-y-6 pt-4 md:pt-5 lg:grid-cols-3 lg:pt-6 xl:grid-cols-4">
      {communitiesData.communities.map((community) => (
        <CommunityCard
          key={community.id || `community-${community.slug}`}
          community={community}
          loading={loadingDetails}
          baseUrl={baseUrl}
        />
      ))}
    </div>
  );
};

export default Ilkomunity;
