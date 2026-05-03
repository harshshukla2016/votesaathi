/**
 * Truth Center loading skeleton.
 * Displayed while the misinformation scanner chunk loads.
 */
export default function TruthLoading() {
  return (
    <div className="p-8 space-y-6 animate-pulse" role="status" aria-label="Loading Truth Center">
      <div className="h-8 w-56 bg-surface-container-high rounded-xl" />
      <div className="h-64 bg-surface-container-high rounded-[2rem]" />
      <div className="h-48 bg-surface-container-high rounded-[2rem]" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
