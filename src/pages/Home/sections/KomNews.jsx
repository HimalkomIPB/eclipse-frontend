import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, A11y } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ReadMoreButton from '@/components/common/ReadMore';
import MotionReveal from '@/components/common/MotionReveal';
import DOMPurify from 'dompurify';
import { timeAgo } from '@/utils/formatting';

import 'swiper/css';
import 'swiper/css/pagination';

const Komnews = ({
  newsData,
  loadingNews,
  errorNews,
  baseUrl
}) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const sanitizeHtml = (html) => {
    if (!html) return '';
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'a'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
    });
  };

  if (loadingNews) {
    return <div className="py-8 text-center">Memuat berita...</div>;
  }

  if (errorNews) {
    return <div className="py-8 text-center text-red-500">Gagal memuat berita</div>;
  }

  if (!newsData?.komnews || newsData.komnews.length === 0) {
    return <div className="py-8 text-center">Tidak ada berita terkini</div>;
  }

  return (
    <MotionReveal animation="fade-up" delay={0.3}>
      <div className="relative mx-auto flex w-full flex-col items-center">
        <Swiper
          modules={[Pagination, Autoplay, A11y]}
          centeredSlides
          loop={newsData.komnews.length > 1}
          watchSlidesProgress
          spaceBetween={0}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 1.32,
              spaceBetween: 18,
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
              <div className="px-4 sm:px-5 lg:px-4">
                <div className="mx-auto my-3 flex w-full flex-col rounded-[24px] border border-white/15 p-4 shadow-card md:flex-row md:p-5">
                  <div className="mb-4 h-[160px] w-full overflow-clip rounded-xl md:hidden">
                    <img
                      src={`${baseUrl}/storage/${komnews.image}`}
                      alt={komnews.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/placeholder-news.jpg';
                      }}
                    />
                  </div>

                  <div className="flex h-full w-full flex-col md:w-[52%] md:pr-6">
                    <h3 className="mb-2 text-2xl font-bold leading-tight text-white md:text-[2rem]">{komnews.title}</h3>

                    <p className="mb-2 text-sm text-white/80">
                      {timeAgo(komnews.created_at)}
                    </p>

                    <div className="mb-4 max-h-[180px] overflow-hidden">
                      <div
                        className="line-clamp-6 text-sm text-white/90 md:line-clamp-5 md:text-base"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(komnews.content || '') }}
                      ></div>
                    </div>

                    <div className="mt-auto pt-4">
                      <div className="max-w-[150px]">
                        <ReadMoreButton to={`/komnews/${komnews.slug}`} />
                      </div>
                    </div>
                  </div>

                  <div className="hidden h-full overflow-clip rounded-xl md:block md:w-[48%]">
                    <img
                      src={`${baseUrl}/storage/${komnews.image}`}
                      alt={komnews.title}
                      className="h-full w-full object-cover"
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

        <div className="mt-6 flex w-full items-center justify-center gap-6 md:gap-8">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex hover:cursor-pointer h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/15 shadow-card transition-colors hover:bg-white/25"
            aria-label="Previous slide"
          >
            <FaChevronLeft className="text-sm text-white" />
          </button>

          <div className="flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/10 px-6 py-2 shadow-card">
            {newsData.komnews.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`h-3 w-3 hover:cursor-pointer rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'scale-125 bg-white'
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="flex hover:cursor-pointer h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/15 shadow-card transition-colors hover:bg-white/25"
            aria-label="Next slide"
          >
            <FaChevronRight className="text-sm text-white" />
          </button>
        </div>
      </div>
    </MotionReveal>
  );
};

export default Komnews;
