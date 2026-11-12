import { useEffect, useState } from 'react';
import { requestInfoMagang, readMagangFilters } from './api';
import { filterMockMagang, getMockMagangBySlug } from './mockData';

export default function useInfoMagang(endpoint) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ data: null, loading: true, error: null, key: null });
  const key = `${endpoint}:${attempt}`;

  useEffect(() => {
    const controller = new AbortController();
    setState(previous => ({ ...previous, loading: true, error: null, key }));

    // Helper to get fallback mock data based on endpoint
    const getFallbackData = () => {
      // Check if endpoint is detail by slug: e.g. "/frontend-web-developer-intern"
      if (endpoint.startsWith('/') && !endpoint.includes('?')) {
        const slug = decodeURIComponent(endpoint.slice(1));
        const detail = getMockMagangBySlug(slug);
        if (detail) return detail;
      }

      // Check if endpoint is query: e.g. "?page=1&q=react"
      const queryIndex = endpoint.indexOf('?');
      const searchString = queryIndex >= 0 ? endpoint.slice(queryIndex) : endpoint;
      const searchParams = new URLSearchParams(searchString);
      const filters = readMagangFilters(searchParams);
      return filterMockMagang(filters);
    };

    if (!baseUrl) {
      // No API base URL configured -> use high quality mock data immediately
      const mockResult = getFallbackData();
      setState({ data: mockResult, loading: false, error: null, key });
      return () => controller.abort();
    }

    requestInfoMagang(baseUrl, endpoint, { signal: controller.signal })
      .then(data => {
        if (!controller.signal.aborted) {
          setState({ data, loading: false, error: null, key });
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          // If API endpoint is not yet ready on server, provide responsive mock data
          const mockResult = getFallbackData();
          setState({ data: mockResult, loading: false, error: null, key });
        }
      });

    return () => controller.abort();
  }, [baseUrl, endpoint, key]);

  return {
    data: state.data,
    loading: state.key !== key || state.loading,
    error: state.key === key ? state.error : null,
    retry: () => setAttempt(previous => previous + 1),
  };
}
