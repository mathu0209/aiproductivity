import { useState } from 'react'
import Sidebar from '@/components/common/Sidebar'
import TopBar from '@/components/common/TopBar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { FiPlus, FiTrash2, FiUsers, FiCalendar } from 'react-icons/fi'

const Projects = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', status: 'in-progress', progress: 65, team: 4 },
    { id: 2, name: 'Mobile App Development', status: 'planning', progress: 20, team: 6 },
    { id: 3, name: 'Marketing Campaign', status: 'completed', progress: 100, team: 3 },
  ])
  const [newProject, setNewProject] = useState('')

  const addProject = () => {
    if (newProject.trim()) {
      setProjects([...projects, { id: Date.now(), name: newProject, status: 'planning', progress: 0, team: 1 }])
      setNewProject('')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      planning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    }
    return colors[status] || colors.planning
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
          <a href="#" className="block px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">
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
              Projects
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage all your projects in one place.
            </p>
          </div>

          {/* Add Project */}
          <Card className="p-6 mb-6">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Create a new project..."
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addProject()}
              />
              <Button onClick={addProject} className="flex items-center gap-2">
                <FiPlus /> Create
              </Button>
            </div>
          </Card>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                      {project.name}
                    </h3>
                    <span className={`inline-block text-xs px-2 py-1 rounded font-medium mt-2 ${getStatusColor(project.status)}`}>
                      {project.status.replace('-', ' ')}
                    </span>
                  </div>
                  <button className="text-slate-400 hover:text-red-600 transition-colors">
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Progress</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Team & Date */}
                <div className="flex gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <FiUsers className="w-4 h-4" />
                    <span>{project.team} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    <span>Due soon</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Projects
