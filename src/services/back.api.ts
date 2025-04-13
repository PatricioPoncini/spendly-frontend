import type { Expense, SaveNewExpenseRequest } from '@/types/Expense'
import type { LoginUser, User } from '@/types/User'
import axios from 'axios'
import type { Category } from '@/types/Category.ts'

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
    return await backend.post<{ token: string }>('/users/login', data)
  },
  async bringExpensesByMonth(month: number) {
    return await backend.get<Expense[]>(`/expense/byMonth/${month}`)
  },
  async bringCategories() {
    return await backend.get<Category[]>('/category')
  },
  async saveNewExpense(newExpense: SaveNewExpenseRequest) {
    return await backend.post('/expense', newExpense)
  },
  logout() {
    localStorage.removeItem('authToken')
  },
}
