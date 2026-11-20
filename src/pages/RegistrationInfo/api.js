export const REGISTRATION_STATUSES = {
  upcoming: 'Akan Datang',
  active: 'Dibuka',
  closed: 'Ditutup',
};

export const LOMBA_STATUSES = {
  ...REGISTRATION_STATUSES,
  upcoming: 'Belum dibuka',
  active: 'Sedang dibuka',
};

export function readRegistrationFilters(searchParams, hasCategories = false) {
  const page = Number(searchParams.get('page'));
  const status = searchParams.get('status');
  const filters = {
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
    q: [...(searchParams.get('q') || '').trim()].slice(0, 255).join(''),
    status: Object.hasOwn(REGISTRATION_STATUSES, status) ? status : '',
  };

  if (hasCategories) {
    const categoryId = Number(searchParams.get('category_id'));
    filters.category_id = Number.isSafeInteger(categoryId) && categoryId > 0 ? String(categoryId) : '';
  }

  return filters;
}

export function buildRegistrationQuery(values, hasCategories = false) {
  const filters = readRegistrationFilters(new URLSearchParams(values), hasCategories);
  const params = new URLSearchParams({ page: filters.page, per_page: 6 });
  if (filters.q) params.set('q', filters.q);
  if (filters.category_id) params.set('category_id', filters.category_id);
  if (filters.status) params.set('status', filters.status);
  return params.toString();
}

export async function requestRegistrationInfo(baseUrl, endpoint, { signal } = {}) {
  if (!baseUrl) throw new Error('Alamat API belum dikonfigurasi.');

  const response = await fetch(`${baseUrl.replace(/\/+$/, '')}${endpoint}`, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    const error = new Error(`Permintaan API gagal (${response.status}).`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export function getRegistrationImage(item, storageBaseUrl) {
  if (item.image_url) return item.image_url;
  return item.image && storageBaseUrl
    ? `${storageBaseUrl.replace(/\/+$/, '')}/storage/${item.image.replace(/^\/+/, '')}`
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
