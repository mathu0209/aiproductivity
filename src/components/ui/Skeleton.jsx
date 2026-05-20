const Skeleton = ({
  width = 'w-full',
  height = 'h-4',
  className = '',
  circle = false,
}) => {
  const baseStyles = 'bg-slate-200 dark:bg-slate-700 animate-pulse'
  const circleStyles = circle ? 'rounded-full' : 'rounded-md'

  return (
    <div className={`${baseStyles} ${circleStyles} ${width} ${height} ${className}`} />
  )
}

export default Skeleton
