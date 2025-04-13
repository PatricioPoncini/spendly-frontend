import type { Category } from '@/types/Category.ts'
import { defineStore } from 'pinia'
import { handleAxiosError } from '@/utils/error.ts'
import { toast } from 'vue3-toastify'
import { backendApi } from '@/services/back.api.ts'

export interface CategoryStore {
  categories: Category[]
}

export const useCategoryStore = defineStore('category', {
  state: (): CategoryStore => ({
    categories: [],
  }),
  actions: {
    async bringCategories() {
      try {
        const response = await backendApi.bringCategories()
        this.categories = response.data
      } catch (error) {
        const { message } = handleAxiosError(error)
        toast.error(message)
        throw error
      }
    },
  },
})
