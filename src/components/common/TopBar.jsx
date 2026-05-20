import { useState } from 'react'
import { FiMenu, FiBell, FiSearch, FiChevronDown } from 'react-icons/fi'
import { useAuth } from '@/context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const TopBar = ({ onMenuClick }) => {
  const { user } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const notifications = [
    { id: 1, message: 'You have a new task assigned', time: '5m ago' },
    { id: 2, message: 'John mentioned you in a comment', time: '1h ago' },
    { id: 3, message: 'Meeting starts in 15 minutes', time: '2h ago' },
  ]

  return (
    <div className="h-16 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-500 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
        >
          <FiMenu className="w-6 h-6" />
        </button>
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-2 w-64">
          <FiSearch className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent ml-2 flex-1 outline-none text-sm text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-slate-500 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
          >
            <FiBell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 z-50"
              >
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div
                      key={notif.id}
                      className="p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    >
                      <p className="text-sm text-slate-900 dark:text-slate-50">{notif.message}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg px-3 py-2 transition-colors"
          >
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="hidden sm:inline text-sm font-medium text-slate-900 dark:text-slate-50">{user?.name}</span>
            <FiChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 z-50"
              >
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{user?.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                </div>
                <div className="p-2 space-y-1">
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">Profile</button>
                  <button className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors">Settings</button>
                  <hr className="my-1 border-slate-200 dark:border-slate-800" />
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">Logout</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default TopBar
