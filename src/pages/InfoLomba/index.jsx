import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import SectionHeader from '@/components/common/SectionHeader';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import Pagination from '@/components/common/Pagination';
import { stripHtml } from '@/utils/formatting';
import { buildLombaQuery, readLombaFilters, REGISTRATION_STATUSES } from './api';
import { LombaCover, LombaError, RegistrationPeriod, RegistrationStatus } from './components';
import useInfoLomba from './useInfoLomba';

const inputClass = 'w-full rounded-xl border border-white/20 bg-[#123149] px-4 py-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-sky-200/60';

export default function InfoLomba() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = readLombaFilters(searchParams);
  const { data, loading, error, retry } = useInfoLomba(`?${buildLombaQuery(filters)}`);
  const categories = data?.categories || [];
  const items = data?.infolomba || [];
  const totalPages = data?.pagination?.last_page || 1;
  const hasFilters = Boolean(filters.q || filters.category_id || filters.status);

  const updateFilters = changes => {
    const next = { ...filters, page: 1, ...changes };
    const params = new URLSearchParams(buildLombaQuery(next));
    params.delete('per_page');
    if (next.page === 1) params.delete('page');
    setSearchParams(params);
  };

  const handleSearch = event => {
    event.preventDefault();
    updateFilters({ q: new FormData(event.currentTarget).get('q') });
  };

  const handleFilterChange = (event, field) => {
    updateFilters({
      [field]: event.target.value,
      q: new FormData(event.currentTarget.form).get('q'),
    });
  };

  return (
    <section className="mx-auto mt-28 max-w-6xl px-4 pb-24 sm:mt-32 md:mt-20">
      <SectionHeader title="Info Lomba" />
      <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-white/80">
        Temukan lomba pilihanmu dan catat periode pendaftarannya.
      </p>

      <div className="mb-8 rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-6">
        <form onSubmit={handleSearch} onReset={() => setSearchParams({})} className="grid items-end gap-4 md:grid-cols-[2fr_1fr_1fr_auto]">
          <div>
            <label htmlFor="lomba-search" className="mb-2 block font-medium">Cari lomba</label>
            <input key={filters.q} id="lomba-search" type="search" name="q" defaultValue={filters.q} maxLength={255} placeholder="Cari judul lomba..." className={inputClass} />
          </div>
          <div>
            <label htmlFor="lomba-category" className="mb-2 block font-medium">Kategori</label>
            <select id="lomba-category" value={filters.category_id} onChange={event => handleFilterChange(event, 'category_id')} className={inputClass}>
              <option value="">Semua kategori</option>
              {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="lomba-status" className="mb-2 block font-medium">Status pendaftaran</label>
            <select id="lomba-status" value={filters.status} onChange={event => handleFilterChange(event, 'status')} className={inputClass}>
              <option value="">Semua status</option>
              {Object.entries(REGISTRATION_STATUSES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
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
          <LoadingSpinner message="Memuat info lomba..." className="[&_p]:text-white/70" />
        ) : error ? (
          <LombaError onRetry={retry} />
        ) : (
          <>
            <p className="mb-5 text-white/65">{data?.pagination?.total || 0} lomba ditemukan</p>
            {items.length ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map(item => (
                  <article key={item.id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(180deg,rgba(27,62,89,0.92)_0%,rgba(14,41,59,0.94)_100%)] shadow-card">
                    <Link to={`/infolomba/${encodeURIComponent(item.slug)}`} state={{ listSearch: searchParams.toString() }} aria-label={`Lihat detail ${item.title}`}>
                      <LombaCover item={item} />
                    </Link>
                    <div className="flex flex-1 flex-col gap-4 p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <RegistrationStatus status={item.status} />
                        {item.category && <span className="text-sm text-white/65">{item.category.name}</span>}
                      </div>
                      <h2 className="text-xl font-bold leading-snug">
                        <Link to={`/infolomba/${encodeURIComponent(item.slug)}`} state={{ listSearch: searchParams.toString() }} className="hover:underline">{item.title}</Link>
                      </h2>
                      <RegistrationPeriod startDate={item.start_date} endDate={item.end_date} />
                      <p className="line-clamp-3 text-base text-white/70">{stripHtml(item.description)}</p>
                      <Link to={`/infolomba/${encodeURIComponent(item.slug)}`} state={{ listSearch: searchParams.toString() }} className="mt-auto flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-medium hover:bg-white/10" aria-label={`Selengkapnya tentang ${item.title}`}>
                        Selengkapnya <ArrowRight size={18} aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/15 bg-white/5 px-6 py-14 text-center">
                <h2 className="text-xl font-semibold">{filters.page > totalPages ? 'Halaman tidak tersedia' : hasFilters ? 'Tidak ada lomba yang sesuai' : 'Belum ada info lomba'}</h2>
                <p className="mt-2 text-white/65">{filters.page > totalPages ? 'Pilih halaman terakhir untuk melihat daftar lomba.' : hasFilters ? 'Coba kata kunci atau filter lain.' : 'Informasi lomba akan ditampilkan di sini setelah tersedia.'}</p>
              </div>
            )}
            {filters.page > totalPages ? (
              <div className="mt-6 text-center">
                <button type="button" onClick={() => updateFilters({ page: totalPages })} className="rounded-full border border-white/20 bg-white/10 px-5 py-2 hover:bg-white/20">
                  Ke halaman terakhir
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <Pagination currentPage={filters.page} totalPages={totalPages} onPageChange={page => {
                  if (page >= 1 && page <= totalPages) {
                    updateFilters({ page });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }} />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
