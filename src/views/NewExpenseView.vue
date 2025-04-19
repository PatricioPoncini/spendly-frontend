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
    <div class="w-full max-w-xl shadow-xl rounded-2xl p-8 space-y-6">
      <h2 class="text-3xl font-bold text-gray-800 text-center">Add New Expense</h2>
      <div class="p-6 md:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-2">
            <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-gray-500"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                  <path d="M12 18V6" />
                </svg>
              </div>
              <input
                v-model="newExpense.amount"
                type="number"
                id="amount"
                class="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3 text-gray-700"
                placeholder="0.00"
                required
                step="0.01"
              />
            </div>
            <div class="relative">
              <div class="absolute right-0 text-right text-lg font-semibold text-emerald-700">
                {{ formattedAmount }} USD
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <label for="description" class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-gray-500"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </div>
              <textarea
                v-model="newExpense.description"
                id="description"
                rows="1"
                class="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3 text-gray-700"
                placeholder="What was this expense for?"
              ></textarea>
            </div>
          </div>

          <div class="space-y-2">
            <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-gray-500"
                >
                  <path d="M20 14V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7" />
                  <path d="M12 14v7" />
                  <path d="M8 21h8" />
                  <path d="M2 14h20" />
                </svg>
              </div>
              <select
                id="category"
                v-model="selectedCategoryId"
                class="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3 text-gray-700 appearance-none"
                required
              >
                <option disabled value="">Select category</option>
                <option
                  v-for="category in categoryStore.categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.title }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-gray-500"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <label for="spentAt" class="block text-sm font-medium text-gray-700">Spent at</label>
            <div class="relative">
              <input
                type="date"
                id="spentAt"
                v-model="selectedDate"
                class="block w-full rounded-lg border border-gray-300 shadow-sm p-3 text-gray-700"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <button
              type="submit"
              :disabled="isSuccess"
              class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center"
            >
              <template v-if="isSuccess">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mr-2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Expense Saved!
              </template>
              <template v-else> Save Expense </template>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
