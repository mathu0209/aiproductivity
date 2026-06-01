const Skeleton = ({ className = '', count = 1 }) => {
  return (
    <div className={`bg-slate-200 dark:bg-slate-700 rounded animate-pulse ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-4 mb-2 last:mb-0" />
      ))}
    </div>
  )
}

export default Skeleton
