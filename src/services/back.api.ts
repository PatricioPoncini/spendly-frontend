import type { LoginUser, User } from '@/types/User'
import axios from 'axios'

const backend = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const backendApi = {
  async registerUser(data: User) {
    return await backend.post('/users/register', data)
  },
  async loginUser(data: LoginUser) {
    return await backend.post<{ token: string }>('/users/login', data)
  },
}
