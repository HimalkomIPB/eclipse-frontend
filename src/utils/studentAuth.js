// Student session lives in an HTTP-only cookie on the API host; nothing is stored in the browser.
const apiOrigin = (() => {
  try {
    return new URL(import.meta.env.VITE_API_BASE_URL).origin;
  } catch {
    return '';
  }
})();

export const googleLoginUrl = `${apiOrigin}/auth/google/redirect`;

export async function fetchStudent() {
  const res = await fetch(`${apiOrigin}/student/me`, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function logoutStudent(csrfToken) {
  const res = await fetch(`${apiOrigin}/student/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
