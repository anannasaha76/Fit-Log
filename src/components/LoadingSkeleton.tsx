import React from "react";
export const WorkoutCardSkeleton: React.FC = () => {
return (
    <div className="bg-[#131722] border border-[#222938] rounded-xl overflow-hidden flex flex-col animate-pulse">
      <div className="w-full h-52 bg-[#1c2230]" />
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
      <div className="space-y-2">
      <div className="h-6 bg-[#1c2230] rounded w-3/4" />
      <div className="h-4 bg-[#1a202c] rounded w-1/2" />
      </div>
        <div className="pt-3 border-t border-[#1f2636] flex justify-between">
          <div className="h-4 bg-[#1c2230] rounded w-16" />
          <div className="h-4 bg-[#1c2230] rounded w-16" />
          <div className="h-4 bg-[#1c2230] rounded w-12" />
      </div>
      </div>
       </div>
  );
};

export const LibraryGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <WorkoutCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const PlanListSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i}
          className="bg-[#131722] border border-[#222938] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-24 h-20 bg-[#1c2230] rounded-lg shrink-0" />
          <div className="space-y-2 flex-1">
              <div className="h-5 bg-[#1c2230] rounded w-40" />
              <div className="h-4 bg-[#1a202c] rounded w-24" />
              <div className="h-4 bg-[#1a202c] rounded w-32" />
            </div>
            </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="h-10 bg-[#1c2230] rounded-lg w-28" />
            <div className="h-10 bg-[#1c2230] rounded-lg w-32" />
          </div>
          </div>
      ))}
    </div>
  );
};
