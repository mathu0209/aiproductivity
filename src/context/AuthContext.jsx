import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { authAPI } from '@/services'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState(null)

  // Initialize auth from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      setIsLoading(true)
      const response = await authAPI.login(email, password)
      const { user: userData, token: authToken } = response.data

      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', authToken)

      setUser(userData)
      setToken(authToken)
      setIsAuthenticated(true)

      return { success: true, data: userData }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (userData) => {
    try {
      setIsLoading(true)
      const response = await authAPI.register(userData)
      const { user: newUser, token: authToken } = response.data

      localStorage.setItem('user', JSON.stringify(newUser))
      localStorage.setItem('token', authToken)

      setUser(newUser)
      setToken(authToken)
      setIsAuthenticated(true)

      return { success: true, data: newUser }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await authAPI.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      setUser(null)
      setToken(null)
      setIsAuthenticated(false)
    }
  }, [])

  const resetPassword = useCallback(async (email) => {
    try {
      setIsLoading(true)
      await authAPI.resetPassword(email)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Password reset failed' }
    } finally {
      setIsLoading(false)
    }
  }, [])

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
