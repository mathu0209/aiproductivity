import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import Sidebar from '@/components/common/Sidebar'
import TopBar from '@/components/common/TopBar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Skeleton from '@/components/ui/Skeleton'
import { FiTrendingUp, FiCheckCircle, FiClock, FiUsers } from 'react-icons/fi'

const Dashboard = () => {
  const { user } = useAuth()
  const { success } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const stats = [
    { icon: FiCheckCircle, label: 'Completed Tasks', value: '24', color: 'text-green-600' },
    { icon: FiClock, label: 'In Progress', value: '8', color: 'text-blue-600' },
    { icon: FiTrendingUp, label: 'Productivity Score', value: '85%', color: 'text-purple-600' },
    { icon: FiUsers, label: 'Team Members', value: '12', color: 'text-orange-600' },
  ]

  const recentActivities = [
    { id: 1, title: 'Completed project proposal', time: '2 hours ago' },
    { id: 2, title: 'Reviewed team feedback', time: '4 hours ago' },
    { id: 3, title: 'Updated task status', time: '6 hours ago' },
    { id: 4, title: 'Scheduled meeting with client', time: '1 day ago' },
  ]

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}>
        <nav className="p-6 space-y-2">
          <a href="#" className="block px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">
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
          <a href="/settings" className="block px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            Settings
          </a>
        </nav>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Here's what's happening with your productivity today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                        {stat.value}
                      </p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
                  Recent Activities
                </h2>
                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div
                      key={activity.id}
                      className="pb-4 border-b border-slate-200 dark:border-slate-800 last:border-0"
                    >
                      <p className="text-slate-900 dark:text-slate-50 font-medium">
                        {activity.title}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <Button variant="primary" className="w-full">
                    New Task
                  </Button>
                  <Button variant="secondary" className="w-full">
                    New Project
                  </Button>
                  <Button variant="outline" className="w-full">
                    Schedule Meeting
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
