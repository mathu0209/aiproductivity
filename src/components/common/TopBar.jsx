import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { FiLogOut, FiSettings, FiMoon, FiSun } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const TopBar = () => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          {user?.name || 'User'}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          {isDark ? (
            <FiSun className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          ) : (
            <FiMoon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          )}
        </button>

        <a
          href="/settings"
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
        >
          <FiSettings className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </a>

        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
        >
          <FiLogOut className="w-5 h-5 text-red-600" />
        </button>
      </div>
    </div>
  )
}

export default TopBar
