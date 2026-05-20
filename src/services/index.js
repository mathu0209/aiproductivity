import api from './api'

// ============ Authentication ============
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  resetPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPasswordConfirm: (token, password) => api.post('/auth/reset-password', { token, password }),
  logout: () => api.post('/auth/logout'),
}

// ============ User Profile ============
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  uploadAvatar: (file) => {
    const formData = new FormData()
    formData.append('avatar', file)
    return api.post('/users/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  changePassword: (oldPassword, newPassword) => 
    api.post('/users/change-password', { oldPassword, newPassword }),
  getSettings: () => api.get('/users/settings'),
  updateSettings: (settings) => api.put('/users/settings', settings),
}

// ============ Dashboard ============
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getAnalytics: (dateRange) => api.get('/dashboard/analytics', { params: { dateRange } }),
  getRecentTasks: (limit = 5) => api.get('/dashboard/tasks', { params: { limit } }),
  getActivity: (limit = 10) => api.get('/dashboard/activity', { params: { limit } }),
  getAIInsights: () => api.get('/dashboard/ai-insights'),
  getProductivityScore: () => api.get('/dashboard/productivity-score'),
}

// ============ Tasks ============
export const taskAPI = {
  getTasks: (filters = {}) => api.get('/tasks', { params: filters }),
  getTaskById: (id) => api.get(`/tasks/${id}`),
  createTask: (data) => api.post('/tasks', data),
  updateTask: (id, data) => api.put(`/tasks/${id}`, data),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  updateTaskStatus: (id, status) => api.patch(`/tasks/${id}/status`, { status }),
  getTaskComments: (taskId) => api.get(`/tasks/${taskId}/comments`),
  addTaskComment: (taskId, comment) => api.post(`/tasks/${taskId}/comments`, { comment }),
  attachFile: (taskId, file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post(`/tasks/${taskId}/files`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
}

// ============ Collaboration & Team ============
export const teamAPI = {
  getTeamMembers: () => api.get('/team/members'),
  getTeamWorkspaces: () => api.get('/team/workspaces'),
  createWorkspace: (data) => api.post('/team/workspaces', data),
  inviteTeamMember: (email, role) => api.post('/team/invite', { email, role }),
  removeTeamMember: (userId) => api.delete(`/team/members/${userId}`),
  updateMemberRole: (userId, role) => api.patch(`/team/members/${userId}`, { role }),
}

// ============ Messaging & Comments ============
export const messagingAPI = {
  getConversations: () => api.get('/messaging/conversations'),
  getConversationMessages: (conversationId) => api.get(`/messaging/conversations/${conversationId}`),
  sendMessage: (conversationId, message) => api.post(`/messaging/conversations/${conversationId}/messages`, { message }),
  createConversation: (userIds) => api.post('/messaging/conversations', { userIds }),
  getActivityFeed: () => api.get('/messaging/activity-feed'),
  mentionUser: (userId) => api.post(`/messaging/mentions`, { userId }),
}

// ============ AI Features ============
export const aiAPI = {
  getTaskSuggestions: () => api.get('/ai/task-suggestions'),
  getSmartRecommendations: () => api.get('/ai/recommendations'),
  generateTaskSummary: (taskId) => api.post(`/ai/summarize/${taskId}`),
  analyzeMeetingNotes: (notes) => api.post('/ai/analyze-meeting', { notes }),
  getProductivityTips: () => api.get('/ai/productivity-tips'),
  autoScheduleTask: (taskData) => api.post('/ai/auto-schedule', taskData),
}

// ============ Notifications ============
export const notificationAPI = {
  getNotifications: (limit = 10) => api.get('/notifications', { params: { limit } }),
  markAsRead: (id) => api.patch(`/notifications/${id}`, { read: true }),
  markAllAsRead: () => api.patch('/notifications/mark-all-read'),
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
  getNotificationSettings: () => api.get('/notifications/settings'),
  updateNotificationSettings: (settings) => api.put('/notifications/settings', settings),
}

// ============ Analytics ============
export const analyticsAPI = {
  getMetrics: (dateRange) => api.get('/analytics/metrics', { params: { dateRange } }),
  getReports: () => api.get('/analytics/reports'),
  generateReport: (type, data) => api.post(`/analytics/reports/${type}`, data),
  exportData: (format) => api.get('/analytics/export', { params: { format } }),
  getTeamMetrics: (dateRange) => api.get('/analytics/team-metrics', { params: { dateRange } }),
}

// ============ Search ============
export const searchAPI = {
  globalSearch: (query) => api.get('/search', { params: { q: query } }),
  searchTasks: (query) => api.get('/search/tasks', { params: { q: query } }),
  searchTeam: (query) => api.get('/search/team', { params: { q: query } }),
  searchMessages: (query) => api.get('/search/messages', { params: { q: query } }),
}

// ============ Files ============
export const fileAPI = {
  uploadFile: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/files/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  getFiles: () => api.get('/files'),
  deleteFile: (id) => api.delete(`/files/${id}`),
  shareFile: (id, userIds) => api.post(`/files/${id}/share`, { userIds }),
}

// ============ Integrations ============
export const integrationAPI = {
  getConnectedApps: () => api.get('/integrations'),
  connectApp: (appId, credentials) => api.post(`/integrations/${appId}/connect`, credentials),
  disconnectApp: (appId) => api.delete(`/integrations/${appId}`),
  getSyncStatus: (appId) => api.get(`/integrations/${appId}/status`),
}

export default api
