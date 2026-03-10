import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetchData } from "@/hooks/useAPI";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import MotionReveal from "@/components/common/MotionReveal";
import DOMPurify from "dompurify";
import { FaArrowLeft } from "react-icons/fa";
import NotFound from "../../NotFound";

const PrestasiDetail = () => {
  const { id } = useParams();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const {
    data: detailData,
    loading: loadingDetail,
    error: errorDetail,
  } = useFetchData(`prestasi/${id}`, baseUrl);
  const {
    data: allPrestasiData,
    loading: loadingAll,
  } = useFetchData("prestasi", baseUrl);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loadingDetail) {
    return (
      <LoadingSpinner
        variant="page"
        size="medium"
        message="Memuat data prestasi..."
      />
    );
  }

  const prestasi = detailData?.prestasi;
  if (errorDetail || !prestasi) return <NotFound />;

  const otherPrestasi =
    allPrestasiData?.prestasi?.filter((p) => p.id !== prestasi.id) || [];

  const sanitizeHtml = (html) => {
    if (!html) return '';
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'img', 'figure', 'figcaption', 'span'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'style', 'width', 'height', 'title'],
    });
  };

  return (
    <div className="w-full">
      <section className="mt-24 sm:mt-28 md:mt-32 mb-16 sm:mb-32 md:mb-64">
        <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-0">

          <MotionReveal animation="fade-up">
            <Link
              to="/prestasi"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/85 transition hover:bg-white/20 hover:text-white sm:text-base"
            >
              <FaArrowLeft size={14} />
              <span>Kembali ke prestasi</span>
            </Link>
          </MotionReveal>

          <div className="flex flex-col gap-8 lg:gap-10">
            <div>
              <MotionReveal animation="fade-up">
                <div className="rounded-xl border border-white/12 bg-[linear-gradient(180deg,rgba(27,62,89,0.94)_0%,rgba(14,41,59,0.96)_100%)] shadow-[0_18px_40px_rgba(2,14,26,0.28)] overflow-hidden">
                  <div className="p-5 md:p-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
                      {prestasi.nama}
                    </h1>

                    <p className="text-xs sm:text-sm text-white/60">
                      Tahun {prestasi.tahun}
                    </p>
                    <p className="text-xs sm:text-sm text-white/60">
                      Penyelenggara: {prestasi.penyelenggara}
                    </p>
                    <p className="text-xs sm:text-sm text-white/60 mb-3">
                      Lokasi: {prestasi.lokasi}
                    </p>
                  </div>

                  <div className="relative w-full h-[220px] sm:h-[280px] md:h-[400px] overflow-hidden">
                    <img
                      src={prestasi.bukti_url}
                      alt={prestasi.nama}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/placeholder-news.jpg";
                      }}
                    />

                    {prestasi.kategori && (
                      <div className="absolute bottom-3 right-3">
                        <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 shadow-sm">
                          {prestasi.kategori.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </MotionReveal>

              <MotionReveal animation="fade-up" delay={0.2}>
                <div className="mt-4 rounded-xl border border-white/12 bg-[linear-gradient(180deg,rgba(27,62,89,0.94)_0%,rgba(14,41,59,0.96)_100%)] p-5 shadow-[0_16px_32px_rgba(2,14,26,0.24)] md:p-6">
                  <div
                    className="text-md md:text-lg leading-relaxed text-white/85 space-y-3"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(prestasi.deskripsi),
                    }}
                  />
                </div>
              </MotionReveal>
            </div>

            <div className="mt-8 lg:mt-0">
              <MotionReveal animation="fade-up" delay={0.3}>
                <div className="rounded-xl border border-white/12 bg-[linear-gradient(180deg,rgba(27,62,89,0.94)_0%,rgba(14,41,59,0.96)_100%)] shadow-[0_16px_32px_rgba(2,14,26,0.24)] overflow-hidden">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold p-5 border-b border-white/10 text-white">
                    Prestasi Lainnya
                  </h3>

                  <div className="p-4">
                    {loadingAll ? (
                      <LoadingSpinner
                        variant="inline"
                        size="small"
                        message="Memuat..."
                      />
                    ) : otherPrestasi.length > 0 ? (
                      <div className="space-y-4">
                        {otherPrestasi.slice(0, 5).map((item) => (
                          <div
                            key={item.id}
                            className="pb-4 border-b border-white/10 last:border-0 last:pb-0"
                          >
                            <Link
                              to={`/prestasi/${item.id}`}
                              className="flex gap-3 group"
                            >
                              <img
                                src={item.bukti_url}
                                alt={item.nama}
                                className="w-20 h-14 object-cover rounded-lg"
                              />

                              <div className="flex-1">
                                <h4 className="font-medium text-base line-clamp-2 text-white/90 transition group-hover:text-white">
                                  {item.nama}
                                </h4>
                                <p className="text-xs text-white/60 mt-1">
                                  Tahun {item.tahun}
                                </p>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-white/60 text-sm py-4">
                        Tidak ada prestasi lainnya
                      </p>
                    )}
                  </div>
                  {/* Lihat semua prestasi */}
                  <div className="mt-6 text-center">
                    <Link
                      to="/prestasi"
                      className="inline-block rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/20 hover:text-white"
                    >
                      Lihat semua Prestasi
                    </Link>
                  </div>
                </div>
              </MotionReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrestasiDetail;
