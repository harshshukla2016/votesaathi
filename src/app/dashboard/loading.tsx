/**
 * Dashboard loading skeleton.
 * Displayed by Next.js Suspense while the dashboard page chunk loads.
 * Implements lazy loading for optimal initial page load performance.
 */
export default function DashboardLoading() {
  return (
    <div className="p-8 space-y-6 animate-pulse" role="status" aria-label="Loading dashboard content">
      <div className="h-8 w-64 bg-surface-container-high rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-surface-container-high rounded-[2rem]" />
        ))}
      </div>
      <div className="h-96 bg-surface-container-high rounded-[2rem]" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
