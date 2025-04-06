import { backendApi } from '@/services/back.api'
import type { LoginUser, User } from '@/types/User'
import { handleAxiosError } from '@/utils/error'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

export interface UserStore {
  userName: string
  userJWT: string
}

export const useUserStore = defineStore('user', {
  state: (): UserStore => ({
    userName: '',
    userJWT: '',
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
        this.userJWT = response.data.token
      } catch (error) {
        const { message } = handleAxiosError(error)
        toast.error(message)
        throw error
      }
    },
  },
})
