
export const Skeleton = ({
  className = '',
  width = 'w-full',
  height = 'h-4',
  rounded = 'rounded-md',
}) => {
  return (
    <div
      className={`animate-pulse ${width} ${height} ${rounded} bg-slate-800/60 ${className}`}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
      }}
    />
  );
};

export const TaskSkeleton = () => (
  <div className="p-4 rounded-xl border border-slate-800 bg-surface flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <Skeleton width="w-20" height="h-4" />
      <Skeleton width="w-16" height="h-4" rounded="rounded-full" />
    </div>
    <Skeleton width="w-3/4" height="h-5" />
    <Skeleton width="w-full" height="h-3" />
    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
      <Skeleton width="w-24" height="h-3" />
      <Skeleton width="w-10" height="h-3" />
    </div>
  </div>
);

export const ProjectSkeleton = () => (
  <div className="p-5 rounded-xl border border-slate-800 bg-surface flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <Skeleton width="w-10" height="h-10" rounded="rounded-lg" />
      <div className="flex flex-col gap-1.5 flex-1">
        <Skeleton width="w-40" height="h-4" />
        <Skeleton width="w-20" height="h-3" />
      </div>
    </div>
    <Skeleton width="w-full" height="h-12" />
    <Skeleton width="w-full" height="h-2" rounded="rounded-full" />
  </div>
);
