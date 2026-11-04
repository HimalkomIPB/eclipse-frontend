import { useEffect, useState } from 'react';
import { requestInfoLomba } from './api';

// Keep request handling local so existing API and image behavior stays intact.
export default function useInfoLomba(endpoint) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({ data: null, loading: true, error: null, key: null });
  const key = `${endpoint}:${attempt}`;

  useEffect(() => {
    const controller = new AbortController();
    setState(previous => ({ ...previous, loading: true, error: null, key }));

    requestInfoLomba(baseUrl, endpoint, { signal: controller.signal })
      .then(data => {
        if (!controller.signal.aborted) setState({ data, loading: false, error: null, key });
      })
      .catch(error => {
        if (!controller.signal.aborted) {
          setState(previous => ({ ...previous, loading: false, error, key }));
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
