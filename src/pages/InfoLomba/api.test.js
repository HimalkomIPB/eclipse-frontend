import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildLombaQuery,
  getLombaImage,
  getRegistrationLink,
  readLombaFilters,
  requestInfoLomba,
} from './api.js';

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
  assert.deepEqual(await requestInfoLomba('https://backend.example/', '?page=2&per_page=6', {
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
  assert.deepEqual(await requestInfoLomba('https://backend.example', '/slug-asli-01example'), payload);
  assert.equal(fetchMock.mock.calls[0].arguments[0], 'https://backend.example/infolomba/slug-asli-01example');
});

test('empty list and category arrays remain valid responses', async t => {
  const payload = {
    pagination: { current_page: 1, per_page: 6, total: 0, last_page: 1 },
    categories: [], infolomba: [],
  };
  t.mock.method(globalThis, 'fetch', async () => Response.json(payload));
  assert.deepEqual(await requestInfoLomba('https://backend.example', '?page=1&per_page=6'), payload);
});

test('404, validation and server errors retain HTTP status for distinct UI handling', async t => {
  for (const status of [404, 422, 500]) {
    const fetchMock = t.mock.method(globalThis, 'fetch', async () => new Response('', { status }));
    await assert.rejects(requestInfoLomba('https://backend.example', '/missing'), error => error.status === status);
    fetchMock.mock.restore();
  }
});

test('aborted and failed requests propagate instead of returning empty successful data', async t => {
  const controller = new AbortController();
  controller.abort();
  const fetchMock = t.mock.method(globalThis, 'fetch', async (_url, { signal }) => {
    signal.throwIfAborted();
  });
  await assert.rejects(requestInfoLomba('https://backend.example', '', { signal: controller.signal }), {
    name: 'AbortError',
  });
  fetchMock.mock.mockImplementation(async () => { throw new TypeError('Failed to fetch'); });
  await assert.rejects(requestInfoLomba('https://backend.example', ''), /Failed to fetch/);
  await assert.rejects(requestInfoLomba('', ''), /belum dikonfigurasi/);
});

test('covers prefer canonical image_url and only use the Info Lomba storage path as fallback', () => {
  assert.equal(getLombaImage({ image: 'infolomba/a.jpg', image_url: 'https://cdn.example/a.jpg' }, 'https://backend.example'), 'https://cdn.example/a.jpg');
  assert.equal(getLombaImage({ image: 'infolomba/a.jpg' }, 'https://backend.example/'), 'https://backend.example/storage/infolomba/a.jpg');
  assert.equal(getLombaImage({}, 'https://backend.example'), '');
});

test('registration links allow external HTTP(S) and reject executable or invalid URLs', () => {
  assert.equal(getRegistrationLink('https://example.com/daftar?q=1'), 'https://example.com/daftar?q=1');
  assert.equal(getRegistrationLink('http://example.com/daftar'), 'http://example.com/daftar');
  for (const link of [undefined, '', '/daftar', 'javascript:alert(1)', 'data:text/html,test']) {
    assert.equal(getRegistrationLink(link), null);
  }
});
