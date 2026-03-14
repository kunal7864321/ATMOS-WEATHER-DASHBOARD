function LoadingSkeleton() {
  return (
    <div className="skeleton-layout" aria-hidden="true">
      <div className="glass-card skeleton-card hero-skeleton" />
      <div className="skeleton-grid">
        <div className="glass-card skeleton-card" />
        <div className="glass-card skeleton-card" />
      </div>
      <div className="glass-card skeleton-card tall" />
    </div>
  );
}

export default LoadingSkeleton;
