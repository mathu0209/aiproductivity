import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { FiHome } from 'react-icons/fi'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-50 mb-2">
          404
        </h1>
        <p className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Page Not Found
        </p>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
          Sorry, the page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Link to="/dashboard">
          <Button variant="primary" className="flex items-center gap-2 inline-flex">
            <FiHome className="w-5 h-5" /> Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
