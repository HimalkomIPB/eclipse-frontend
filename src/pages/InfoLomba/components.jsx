import { CalendarDays, ImageOff } from 'lucide-react';
import { formatDate } from '@/utils/formatting';
import { getLombaImage, REGISTRATION_STATUSES } from './api';

const statusClasses = {
  upcoming: 'border-sky-300/30 bg-sky-300/10 text-sky-100',
  active: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100',
  closed: 'border-white/20 bg-white/10 text-white/70',
};

export function RegistrationStatus({ status }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-sm font-medium ${statusClasses[status] || statusClasses.closed}`}>
      {REGISTRATION_STATUSES[status] || 'Status tidak tersedia'}
    </span>
  );
}

export function RegistrationPeriod({ startDate, endDate }) {
  // Date-only API values represent calendar dates, independent of the visitor's timezone.
  const dateLabel = date => date ? formatDate(`${date}T00:00:00`) : '—';
  return (
    <div className="flex items-start gap-2 text-white/75">
      <CalendarDays size={18} className="mt-1 shrink-0" aria-hidden="true" />
      <div>
        <p className="text-sm text-white/60">Periode pendaftaran</p>
        <p className="text-base">
          <time dateTime={startDate}>{dateLabel(startDate)}</time>
          {' – '}
          <time dateTime={endDate}>{dateLabel(endDate)}</time>
        </p>
      </div>
    </div>
  );
}

export function LombaCover({ item, detail = false }) {
  const src = getLombaImage(item, import.meta.env.VITE_API_BASE_URL);
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-white/5 ${detail ? 'min-h-56' : 'aspect-[16/10]'}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/45">
        <ImageOff size={32} aria-hidden="true" />
        <span>Cover tidak tersedia</span>
      </div>
      {src && (
        <img
          key={src}
          src={src}
          alt={item.title}
          loading={detail ? 'eager' : 'lazy'}
          className={`relative w-full ${detail ? 'max-h-[42rem] object-contain' : 'h-full object-cover'}`}
          onError={event => { event.currentTarget.hidden = true; }}
        />
      )}
    </div>
  );
}

export function LombaError({ onRetry }) {
  return (
    <div role="alert" className="rounded-2xl border border-red-200/20 bg-white/5 p-8 text-center">
      <p className="text-red-100">Gagal memuat info lomba. Silakan coba lagi.</p>
      <button type="button" onClick={onRetry} className="mt-4 rounded-full border border-white/20 bg-white/10 px-5 py-2 hover:bg-white/20">
        Coba lagi
      </button>
    </div>
  );
}
