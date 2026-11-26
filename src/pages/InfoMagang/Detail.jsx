import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Building2, MapPin } from 'lucide-react';
import DOMPurify from 'dompurify';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { getRegistrationLink } from './api';
import { MagangCover, MagangError, RegistrationPeriod, RegistrationStatus } from './components';
import useInfoMagang from './useInfoMagang';
import './content.css';

export default function DetailMagang() {
  const { slug } = useParams();
  const location = useLocation();
  const { data, loading, error, retry } = useInfoMagang(`/${encodeURIComponent(slug)}`);
  const item = data?.infomagang;
  const listSearch = location.state?.listSearch;
  const backUrl = `/infomagang${listSearch ? `?${listSearch}` : ''}`;
  const registrationLink = getRegistrationLink(item?.link);

  return (
    <section className="mx-auto mt-28 max-w-5xl px-4 pb-24 sm:mt-32 md:mt-20">
      <Link
        to={backUrl}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white/85 transition hover:bg-white/20"
      >
        <ArrowLeft size={16} aria-hidden="true" /> Kembali ke info magang
      </Link>

      {loading ? (
        <LoadingSpinner message="Memuat detail magang..." className="[&_p]:text-white/70" />
      ) : error?.status === 404 || (!error && !item) ? (
        <div className="rounded-2xl border border-white/15 bg-white/5 px-6 py-16 text-center">
          <h1 className="text-3xl font-bold text-white">Lowongan magang tidak ditemukan</h1>
          <p className="mt-3 text-white/70">
            Info lowongan magang ini sudah tidak tersedia atau tautannya tidak sesuai.
          </p>
        </div>
      ) : error ? (
        <MagangError onRetry={retry} />
      ) : (
        <article className="overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(180deg,rgba(27,62,89,0.94)_0%,rgba(14,41,59,0.96)_100%)] shadow-card">
          <div className="space-y-5 p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <RegistrationStatus status={item.status} />
              {item.category && (
                <span className="rounded-full border border-white/15 px-3 py-1 text-sm text-sky-200/90 bg-white/5">
                  {item.category.name}
                </span>
              )}
            </div>

            <h1 className="break-words text-3xl font-bold leading-tight text-white sm:text-4xl">
              {item.title}
            </h1>

            {(item.company || item.location) && (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-base text-white/80">
                {item.company && (
                  <span className="inline-flex items-center gap-2">
                    <Building2 size={18} className="text-white/60" />
                    {item.company}
                  </span>
                )}
                {item.location && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={18} className="text-white/60" />
                    {item.location}
                  </span>
                )}
              </div>
            )}

            <RegistrationPeriod startDate={item.start_date} endDate={item.end_date} />
          </div>

          <MagangCover item={item} detail />

          <div className="p-5 sm:p-8">
            <h2 className="mb-4 text-2xl font-semibold text-white">Deskripsi & Kualifikasi</h2>
            <div
              className="info-lomba-content text-lg leading-relaxed text-white/85"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.description || '') }}
            />

            <div className="mt-8 flex flex-col items-start gap-3 border-t border-white/15 pt-6">
              {registrationLink ? (
                <a
                  href={registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-lg font-semibold text-white transition hover:bg-white/20"
                >
                  Daftar Magang <ExternalLink size={18} aria-hidden="true" />
                </a>
              ) : (
                <p className="text-white/65">Link pendaftaran belum tersedia.</p>
              )}
              {item.status === 'closed' && (
                <p className="text-white/65">Periode pendaftaran magang ini telah berakhir.</p>
              )}
              {item.status === 'upcoming' && (
                <p className="text-white/65">Pendaftaran belum dibuka. Perhatikan tanggal mulai pendaftaran.</p>
              )}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}
