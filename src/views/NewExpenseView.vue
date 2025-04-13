<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { SaveNewExpenseRequest } from '@/types/Expense.ts'
import { useCategoryStore } from '@/stores/category.store.ts'
import { useExpenseStore } from '@/stores/expense.store.ts'
import { useRouter } from 'vue-router'
import LoadingView from '@/components/LoadingView.vue'

const categoryStore = useCategoryStore()
const expenseStore = useExpenseStore()
const newExpense = ref<SaveNewExpenseRequest>({})
const selectedCategoryId = ref<string | null>(null)
const router = useRouter()
const isLoading = ref(true)
const isSuccess = ref(false)

onMounted(async () => {
  await categoryStore.bringCategories()
  isLoading.value = false
})

const handleSubmit = async () => {
  if (isSuccess.value) return

  newExpense.value.categoryId = selectedCategoryId.value
  await expenseStore.saveNewExpense(newExpense.value)
  isSuccess.value = true

  setTimeout(() => {
    router.push('/dashboard')
  }, 2000)
}
</script>

<template>
  <LoadingView v-if="isLoading" />
  <div v-else class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-xl shadow-xl rounded-2xl p-8 space-y-6">
      <h2 class="text-3xl font-bold text-gray-800 text-center">Add New Expense</h2>
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
          <input
            v-model="newExpense.amount"
            type="number"
            id="amount"
            class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2.5 text-sm"
            placeholder="Enter amount"
            required
          />
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="newExpense.description"
            id="description"
            rows="4"
            class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2.5 text-sm"
            placeholder="E.g. Lunch, Transport, etc."
          ></textarea>
        </div>

        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            v-model="selectedCategoryId"
            class="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 p-2.5 text-sm"
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
        </div>

        <button
          type="submit"
          :disabled="isSuccess"
          class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-colors duration-300 disabled:opacity-60"
        >
          {{ isSuccess ? 'Expense Saved!' : 'Save Expense' }}
        </button>
      </form>
    </div>
  </div>
</template>
