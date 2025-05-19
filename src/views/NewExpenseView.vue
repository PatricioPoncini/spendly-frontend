<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { SaveNewExpenseRequest } from '@/types/Expense.ts'
import { useCategoryStore } from '@/stores/category.store.ts'
import { useExpenseStore } from '@/stores/expense.store.ts'
import { useRouter } from 'vue-router'
import LoadingView from '@/components/LoadingView.vue'
import { toast } from 'vue3-toastify'

const categoryStore = useCategoryStore()
const expenseStore = useExpenseStore()
const newExpense = ref<SaveNewExpenseRequest>({
  categoryId: '',
  amount: 0,
  description: '',
  spentAt: '',
})
const selectedDate = ref<string>('')
const selectedCategoryId = ref<string | null>(null)
const router = useRouter()
const isLoading = ref(true)
const isSuccess = ref(false)

onMounted(async () => {
  await categoryStore.bringCategories()
  const today = new Date()
  selectedDate.value = today.toISOString().split('T')[0]
  newExpense.value.spentAt = today.toISOString()
  isLoading.value = false
})

const formattedAmount = computed(() => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(newExpense.value.amount || 0)
})

const handleSubmit = async () => {
  if (isSuccess.value) return
  console.log(newExpense.value)
  if (!newExpense.value.amount || !newExpense.value.description || !selectedCategoryId.value) {
    toast.error('All fields are required')
    return
  }

  newExpense.value.categoryId = selectedCategoryId.value
  await expenseStore.saveNewExpense(newExpense.value)
  isSuccess.value = true

  setTimeout(() => {
    router.push('/dashboard')
  }, 2000)
}

watch(selectedDate, (newVal) => {
  if (newVal) {
    const date = new Date(newVal)
    newExpense.value.spentAt = date.toISOString()
  }
})
</script>

<template>
  <LoadingView v-if="isLoading" />
  <div v-else class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="flex flex-col items-center w-full max-w-xl shadow-xl rounded-2xl p-8 space-y-6">
      <h2 class="text-3xl font-bold text-gray-800 text-center">Add New Expense</h2>
      <div class="bg-white rounded-xl w-full max-w-md z-50 relative">
        <form @submit.prevent="handleSubmit" class="p-6">
          <div class="grid gap-6">
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 flex items-center">
                Amount
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                v-model="newExpense.amount"
                min="0"
                step="0.01"
                placeholder="0.00"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <p class="text-sm text-gray-500">{{ formattedAmount }}</p>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 flex items-center">
                Description
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                v-model="newExpense.description"
                placeholder="e.g., Grocery shopping"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 flex items-center">
                Date
                <span class="text-red-500 ml-1">*</span>
              </label>
              <input
                type="date"
                v-model="selectedDate"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 flex items-center">
                Category
                <span class="text-red-500 ml-1">*</span>
              </label>
              <select
                v-model="selectedCategoryId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              >
                <option disabled value="">Select a category</option>
                <option
                  v-for="category in categoryStore.categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.title }}
                </option>
              </select>
            </div>

            <button
              :disabled="isSuccess"
              type="submit"
              class="font-semibold w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <span v-if="!isSuccess">Save Expense</span>
              <div
                class="flex items-center justify-center pointer-events-none"
                role="status"
                v-else
              >
                <svg
                  aria-hidden="true"
                  class="w-6 h-6 text-gray-200 animate-spin fill-green-800"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
