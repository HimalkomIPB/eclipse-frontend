import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Pagination from '@/components/common/Pagination';
import { stripHtml } from '@/utils/formatting';
import { buildRegistrationQuery, readRegistrationFilters, REGISTRATION_STATUSES } from './api';
import { RegistrationCover, RegistrationError, RegistrationPeriod, RegistrationStatus } from './components';
import useRegistrationInfo from './useRegistrationInfo';
import FilterDropdown from './FilterDropdown';
import './content.css';

const inputClass = 'w-full rounded-xl border border-white/20 bg-[#123149] px-4 py-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-sky-200/60';
const cardFloatDurations = [5.1, 5.9, 6.7, 5.5, 6.3, 7.1];
const cardFloatDelays = [0, 0.65, 1.3, 0.4, 1.0, 0.2];

function RegistrationCard({ item, index, feature, listSearch }) {
  const detailPath = `${feature.path}/${encodeURIComponent(item.slug)}`;
  const linkState = { listSearch };

  return (
    <article
      className="animate-card-float flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(180deg,rgba(27,62,89,0.92)_0%,rgba(14,41,59,0.94)_100%)] shadow-card"
      style={{
        '--card-float-duration': `${cardFloatDurations[index % cardFloatDurations.length]}s`,
        '--card-float-delay': `${cardFloatDelays[index % cardFloatDelays.length]}s`,
      }}
    >
      <Link to={detailPath} state={linkState} aria-label={`Lihat detail ${item.title}`}>
        <RegistrationCover item={item} useStorageFallback={feature.useStorageCoverFallback} />
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <RegistrationStatus status={item.status} labels={feature.statusLabels} />
          {feature.hasCategories && item.category && <span className="text-sm text-white/65">{item.category.name}</span>}
        </div>
        <h2 className="break-words text-xl font-bold leading-snug">
          <Link to={detailPath} state={linkState} className="hover:underline">{item.title}</Link>
        </h2>
        <RegistrationPeriod startDate={item.start_date} endDate={item.end_date} />
        <p className="line-clamp-3 break-words text-base text-white/70">{stripHtml(item.description)}</p>
        <Link
          to={detailPath}
          state={linkState}
          className="mt-auto flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-medium hover:bg-white/10"
          aria-label={`Selengkapnya tentang ${item.title}`}
        >
          Selengkapnya <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function RegistrationList({ feature }) {
  const { name, label, endpoint, responseKey, hasCategories, statusLabels = REGISTRATION_STATUSES } = feature;
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const filters = readRegistrationFilters(searchParams, hasCategories);
  const query = buildRegistrationQuery(filters, hasCategories);
  const { data, loading, error, retry } = useRegistrationInfo(`${endpoint}?${query}`);
  const categories = data?.categories || [];
  const items = data?.[responseKey] || [];
  const totalPages = data?.pagination?.last_page || 1;
  const hasFilters = Boolean(filters.q || filters.category_id || filters.status);
  const isOutOfRange = filters.page > totalPages;

  const updateFilters = changes => {
    const next = { ...filters, page: 1, ...changes };
    const params = new URLSearchParams(buildRegistrationQuery(next, hasCategories));
    params.delete('per_page');
    if (next.page === 1) params.delete('page');
    setSearchParams(params);
  };

  const handleSearch = event => {
    event.preventDefault();
    updateFilters({ q: new FormData(event.currentTarget).get('q') });
  };

  const changePage = page => {
    if (page < 1 || page > totalPages) return;
    updateFilters({ page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="mx-auto mt-28 max-w-6xl px-4 pb-24 sm:mt-32 md:mt-20">
      <SectionHeader
        title={
          <span className="animate-float-wrapper">
            <span className="animate-rotate-wrapper">
              <span className="animate-breathe-text">{label}</span>
            </span>
          </span>
        }
      />
      <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-white/80">{feature.description}</p>

      <div className="animate-filter-box mb-8 rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-6">
        <form
          onSubmit={handleSearch}
          onReset={() => setSearchParams({})}
          className={`grid items-end gap-4 ${hasCategories ? 'md:grid-cols-[2fr_1fr_1fr_auto]' : 'md:grid-cols-[2fr_1fr_auto]'}`}
        >
          <div>
            <label htmlFor="registration-search" className="mb-2 block font-medium">Cari {name}</label>
            <input
              key={filters.q}
              id="registration-search"
              type="search"
              name="q"
              defaultValue={filters.q}
              maxLength={255}
              placeholder={`Cari judul ${name}...`}
              className={inputClass}
            />
          </div>
          {hasCategories && (
            <FilterDropdown
              label="Kategori"
              value={filters.category_id}
              placeholder="Semua kategori"
              isOpen={activeDropdown === 'category'}
              onToggle={open => setActiveDropdown(open ? 'category' : null)}
              onClose={() => setActiveDropdown(null)}
              options={[
                { value: '', label: 'Semua kategori' },
                ...categories.map(category => ({ value: String(category.id), label: category.name })),
              ]}
              onChange={category_id => updateFilters({ category_id })}
            />
          )}
          <FilterDropdown
            label="Status pendaftaran"
            value={filters.status}
            placeholder="Semua status"
            isOpen={activeDropdown === 'status'}
            onToggle={open => setActiveDropdown(open ? 'status' : null)}
            onClose={() => setActiveDropdown(null)}
            options={[
              { value: '', label: 'Semua status' },
              ...Object.entries(statusLabels).map(([value, label]) => ({ value, label })),
            ]}
            onChange={status => updateFilters({ status })}
          />
          <button type="submit" className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 font-semibold hover:bg-white/20">
            <Search size={18} aria-hidden="true" /> Cari
          </button>
          {hasFilters && (
            <button type="reset" className="w-fit text-sm text-white/75 underline underline-offset-4 hover:text-white md:col-span-full">
              Reset filter
            </button>
          )}
        </form>
      </div>

      <div aria-live="polite" aria-busy={loading}>
        {loading ? (
          <LoadingSpinner message={`Memuat info ${name}...`} className="[&_p]:text-white/70" />
        ) : error ? (
          <RegistrationError name={name} error={error} onRetry={retry} />
        ) : (
          <>
            <p className="mb-5 text-white/65">{data?.pagination?.total || 0} {name} ditemukan</p>
            {items.length > 0 && !isOutOfRange ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, index) => (
                  <RegistrationCard
                    key={item.id}
                    item={item}
                    index={index}
                    feature={feature}
                    listSearch={searchParams.toString()}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/15 bg-white/5 px-6 py-14 text-center">
                <h2 className="text-xl font-semibold">
                  {isOutOfRange ? 'Halaman tidak tersedia' : hasFilters ? `Tidak ada ${name} yang sesuai` : `Belum ada info ${name}`}
                </h2>
                <p className="mt-2 text-white/65">
                  {isOutOfRange
                    ? `Pilih halaman terakhir untuk melihat daftar ${name}.`
                    : hasFilters ? 'Coba kata kunci atau filter lain.' : `Informasi ${name} akan ditampilkan di sini setelah tersedia.`}
                </p>
              </div>
            )}
            {isOutOfRange ? (
              <div className="mt-6 text-center">
                <button type="button" onClick={() => changePage(totalPages)} className="rounded-full border border-white/20 bg-white/10 px-5 py-2 hover:bg-white/20">
                  Ke halaman terakhir
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <Pagination currentPage={filters.page} totalPages={totalPages} onPageChange={changePage} />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
