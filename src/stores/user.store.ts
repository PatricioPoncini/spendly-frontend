import { backendApi } from '@/services/back.api'
import type { Expense } from '@/types/Expense'
import type { LoginUser, User } from '@/types/User'
import { handleAxiosError } from '@/utils/error'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import { useAuthStore } from './auth.store'

export interface UserStore {
  userName: string
  userJWT: string
  expenses: Expense[]
}

export const useUserStore = defineStore('user', {
  state: (): UserStore => ({
    userName: '',
    userJWT: '',
    expenses: [],
  }),
  actions: {
    async register(data: User) {
      try {
        await backendApi.registerUser(data)
      } catch (error) {
        const { message } = handleAxiosError(error)
        toast.error(message)
        throw error
      }
    },
    async login(data: LoginUser) {
      try {
        const response = await backendApi.loginUser(data)
        const auth = useAuthStore()
        auth.login(response.data.token)
      } catch (error) {
        const { message } = handleAxiosError(error)
        toast.error(message)
        throw error
      }
    },
    async bringExpenses() {
      try {
        const response = await backendApi.bringExpenses()
        this.expenses = response.data
      } catch (error) {
        const { message } = handleAxiosError(error)
        toast.error(message)
        throw error
      }
    },
  },
})
