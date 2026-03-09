import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, A11y } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ReadMoreButton from '@/components/common/ReadMore';
import MotionReveal from '@/components/common/MotionReveal';
import DOMPurify from 'dompurify';
import { timeAgo } from '@/utils/formatting';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const Komnews = ({
  newsData,
  loadingNews,
  errorNews,
  baseUrl
}) => {
  // Create a ref for the Swiper instance
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // HTML sanitization to prevent XSS attacks
  const sanitizeHtml = (html) => {
    if (!html) return '';
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'a'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
    });
  };

  // Handle states
  if (loadingNews) {
    return <div className="text-center py-8">Memuat berita...</div>;
  }

  if (errorNews) {
    return <div className="text-center py-8 text-red-500">Gagal memuat berita</div>;
  }

  if (!newsData?.komnews || newsData.komnews.length === 0) {
    return <div className="text-center py-8">Tidak ada berita terkini</div>;
  }

  return (
    <MotionReveal animation="fade-up" delay={0.3}>
      <div className="flex flex-col items-center max-w-6xl mx-auto relative">
        <Swiper
          modules={[Pagination, Autoplay, A11y]} // A11y = accessibility features
          centeredSlides
          loop={newsData.komnews.length > 1}
          watchSlidesProgress
          spaceBetween={16}
          slidesPerView={1.05}
          breakpoints={{
            640: {
              slidesPerView: 1.12,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1.18,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 1.24,
              spaceBetween: 28,
            },
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="w-full komnews-swiper overflow-visible"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {newsData.komnews.map((komnews, index) => (
            <SwiperSlide key={komnews.id || `news-${index}`}>
              <div className="px-1 sm:px-2 md:px-3">
                <div className="rounded-[24px] shadow-card h-[520px] md:h-[340px] flex flex-col md:flex-row p-5 md:p-6 mx-auto my-3 w-full border border-white/15">

                  {/* Mobile image */}
                  <div className="md:hidden w-full h-[180px] overflow-clip rounded-xl mb-4">
                    <img
                      src={`${baseUrl}/storage/${komnews.image}`}
                      alt={komnews.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/placeholder-news.jpg';
                      }}
                    />
                  </div>

                  {/* Content area */}
                  <div className="w-full md:w-[52%] md:pr-6 flex flex-col h-full">
                    <h3 className="font-bold text-2xl md:text-[2rem] leading-tight mb-2 line-clamp-2 text-white">{komnews.title}</h3>

                    <p className="text-sm text-white/80 mb-2">
                      {timeAgo(komnews.created_at)}
                    </p>

                    <div className="max-h-[180px] overflow-hidden mb-4">
                      <div
                        className="text-white/90 text-sm md:text-base line-clamp-6"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(komnews.content || '') }}
                      ></div>
                    </div>

                    <div className="mt-auto pt-4">
                      <div className="max-w-[150px]">
                        <ReadMoreButton to={`/komnews/${komnews.slug}`} />
                      </div>
                    </div>
                  </div>

                  {/* Desktop image */}
                  <div className="hidden md:block md:w-[48%] h-full overflow-clip rounded-xl">
                    <img
                      src={`${baseUrl}/storage/${komnews.image}`}
                      alt={komnews.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/placeholder-news.jpg';
                      }}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Controls container - arrows and pagination together */}
        <div className="flex items-center justify-center w-full mt-6 gap-6 md:gap-8">
          {/* Left arrow */}
          <button 
            onClick={() => swiperRef.current?.slidePrev()} 
            className="w-10 h-10 flex items-center justify-center bg-white/15 rounded-full shadow-card hover:bg-white/25 transition-colors border border-white/20"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-white text-sm" />
          </button>
          
          {/* Pagination dots */}
          <div className="flex justify-center items-center gap-3 px-6 py-2 rounded-full bg-white/10 border border-white/15 shadow-card">
            {newsData.komnews.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Right arrow */}
          <button 
            onClick={() => swiperRef.current?.slideNext()} 
            className="w-10 h-10 flex items-center justify-center bg-white/15 rounded-full shadow-card hover:bg-white/25 transition-colors border border-white/20"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-white text-sm" />
          </button>
        </div>
      </div>
    </MotionReveal>
  );
};

export default Komnews;