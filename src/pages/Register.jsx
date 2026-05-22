import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { useTheme } from '@/context/ThemeContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { FiMoon, FiSun } from 'react-icons/fi'

const Register = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const { success, error } = useToast()
  const { isDark, toggleTheme } = useTheme()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
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
    if (!formData.name) newErrors.name = 'Name is required'
    else if (formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters'
    
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email'
    
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

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
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    })
    setIsLoading(false)

    if (result.success) {
      success('Registration successful! Welcome aboard.')
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
            Create an account to get started.
          </p>
        </div>

        {/* Register Form */}
        <Card className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              className="mb-4"
            />

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
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              className="mb-4"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              className="mb-6"
            />

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              className="w-full"
            >
              Create Account
            </Button>
          </form>

          {/* Password Requirements */}
          <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
              Password Requirements:
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <li>✓ At least 6 characters</li>
              <li>✓ Passwords must match</li>
            </ul>
          </div>

          {/* Sign In Link */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Sign in here
            </Link>
          </div>
        </Card>

        {/* Terms Notice */}
        <div className="mt-4 text-center text-xs text-slate-600 dark:text-slate-400">
          <p>
            By registering, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
