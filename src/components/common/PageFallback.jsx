/**
 * Lightweight suspense fallback for lazy-loaded routes.
 * Uses CSS animation to avoid importing any external spinner library.
 */
const PageFallback = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      color: 'rgba(255,255,255,0.7)',
      fontSize: '0.875rem',
    }}
  >
    <div
      style={{
        width: '28px',
        height: '28px',
        border: '3px solid rgba(255,255,255,0.15)',
        borderTopColor: '#AFE1EA',
        borderRadius: '50%',
        animation: 'page-spin 0.65s linear infinite',
        marginRight: '12px',
      }}
    />
    <style>{`@keyframes page-spin { to { transform: rotate(360deg); } }`}</style>
    Memuat...
  </div>
);

export default PageFallback;
