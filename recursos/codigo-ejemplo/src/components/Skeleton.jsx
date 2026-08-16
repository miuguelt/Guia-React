export default function Skeleton({ width = '100%', height = '20px', borderRadius = '6px', className = '' }) {
  return (
    <div 
      className={`skeleton ${className}`} 
      style={{ width, height, borderRadius }}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-panel-inner" style={{ marginBottom: '1rem' }}>
      <Skeleton height="24px" width="60%" className="mb-2" />
      <Skeleton height="16px" width="90%" className="mb-2" />
      <Skeleton height="16px" width="40%" />
    </div>
  );
}
