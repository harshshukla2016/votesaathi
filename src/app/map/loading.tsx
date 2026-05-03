/**
 * Map page loading skeleton.
 * Displayed while the GIS War Room and Google Maps chunk loads.
 */
export default function MapLoading() {
  return (
    <div className="p-8 space-y-6 animate-pulse" role="status" aria-label="Loading map content">
      <div className="h-8 w-48 bg-surface-container-high rounded-xl" />
      <div className="h-[600px] bg-surface-container-high rounded-[2rem]" />
      <span className="sr-only">Loading map...</span>
    </div>
  );
}
