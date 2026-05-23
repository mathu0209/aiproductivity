import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Sidebar from '@/components/common/Sidebar'
import TopBar from '@/components/common/TopBar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { FiPlus, FiTrash2, FiEdit2, FiCheckCircle } from 'react-icons/fi'

const Tasks = () => {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete project proposal', status: 'completed', priority: 'high' },
    { id: 2, title: 'Review team feedback', status: 'in-progress', priority: 'medium' },
    { id: 3, title: 'Update documentation', status: 'pending', priority: 'low' },
    { id: 4, title: 'Schedule client meeting', status: 'pending', priority: 'high' },
  ])
  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTask, status: 'pending', priority: 'medium' }])
      setNewTask('')
    }
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    return task.status === filter
  })

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      'in-progress': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
    }
    return colors[status] || colors.pending
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-600 dark:text-red-400',
      medium: 'text-orange-600 dark:text-orange-400',
      low: 'text-green-600 dark:text-green-400',
    }
    return colors[priority] || colors.medium
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}>
        <nav className="p-6 space-y-2">
          <a href="/dashboard" className="block px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            Dashboard
          </a>
          <a href="#" className="block px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">
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

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
              Tasks
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage and track your daily tasks.
            </p>
          </div>

          {/* Add Task */}
          <Card className="p-6 mb-6">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
              <Button onClick={addTask} className="flex items-center gap-2">
                <FiPlus /> Add
              </Button>
            </div>
          </Card>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            {['all', 'pending', 'in-progress', 'completed'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <Card key={task.id} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 flex-1">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.status === 'completed'
                        ? 'bg-green-600 border-green-600'
                        : 'border-slate-300 dark:border-slate-600 hover:border-green-600'
                    }`}
                  >
                    {task.status === 'completed' && <FiCheckCircle className="w-4 h-4 text-white" />}
                  </button>
                  <div className="flex-1">
                    <p className={`font-medium ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-900 dark:text-slate-50'}`}>
                      {task.title}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(task.status)}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteTask(task.id)} className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 transition-colors">
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {filteredTasks.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-4">No tasks found</p>
              <Button onClick={() => setFilter('all')}>View all tasks</Button>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}

export default Tasks
