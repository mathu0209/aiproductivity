import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { useToast } from '@/context/ToastContext'
import Sidebar from '@/components/common/Sidebar'
import TopBar from '@/components/common/TopBar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { FiToggleLeft, FiToggleRight, FiLogOut } from 'react-icons/fi'

const Settings = () => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { success } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    desktopNotifications: false,
    weeklyReport: true,
    twoFactor: false,
  })

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
    success('Setting updated')
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}>
        <nav className="p-6 space-y-2">
          <a href="/dashboard" className="block px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            Dashboard
          </a>
          <a href="/tasks" className="block px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            Tasks
          </a>
          <a href="/projects" className="block px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            Projects
          </a>
          <a href="/calendar" className="block px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            Calendar
          </a>
          <a href="#" className="block px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">
            Settings
          </a>
        </nav>
      </Sidebar>

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
              Settings
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your account and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Account Settings */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-6">
                  Account Settings
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-900 dark:text-slate-50 block mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      value={user?.name || ''}
                      disabled
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-900 dark:text-slate-50 block mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={user?.email || ''}
                      disabled
                    />
                  </div>

                  <Button variant="primary" className="w-full">
                    Update Profile
                  </Button>
                </div>
              </Card>

              {/* Notification Settings */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-6">
                  Notification Settings
                </h2>

                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications' },
                    { key: 'desktopNotifications', label: 'Desktop Notifications' },
                    { key: 'weeklyReport', label: 'Weekly Report' },
                    { key: 'twoFactor', label: 'Two-Factor Authentication' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <label className="text-slate-900 dark:text-slate-50 font-medium cursor-pointer">
                        {item.label}
                      </label>
                      <button
                        onClick={() => handleToggle(item.key)}
                        className="text-2xl transition-colors"
                      >
                        {settings[item.key] ? (
                          <FiToggleRight className="w-6 h-6 text-green-600" />
                        ) : (
                          <FiToggleLeft className="w-6 h-6 text-slate-400" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Appearance Settings */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-6">
                  Appearance
                </h2>

                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <label className="text-slate-900 dark:text-slate-50 font-medium cursor-pointer">
                    Dark Mode
                  </label>
                  <button
                    onClick={toggleTheme}
                    className="text-2xl transition-colors"
                  >
                    {isDark ? (
                      <FiToggleRight className="w-6 h-6 text-green-600" />
                    ) : (
                      <FiToggleLeft className="w-6 h-6 text-slate-400" />
                    )}
                  </button>
                </div>
              </Card>

              {/* Danger Zone */}
              <Card className="p-6 border-red-200 dark:border-red-900/30">
                <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-6">
                  Danger Zone
                </h2>

                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <FiLogOut /> Sign Out
                </Button>
              </Card>
            </div>

            {/* Quick Links */}
            <div>
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
                  Help & Support
                </h3>
                <div className="space-y-3">
                  <a href="#" className="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm font-medium">
                    Help Center
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm font-medium">
                    Privacy Policy
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm font-medium">
                    Terms of Service
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors text-sm font-medium">
                    Contact Support
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Settings
