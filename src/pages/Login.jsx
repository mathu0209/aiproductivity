import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { useTheme } from '@/context/ThemeContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { FiMoon, FiSun } from 'react-icons/fi'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { success, error } = useToast()
  const { isDark, toggleTheme } = useTheme()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    const result = await login(formData.email, formData.password)
    setIsLoading(false)

    if (result.success) {
      success('Login successful!')
      navigate('/dashboard')
    } else {
      error(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 p-2 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-md hover:shadow-lg transition-shadow"
      >
        {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
      </button>

      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            AI Productivity
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Welcome back. Sign in to continue.
          </p>
        </div>

        {/* Login Form */}
        <Card className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              className="mb-4"
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              className="mb-6"
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Don't have an account?
            </p>
            <Link
              to="/register"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Create account
            </Link>
          </div>
        </Card>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-800 dark:text-blue-300 mb-2 font-semibold">
            Demo Credentials:
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-400">
            Email: demo@example.com
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-400">
            Password: demo123456
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
