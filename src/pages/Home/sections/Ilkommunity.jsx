import React from 'react';
import ReadMoreButton from '@/components/common/ReadMore';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MotionReveal from '@/components/common/MotionReveal';

/**
 * Community Card Component
 * 
 * Displays individual community information in a card format
 * 
 * @param {Object} props
 * @param {Object} props.community - Community data object
 * @param {boolean} props.loading - Loading state for details
 * @param {string} props.baseUrl - API base URL for assets
 * @returns {JSX.Element}
 */
const CommunityCard = ({ community, loading, baseUrl }) => {
  // Truncate description if too long
  const truncateDescription = (desc) => {
    if (!desc) return '';
    return desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
  };

  const description = community.description || '';
  const truncatedDescription = truncateDescription(description);

  return (
    <MotionReveal animation="fade-up" delay={0.1}>
      <div className="rounded-[15px] text-white bg-white shadow-card flex flex-col items-center justify-around p-8 w-[170px] h-[240px] md:w-[240px] md:h-[300px] lg:h-[400px] lg:w-[270px]">
        {/* Logo komunitas */}
          <img
            src={`${baseUrl}/storage/${community.logo}`}
            alt={community.name}
            className="w-[122px] h-[122px] "
          />
        
        {/* Nama komunitas */}
        <h3 className="font-bold text-2xl text-center">{community.name}</h3>
        
        {/* Deskripsi komunitas */}
        <div className="hidden lg:block h-[120px] overflow-hidden mb-auto">
          {loading ? (
            <LoadingSpinner variant="inline" size="small" message="Memuat detail..." />
          ) : (
            <p className="text-center line-clamp-5">
              {truncatedDescription || community.slug}
            </p>
          )}
        </div>
        
        {/* Read More button */}
        <div className="mt-4">
          <ReadMoreButton to={`/community/${community.slug}`} />
        </div>
      </div>
    </MotionReveal>
  );
};

/**
 * Ilkommunity Section Component
 * 
 * Displays communities section with responsive carousel for mobile
 * and grid layout for desktop
 * 
 * @param {Object} props
 * @param {Object} props.communitiesData - Communities data from API
 * @param {boolean} props.loadingCommunities - Loading state for communities data
 * @param {Object} props.errorCommunities - Error object from API request
 * @param {boolean} props.loadingDetails - Loading state for community details
 * @param {number} props.currentCommunityIndex - Current active slide index
 * @param {Function} props.goToCommunitySlide - Function to navigate to specific slide
 * @param {Function} props.setCommunityCarouselPause - Function to pause/resume carousel
 * @param {string} props.baseUrl - API base URL for assets
 * @returns {JSX.Element}
 */
const Ilkomunity = ({
  communitiesData,
  loadingCommunities,
  errorCommunities,
  loadingDetails,
  baseUrl
}) => {
  
  // Handle loading and error states
  if (loadingCommunities) {
    return <div className="text-center py-8">Memuat data komunitas...</div>;
  }

  if (errorCommunities) {
    return <div className="text-center py-8 text-red-500">Gagal memuat data komunitas</div>;
  }

  if (!communitiesData?.communities || communitiesData.communities.length === 0) {
    return <div className="text-center py-8">Tidak ada data komunitas</div>;
  }

  return (
    <div className="gap-y-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-5 justify-items-center max-w-6xl lg:pt-[70px]">
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