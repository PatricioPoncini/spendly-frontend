import { defineStore } from 'pinia'
import type { Expense, SaveNewExpenseRequest } from '@/types/Expense.ts'
import { backendApi } from '@/services/back.api.ts'
import { handleAxiosError } from '@/utils/error.ts'
import { toast } from 'vue3-toastify'

export interface ExpenseStore {
  expenses: Expense[]
}

export const useExpenseStore = defineStore('expense', {
  state: (): ExpenseStore => ({
    expenses: []
  }),
  actions: {
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
    async saveNewExpense(expense: SaveNewExpenseRequest) {
      try {
        await backendApi.saveNewExpense(expense);
        toast.success("Expense saved successfully")
      } catch (error) {
        const { message } = handleAxiosError(error)
        toast.error(message)
        throw error
      }
    }
  }
})
