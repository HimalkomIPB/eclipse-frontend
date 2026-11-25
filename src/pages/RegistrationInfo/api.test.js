import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildRegistrationQuery,
  getRegistrationImage,
  getRegistrationLink,
  readRegistrationFilters,
  requestRegistrationInfo,
} from './api.js';
import { registrationFeatures } from './features.js';

const buildLombaQuery = values => buildRegistrationQuery(values, true);
const readLombaFilters = params => readRegistrationFilters(params, true);

test('default list requests six items without unselected filters', () => {
  assert.equal(buildLombaQuery({}), 'page=1&per_page=6');
  const query = new URLSearchParams(buildLombaQuery({ category_id: 'all', status: 'all', q: '  ' }));
  assert.equal(query.has('category_id'), false);
  assert.equal(query.has('status'), false);
  assert.equal(query.has('q'), false);
});

test('search, category ID, status and server page combine without changing the keyword', () => {
  const query = new URLSearchParams(buildLombaQuery({
    page: 3, q: 'Hackathon & UI/UX', category_id: '12', status: 'active',
  }));
  assert.deepEqual(Object.fromEntries(query), {
    page: '3', per_page: '6', q: 'Hackathon & UI/UX', category_id: '12', status: 'active',
  });
  for (const status of ['upcoming', 'active', 'closed']) {
    assert.equal(new URLSearchParams(buildLombaQuery({ status })).get('status'), status);
  }
});

test('URL filters reject invalid pages, categories and statuses and limit search length', () => {
  for (const page of ['-1', '0', '1.5', 'all', 'Infinity', '9007199254740992']) {
    assert.equal(readLombaFilters(new URLSearchParams({ page })).page, 1);
  }
  assert.deepEqual(readLombaFilters(new URLSearchParams({
    q: `  ${'a'.repeat(260)}  `, category_id: '-2', status: 'toString',
  })), { page: 1, q: 'a'.repeat(255), category_id: '', status: '' });
});

test('list request preserves the API envelope and sends only the JSON Accept header', async t => {
  const payload = {
    pagination: { current_page: 2, per_page: 6, total: 8, last_page: 2 },
    categories: [{ id: 1, name: 'Programming' }, { id: 2, name: 'Desain' }],
    infolomba: [{ id: 8, title: 'Judul baru', slug: 'slug-tetap-01example', status: 'closed' }],
  };
  const controller = new AbortController();
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => Response.json(payload));
  assert.deepEqual(await requestRegistrationInfo('https://backend.example/', '/infolomba?page=2&per_page=6', {
    signal: controller.signal,
  }), payload);
  assert.deepEqual(fetchMock.mock.calls[0].arguments, [
    'https://backend.example/infolomba?page=2&per_page=6',
    { headers: { Accept: 'application/json' }, signal: controller.signal },
  ]);
});

test('detail requests use the API slug and return an object without an extra data wrapper', async t => {
  const payload = { infolomba: { id: 1, title: 'Judul diubah', slug: 'slug-asli-01example' } };
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => Response.json(payload));
  assert.deepEqual(await requestRegistrationInfo('https://backend.example', '/infolomba/slug-asli-01example'), payload);
  assert.equal(fetchMock.mock.calls[0].arguments[0], 'https://backend.example/infolomba/slug-asli-01example');
});

test('empty list and category arrays remain valid responses', async t => {
  const payload = {
    pagination: { current_page: 1, per_page: 6, total: 0, last_page: 1 },
    categories: [], infolomba: [],
  };
  t.mock.method(globalThis, 'fetch', async () => Response.json(payload));
  assert.deepEqual(await requestRegistrationInfo('https://backend.example', '/infolomba?page=1&per_page=6'), payload);
});

test('origin, not found, validation and server errors retain HTTP status for distinct UI handling', async t => {
  for (const status of [403, 404, 422, 500]) {
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => new Response('', { status }));
    await assert.rejects(requestRegistrationInfo('https://backend.example', '/infolomba/missing'), error => error.status === status);
    fetchMock.mock.restore();
  }
});

