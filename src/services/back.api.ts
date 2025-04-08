import type { Expense } from '@/types/Expense'
import type { LoginUser, User } from '@/types/User'
import axios from 'axios'

const backend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

backend.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const backendApi = {
  async registerUser(data: User) {
    return await backend.post('/users/register', data)
  },
  async loginUser(data: LoginUser) {
    const response = await backend.post<{ token: string }>('/users/login', data)
    localStorage.setItem('authToken', response.data.token)
    return response
  },
  async bringExpenses() {
    return await backend.get<Expense[]>('/expense')
  },
  logout() {
    localStorage.removeItem('authToken')
  },
}
