import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Search, MapPin, Building2 } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Pagination from '@/components/common/Pagination';
import { stripHtml } from '@/utils/formatting';
import {
  buildMagangQuery,
  readMagangFilters,
  REGISTRATION_STATUSES,
  MAGANG_CATEGORIES,
} from './api';
import {
  MagangCover,
  MagangError,
  RegistrationPeriod,
  RegistrationStatus,
} from './components';
import useInfoMagang from './useInfoMagang';
import MagangDropdown from './MagangDropdown';
import './content.css';

const inputClass =
  'w-full rounded-xl border border-white/20 bg-[#123149] px-4 py-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-sky-200/60 placeholder:text-white/45';

export default function InfoMagang() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = readMagangFilters(searchParams);
  const { data, loading, error, retry } = useInfoMagang(`?${buildMagangQuery(filters)}`);

  // Merge static predefined categories with any extra categories from API if available
  const apiCategories = data?.categories || [];
  const mergedCategories = [
    ...MAGANG_CATEGORIES,
    ...apiCategories.filter(
      ac => !MAGANG_CATEGORIES.some(mc => mc.id === ac.id || mc.name === ac.name)
    ),
  ];

  const items = data?.infomagang || [];
  const totalPages = data?.pagination?.last_page || 1;
  const totalItems = data?.pagination?.total || 0;
  const hasFilters = Boolean(filters.q || filters.category || filters.status);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const updateFilters = (changes) => {
    const next = { ...filters, page: 1, ...changes };
    const params = new URLSearchParams(buildMagangQuery(next));
    params.delete('per_page');
    if (next.page === 1) params.delete('page');
    setSearchParams(params);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    updateFilters({ q: new FormData(event.currentTarget).get('q') });
  };

  const cardFloatDurations = [5.1, 5.9, 6.7, 5.5, 6.3, 7.1];
  const cardFloatDelays = [0, 0.65, 1.3, 0.4, 1.0, 0.2];

  return (
    <section className="mx-auto mt-28 max-w-6xl px-4 pb-24 sm:mt-32 md:mt-20">
      <SectionHeader
        title={
          <span className="animate-float-wrapper">
            <span className="animate-rotate-wrapper">
              <span className="animate-breathe-text">Info Magang</span>
            </span>
          </span>
        }
      />
      <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-white/80">
        Temukan lowongan magang pilihanmu dan persiapkan karier impianmu.
      </p>

      {/* Filter Box */}
      <div className="animate-filter-box mb-8 rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-6">
        <form
          onSubmit={handleSearch}
          onReset={() => setSearchParams({})}
          className="grid items-end gap-4 md:grid-cols-[2fr_1.3fr_1fr_auto]"
        >
          <div>
            <label htmlFor="magang-search" className="mb-2 block font-medium">
              Cari magang
            </label>
            <input
              key={filters.q}
              id="magang-search"
              type="search"
              name="q"
              defaultValue={filters.q}
              maxLength={255}
              placeholder="Cari judul atau posisi magang..."
              className={inputClass}
            />
          </div>

          <MagangDropdown
            label="Kategori"
            value={filters.category}
            placeholder="Semua kategori"
            isOpen={activeDropdown === 'category'}
            onToggle={(open) => setActiveDropdown(open ? 'category' : null)}
            onClose={() => setActiveDropdown(null)}
            options={[
              { value: '', label: 'Semua kategori' },
              ...mergedCategories.map((category) => ({
                value: category.id || category.name,
                label: category.name,
              })),
            ]}
            onChange={(val) => updateFilters({ category: val })}
          />

          <MagangDropdown
            label="Status pendaftaran"
            value={filters.status}
            placeholder="Semua status"
            isOpen={activeDropdown === 'status'}
            onToggle={(open) => setActiveDropdown(open ? 'status' : null)}
            onClose={() => setActiveDropdown(null)}
            options={[
              { value: '', label: 'Semua status' },
              ...Object.entries(REGISTRATION_STATUSES).map(([value, label]) => ({
                value,
                label,
              })),
            ]}
            onChange={(val) => updateFilters({ status: val })}
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20 hover:cursor-pointer"
          >
            <Search size={18} aria-hidden="true" /> Cari
          </button>

          {hasFilters && (
            <button
              type="reset"
              className="w-fit text-sm text-white/75 underline underline-offset-4 hover:cursor-pointer hover:text-white md:col-span-full"
            >
              Reset filter
            </button>
          )}
        </form>
      </div>

      {/* Content Section */}
      <div aria-live="polite" aria-busy={loading}>
        {loading ? (
          <LoadingSpinner message="Memuat info magang..." className="[&_p]:text-white/70" />
        ) : error ? (
          <MagangError onRetry={retry} />
        ) : (
          <>
            <p className="mb-5 text-white/65">{totalItems} lowongan magang ditemukan</p>
            {items.length ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, index) => (
                  <article
                    key={item.id}
                    className="animate-card-float flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(180deg,rgba(27,62,89,0.92)_0%,rgba(14,41,59,0.94)_100%)] shadow-card"
                    style={{
                      '--card-float-duration': `${cardFloatDurations[index % cardFloatDurations.length]}s`,
                      '--card-float-delay': `${cardFloatDelays[index % cardFloatDelays.length]}s`,
                    }}
                  >
                    <Link
                      to={`/infomagang/${encodeURIComponent(item.slug)}`}
                      state={{ listSearch: searchParams.toString() }}
                      aria-label={`Lihat detail ${item.title}`}
                    >
                      <MagangCover item={item} />
                    </Link>

                    <div className="flex flex-1 flex-col gap-4 p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <RegistrationStatus status={item.status} />
                        {item.category && (
                          <span className="text-sm font-medium text-sky-200/80">
                            {item.category.name}
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl font-bold leading-snug">
                        <Link
                          to={`/infomagang/${encodeURIComponent(item.slug)}`}
                          state={{ listSearch: searchParams.toString() }}
                          className="hover:underline"
                        >
                          {item.title}
                        </Link>
                      </h2>

                      {(item.company || item.location) && (
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/70">
                          {item.company && (
                            <span className="inline-flex items-center gap-1.5">
                              <Building2 size={15} className="text-white/50" />
                              {item.company}
                            </span>
                          )}
                          {item.location && (
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin size={15} className="text-white/50" />
                              {item.location}
                            </span>
                          )}
                        </div>
                      )}

                      <RegistrationPeriod startDate={item.start_date} endDate={item.end_date} />

                      <p className="line-clamp-3 text-base text-white/70">
                        {stripHtml(item.description)}
                      </p>

                      <Link
                        to={`/infomagang/${encodeURIComponent(item.slug)}`}
                        state={{ listSearch: searchParams.toString() }}
                        className="mt-auto flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-medium text-white transition hover:bg-white/10"
                        aria-label={`Selengkapnya tentang ${item.title}`}
                      >
                        Selengkapnya <ArrowRight size={18} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/15 bg-white/5 px-6 py-14 text-center">
                <h2 className="text-xl font-semibold">
                  {filters.page > totalPages
                    ? 'Halaman tidak tersedia'
                    : hasFilters
                    ? 'Tidak ada lowongan magang yang sesuai'
                    : 'Belum ada info magang'}
                </h2>
                <p className="mt-2 text-white/65">
                  {filters.page > totalPages
                    ? 'Pilih halaman terakhir untuk melihat daftar magang.'
                    : hasFilters
                    ? 'Coba kata kunci atau filter lain.'
                    : 'Informasi lowongan magang akan ditampilkan di sini setelah tersedia.'}
                </p>
              </div>
            )}

            {filters.page > totalPages ? (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => updateFilters({ page: totalPages })}
                  className="rounded-full border border-white/20 bg-white/10 px-5 py-2 hover:bg-white/20"
                >
                  Ke halaman terakhir
                </button>
              </div>
            ) : (
              <div className="flex justify-center mt-8">
                <Pagination
                  currentPage={filters.page}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    if (page >= 1 && page <= totalPages) {
                      updateFilters({ page });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
