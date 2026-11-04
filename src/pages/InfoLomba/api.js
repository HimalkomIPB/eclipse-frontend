export const REGISTRATION_STATUSES = {
  upcoming: 'Belum dibuka',
  active: 'Sedang dibuka',
  closed: 'Ditutup',
};

export function readLombaFilters(searchParams) {
  const page = Number(searchParams.get('page'));
  const categoryId = Number(searchParams.get('category_id'));
  const status = searchParams.get('status');

  return {
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
    q: (searchParams.get('q') || '').trim().slice(0, 255),
    category_id: Number.isSafeInteger(categoryId) && categoryId > 0 ? String(categoryId) : '',
    status: Object.hasOwn(REGISTRATION_STATUSES, status) ? status : '',
  };
}

export function buildLombaQuery({ page = 1, q = '', category_id = '', status = '' }) {
  const filters = readLombaFilters(new URLSearchParams({ page, q, category_id, status }));
  const params = new URLSearchParams({ page: filters.page, per_page: 6 });
  if (filters.q) params.set('q', filters.q);
  if (filters.category_id) params.set('category_id', filters.category_id);
  if (filters.status) params.set('status', filters.status);
  return params.toString();
}

export async function requestInfoLomba(baseUrl, endpoint, { signal } = {}) {
  if (!baseUrl) throw new Error('Alamat API belum dikonfigurasi.');

  const response = await fetch(`${baseUrl.replace(/\/+$/, '')}/infolomba${endpoint}`, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    const error = new Error('Gagal memuat info lomba. Silakan coba lagi.');
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export function getLombaImage(item, baseUrl) {
  if (item.image_url) return item.image_url;
  return item.image && baseUrl
    ? `${baseUrl.replace(/\/+$/, '')}/storage/${item.image.replace(/^\/+/, '')}`
    : '';
}

export function getRegistrationLink(link) {
  try {
    const url = new URL(link);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