test('aborted and failed requests propagate instead of returning empty successful data', async t => {
  const controller = new AbortController();
  controller.abort();
  const fetchMock = t.mock.method(globalThis, 'fetch', async (_url, { signal }) => {
    signal.throwIfAborted();
  });
  await assert.rejects(requestRegistrationInfo('https://backend.example', '/infolomba', { signal: controller.signal }), {
    name: 'AbortError',
  });
  fetchMock.mock.mockImplementation(async () => { throw new TypeError('Failed to fetch'); });
  await assert.rejects(requestRegistrationInfo('https://backend.example', '/infolomba'), /Failed to fetch/);
  await assert.rejects(requestRegistrationInfo('', '/infolomba'), /belum dikonfigurasi/);
});

test('covers prefer canonical image_url and only use the Info Lomba storage path as fallback', () => {
  assert.equal(getRegistrationImage({ image: 'infolomba/a.jpg', image_url: 'https://cdn.example/a.jpg' }, 'https://backend.example'), 'https://cdn.example/a.jpg');
  assert.equal(getRegistrationImage({ image: 'infolomba/a.jpg' }, 'https://backend.example/'), 'https://backend.example/storage/infolomba/a.jpg');
  assert.equal(getRegistrationImage({}, 'https://backend.example'), '');
});

test('registration links allow external HTTP(S) and reject executable or invalid URLs', () => {
  assert.equal(getRegistrationLink('https://example.com/daftar?q=1'), 'https://example.com/daftar?q=1');
  assert.equal(getRegistrationLink('http://example.com/daftar'), 'http://example.com/daftar');
  for (const link of [undefined, '', '/daftar', 'javascript:alert(1)', 'data:text/html,test']) {
    assert.equal(getRegistrationLink(link), null);
  }
});

test('category-free queries ignore category_id and preserve valid title and status filters', () => {
  const q = 'Data & UI/UX';
  const query = buildRegistrationQuery({ page: 2, q, status: 'active', category_id: '12' });
  assert.deepEqual(Object.fromEntries(new URLSearchParams(query)), {
    page: '2', per_page: '6', q, status: 'active',
  });

  const title = `${'a'.repeat(254)}🚀`;
  assert.equal(readRegistrationFilters(new URLSearchParams({ q: `${title}z` })).q, title);
});

test('magang and beasiswa use their own public endpoints and response keys', async t => {
  const fetchMock = t.mock.method(globalThis, 'fetch');
  const baseUrl = 'https://backend.example/';
  const slug = 'judul-asli-01example';
  const item = { id: 5, title: 'Judul baru', slug, image: 'cover.jpg', image_url: 'https://cdn.example/cover.jpg' };
  const expectedKeys = {
    '/info-magang': 'infomagang',
    '/info-beasiswa': 'infobeasiswa',
  };

  for (const [endpoint, key] of Object.entries(expectedKeys)) {
    const feature = registrationFeatures.find(entry => entry.endpoint === endpoint);
    assert.equal(feature?.responseKey, key);
    assert.equal(Boolean(feature.hasCategories), false);

    const list = { pagination: { last_page: 1, total: 1 }, [key]: [item] };
    fetchMock.mock.mockImplementation(async () => Response.json(list));
    assert.deepEqual(await requestRegistrationInfo(baseUrl, `${feature.endpoint}?page=1&per_page=6`), list);
    assert.deepEqual(fetchMock.mock.calls.at(-1).arguments, [
      `https://backend.example${endpoint}?page=1&per_page=6`,
      { headers: { Accept: 'application/json' }, signal: undefined },
    ]);

    const detail = { [key]: item };
    fetchMock.mock.mockImplementation(async () => Response.json(detail));
    assert.deepEqual(await requestRegistrationInfo(baseUrl, `${feature.endpoint}/${slug}`), detail);
    assert.equal(fetchMock.mock.calls.at(-1).arguments[0], `https://backend.example${endpoint}/${slug}`);
  }

  assert.equal(getRegistrationImage(item), item.image_url);
  assert.equal(getRegistrationImage({ image: item.image }), '');
});
