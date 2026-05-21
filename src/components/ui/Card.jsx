const Card = ({
  children,
  className = '',
  hover = true,
  glass = false,
  onClick,
}) => {
  const baseStyles = 'bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm'
  const hoverStyles = hover ? 'hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all' : ''
  const glassStyles = glass ? 'bg-white/10 dark:bg-slate-900/10 backdrop-blur-md border-white/20 dark:border-slate-700/20' : ''

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${glassStyles} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card
