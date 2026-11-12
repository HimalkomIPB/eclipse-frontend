export const REGISTRATION_STATUSES = {
  upcoming: 'Belum dibuka',
  active: 'Sedang dibuka',
  closed: 'Ditutup',
};

export const MAGANG_CATEGORIES = [
  { id: 'software-engineering', name: 'Software Engineering / Development' },
  { id: 'ui-ux', name: 'UI/UX Design & Research' },
  { id: 'data-science', name: 'Data Science & Analytics' },
  { id: 'product-management', name: 'Product Management' },
  { id: 'qa-testing', name: 'Quality Assurance (QA) / Testing' },
  { id: 'cybersecurity', name: 'Cybersecurity / Information Security' },
  { id: 'devops-cloud', name: 'DevOps & Cloud Infrastructure' },
  { id: 'digital-marketing', name: 'Digital Marketing & Content Creation' },
  { id: 'general-corporate', name: 'General Corporate / Operations' },
];

export function readMagangFilters(searchParams) {
  const page = Number(searchParams.get('page'));
  const category = (searchParams.get('category') || '').trim();
  const status = searchParams.get('status');

  const validCategory = MAGANG_CATEGORIES.some(c => c.id === category || c.name === category)
    ? category
    : '';

  return {
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
    q: (searchParams.get('q') || '').trim().slice(0, 255),
    category: validCategory,
    status: Object.hasOwn(REGISTRATION_STATUSES, status) ? status : '',
  };
}

export function buildMagangQuery({ page = 1, q = '', category = '', status = '' }) {
  const filters = readMagangFilters(new URLSearchParams({ page, q, category, status }));
  const params = new URLSearchParams({ page: filters.page, per_page: 6 });
  if (filters.q) params.set('q', filters.q);
  if (filters.category) params.set('category', filters.category);
  if (filters.status) params.set('status', filters.status);
  return params.toString();
}

export async function requestInfoMagang(baseUrl, endpoint, { signal } = {}) {
  if (!baseUrl) throw new Error('Alamat API belum dikonfigurasi.');

  const response = await fetch(`${baseUrl.replace(/\/+$/, '')}/infomagang${endpoint}`, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    const error = new Error('Gagal memuat info magang. Silakan coba lagi.');
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export function getMagangImage(item, baseUrl) {
  if (item?.image_url) return item.image_url;
  return item?.image && baseUrl
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
