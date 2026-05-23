import { useState } from 'react'
import Sidebar from '@/components/common/Sidebar'
import TopBar from '@/components/common/TopBar'
import Card from '@/components/ui/Card'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const Calendar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 23))

  const events = [
    { id: 1, date: 10, title: 'Team Meeting', color: 'bg-blue-500' },
    { id: 2, date: 15, title: 'Project Review', color: 'bg-purple-500' },
    { id: 3, date: 23, title: 'Client Call', color: 'bg-green-500' },
    { id: 4, date: 28, title: 'Sprint Planning', color: 'bg-orange-500' },
  ]

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const totalDays = daysInMonth(currentDate)
  const startingDayOfWeek = firstDayOfMonth(currentDate)

  const calendarDays = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i)
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
          <a href="#" className="block px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">
            Calendar
          </a>
          <a href="/settings" className="block px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            Settings
          </a>
        </nav>
      </Sidebar>

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
              Calendar
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              View and manage your events.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <button onClick={prevMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                    {monthName}
                  </h2>
                  <button onClick={nextMonth} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {days.map(day => (
                    <div key={day} className="text-center font-semibold text-slate-600 dark:text-slate-400 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    const event = events.find(e => e.date === day)
                    return (
                      <div
                        key={index}
                        className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ${
                          day === null
                            ? 'bg-slate-50 dark:bg-slate-900'
                            : day === 23
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {day}
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>

            {/* Upcoming Events */}
            <div>
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
                  Upcoming Events
                </h3>
                <div className="space-y-3">
                  {events.map(event => (
                    <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${event.color}`} />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-50 text-sm">
                          {event.title}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          May {event.date}, 2026
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Calendar
