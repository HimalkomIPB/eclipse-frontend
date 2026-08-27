import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

/**
 * In-memory request cache.
 * Stores both the data and the in-flight promise so concurrent callers
 * for the same URL get deduplicated into a single network request.
 */
const cache = new Map();

/**
 * Build a cache key from the base URL and endpoint.
 */
const cacheKey = (baseUrl, endpoint) => `${baseUrl}/${endpoint}`;

/**
 * Shared fetch hook that deduplicates in-flight requests and caches
 * successful responses for the session. Supports AbortController for
 * cleanup when components unmount.
 *
 * @param {string} endpoint - API endpoint (e.g. 'communities')
 * @param {string} baseUrl - Base URL for the API
 * @param {Object} options
 * @param {boolean} options.enabled - Whether the fetch should run (default: true)
 * @returns {{ data: any, loading: boolean, error: string|null }}
 */
export const useSharedFetch = (endpoint, baseUrl, { enabled = true } = {}) => {
  const [state, setState] = useState(() => {
    const key = cacheKey(baseUrl, endpoint);
    const cached = cache.get(key);
    if (cached?.data) {
      return { data: cached.data, loading: false, error: null };
    }
    return { data: null, loading: enabled, error: null };
  });

  const abortRef = useRef(null);

  useEffect(() => {
    if (!enabled || !endpoint || !baseUrl) return;

    const key = cacheKey(baseUrl, endpoint);
    const cached = cache.get(key);

    // If we already have data in cache, use it immediately
    if (cached?.data) {
      setState({ data: cached.data, loading: false, error: null });
      return;
    }

    // If there's already an in-flight promise, piggyback on it
    if (cached?.promise) {
      setState(prev => ({ ...prev, loading: true }));
      cached.promise
        .then((data) => {
          setState({ data, loading: false, error: null });
        })
        .catch((err) => {
          setState({ data: null, loading: false, error: err.message });
        });
      return;
    }

    // Create a new request
    const controller = new AbortController();
    abortRef.current = controller;

    setState(prev => ({ ...prev, loading: true }));

    const fetchPromise = axios
      .get(`${baseUrl}/${endpoint}`, { signal: controller.signal })
      .then((response) => {
        const data = response.data;
        // Store resolved data in cache
        cache.set(key, { data, promise: null });
        return data;
      })
      .catch((err) => {
        // Remove failed entry from cache so it can be retried
        cache.delete(key);
        throw err;
      });

    // Store in-flight promise in cache for deduplication
    cache.set(key, { data: null, promise: fetchPromise });

    fetchPromise
      .then((data) => {
        setState({ data, loading: false, error: null });
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.error(`Error fetching ${endpoint}:`, err);
          setState({ data: null, loading: false, error: err.message });
        }
      });

    return () => {
      controller.abort();
    };
  }, [endpoint, baseUrl, enabled]);

  return state;
};

/**
 * Drop-in replacement for the old useFetchData.
 * Same signature, same return shape, but backed by the shared cache.
 */
export const useFetchData = (endpoint, baseUrl) => {
  return useSharedFetch(endpoint, baseUrl);
};
