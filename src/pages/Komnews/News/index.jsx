import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchData } from '@/hooks/useAPI';
import { formatDate, timeAgo } from '@/utils/formatting';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import MotionReveal from '@/components/common/MotionReveal';
import TImages from '@/utils/images';
import DOMPurify from 'dompurify';
import { FaArrowLeft } from 'react-icons/fa';

// Import section dari Komnews
import NotFound from '../../NotFound';

/**
 * News Detail Component
 * 
 * Displays a single news article with its details and a list of other news articles
 */



const NewsDetail = () => {
    const { slug } = useParams();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [activeCategory, setActiveCategory] = useState('all');

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [slug]);

    // Fetch the specific news article
    const {
        data: newsData,
        loading: loadingNews,
        error: errorNews
    } = useFetchData(`komnews/${slug}`, baseUrl);

    const {
        data: allNewsData,
        loading: loadingAllNews,
        error: errorAllNews
    } = useFetchData('komnews', baseUrl);

    const filteredNews = React.useMemo(() => {
        if (!allNewsData?.komnews) return [];
        return allNewsData.komnews.filter(item => item.slug !== slug);
    }, [allNewsData, slug]);

    const sanitizeHtml = (html) => {
        if (!html) return '';
        return DOMPurify.sanitize(html, {
            ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'img', 'figure', 'figcaption', 'span'],
            ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'style', 'width', 'height', 'title'],
        });
    };

    if (loadingNews) {
        return <LoadingSpinner variant="page" size="medium" message="Memuat berita..." />;
    }

    const news = newsData?.komnews;

    if (errorNews || !news) {
        return <NotFound />;
    }

    return (
        <div className="w-full">
            {/* Content Section */}
            <section className="mt-24 sm:mt-28 md:mt-32 mb-16 sm:mb-32 md:mb-64">
                <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-0">
                    {/* Back button */}
                    <MotionReveal animation="fade-up">
                        <Link
                            to="/komnews"
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/85 transition hover:bg-white/20 hover:text-white sm:text-base"
                        >
                            <FaArrowLeft size={14} />
                            <span>Kembali ke berita</span>
                        </Link>
                    </MotionReveal>

                    <div className="flex flex-col gap-8 lg:gap-10">
                        <div className="">
                            <MotionReveal animation="fade-up">
                                <div className="rounded-xl border border-white/12 bg-[linear-gradient(180deg,rgba(27,62,89,0.94)_0%,rgba(14,41,59,0.96)_100%)] shadow-[0_18px_40px_rgba(2,14,26,0.28)] md:rounded-2xl overflow-hidden">
                                    <div className="p-4 sm:p-5 md:p-6">
                                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 leading-tight text-white">
                                            {news.title}
                                        </h1>

                                        {/* Garis Hero */}
                                        <div className="w-[120px] sm:w-[150px] md:w-[200px] mb-3">
                                            <img
                                                src={TImages.DECORATIVE_ELEMENTS.GARIS_HERO_ELEVOR}
                                                alt="Garis Hero"
                                                className="w-full"
                                            />
                                        </div>
                                        <p className="text-xs sm:text-sm text-white/60">
                                            {formatDate(news.created_at)}
                                        </p>
                                    </div>
                                    <div className="relative w-full h-[220px] sm:h-[280px] md:h-[400px] overflow-hidden">
                                        <img
                                            src={`${baseUrl}/storage/${news.image}`}
                                            alt={news.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/images/placeholder-news.jpg';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                        {news.categories && news.categories.length > 0 && (
                                            <div className="absolute bottom-3 right-3 z-10">
                                                {news.categories.map(category => (
                                                    <span
                                                        key={`tag-${category.id}`} 
                                                        className="mr-2 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 shadow-sm">
                                                        {category.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </MotionReveal>

                            {/* Content */}
                            <MotionReveal animation="fade-up" delay={0.2}>
                                <div className="mt-4 rounded-xl border border-white/12 bg-[linear-gradient(180deg,rgba(27,62,89,0.94)_0%,rgba(14,41,59,0.96)_100%)] p-4 shadow-[0_16px_32px_rgba(2,14,26,0.24)] sm:mt-6 sm:p-6">
                                    <div
                                        className="news-content indent-10 text-md md:text-lg leading-relaxed mb-8 px-4 space-y-2 text-justify max-w-none text-white/85"
                                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(news.content) }}
                                    ></div>
                                </div>
                            </MotionReveal>
                        </div>

                        {/* Right Column - News List Section */}
                        <div className="mt-8 lg:mt-0">
                            <MotionReveal animation="fade-up" delay={0.3}>
                                <div className="rounded-xl border border-white/12 bg-[linear-gradient(180deg,rgba(27,62,89,0.94)_0%,rgba(14,41,59,0.96)_100%)] shadow-[0_16px_32px_rgba(2,14,26,0.24)] overflow-hidden">
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold p-4 sm:p-5 border-b border-white/10 text-white">
                                        Berita Lainnya
                                    </h3>

                                    {loadingAllNews ? (
                                        <div className="text-center py-6">
                                            <LoadingSpinner variant="inline" size="small" message="Memuat berita..." />
                                        </div>
                                    ) : errorAllNews ? (
                                        <div className="text-center py-6 text-red-200 px-4">
                                            Gagal memuat berita
                                        </div>
                                    ) : (
                                        <div className="p-4">
                                            {filteredNews.length > 0 ? (
                                                <div className="space-y-4">
                                                    {filteredNews.slice(0, 5).map((item) => (
                                                        <div key={item.id} className="pb-4 border-b border-white/10 last:border-0 last:pb-0">
                                                            <Link
                                                                to={`/komnews/${item.slug}`}
                                                                className="group block"
                                                            >
                                                                <div className='flex flex-row gap-3 items-start'>
                                                                    <img
                                                                        src={`${baseUrl}/storage/${item.image}`}
                                                                        alt={item.title} 
                                                                        className="w-16 h-12 sm:w-20 sm:h-14 lg:w-45 lg:h-25 object-cover rounded-lg flex-shrink-0"
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src = '/images/placeholder-news.jpg';
                                                                        }}
                                                                    />
                                                                    <div className="flex-1 min-w-0">
                                                                        <h4 className="font-medium text-md sm:text-base lg:text-lg line-clamp-2 text-white/90 transition-colors group-hover:text-white">
                                                                            {item.title}
                                                                        </h4>
                                                                        <p className="mt-1 text-xs text-white/60">
                                                                            {timeAgo(item.created_at)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-center text-sm text-white/60 py-4">
                                                    Tidak ada berita lainnya
                                                </p>
                                            )}

                                            <div className="mt-6 text-center">
                                                <Link
                                                    to="/komnews"
                                                    className="inline-block rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/20 hover:text-white"
                                                >
                                                    Lihat semua berita
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </MotionReveal>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NewsDetail;
