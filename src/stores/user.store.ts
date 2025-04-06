import { backendApi } from '@/services/back.api'
import type { User } from '@/types/User'
import { defineStore } from 'pinia'

export interface UserStore {
  userName: string
}

export const useUserStore = defineStore('user', {
  state: (): UserStore => ({
    userName: '',
  }),
  actions: {
    async register(data: User) {
      try {
        await backendApi.registerUser(data)
      } catch (error) {
        // TODO: Manejar el error con { message: string } y añadir un toast
        alert(error)
      }
    },
  },
})
