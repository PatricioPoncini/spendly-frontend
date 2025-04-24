import type { Expense, SaveNewExpenseRequest } from '@/types/Expense'
import type { LoginUser, User } from '@/types/User'
import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import type { Category } from '@/types/Category.ts'
import { useAuthStore } from '@/stores/auth.store.ts'

interface FailedRequest {
  resolve: (token: string) => void
  reject: (error: unknown) => void
}

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

let isRefreshing = false
let failedQueue: FailedRequest[] = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else if (token) {
      resolve(token)
    }
  })

  failedQueue = []
}

backend.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`
              }
              resolve(backend(originalRequest))
            },
            reject,
          })
        })
      }

      isRefreshing = true

      try {
        const res = await axios.post<{ accessToken: string }>(
          `${import.meta.env.VITE_BACKEND_URL}/users/refresh`,
          {},
          { withCredentials: true },
        )

        const newToken = res.data.accessToken
        useAuthStore().login(newToken)
        processQueue(null, newToken)

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
        }

        return backend(originalRequest)
      } catch (err) {
        processQueue(err, null)
        useAuthStore().logout()
        window.location.href = '/login'
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export const backendApi = {
  async registerUser(data: User) {
    return await backend.post('/users/register', data)
  },
  async loginUser(data: LoginUser) {
    return await backend.post<{ accessToken: string }>('/users/login', data)
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
