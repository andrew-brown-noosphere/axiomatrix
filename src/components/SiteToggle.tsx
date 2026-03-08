"use client";

export default function SiteToggle() {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-1 bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20 shadow-lg">
      <span className="px-4 py-2 rounded-full text-sm font-medium text-zinc-500">
        AxiomMatrix
      </span>
      <span className="px-4 py-2 rounded-full text-sm font-medium bg-cyan-500 text-black shadow-md">
        New Site
      </span>
    </div>
  );
}
