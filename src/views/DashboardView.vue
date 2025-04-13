<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LoadingView from '@/components/LoadingView.vue'
import { useExpenseStore } from '@/stores/expense.store.ts'

// TODO: El total de gastos debe ser mensual, no total desde que se registró el usuario

const totalAmount = ref(0)
const mostUsedCategory = ref('')
const expenseStore = useExpenseStore();
const isLoading = ref(true)

onMounted(async () => {
  await expenseStore.bringExpenses()
  totalAmount.value = expenseStore.expenses
    .map((expense) => parseFloat(expense.amount))
    .reduce((acc, amount) => acc + amount, 0)

  const categoryCount: Record<string, number> = {}

  expenseStore.expenses.forEach((expense) => {
    const title = expense.category.title
    categoryCount[title] = (categoryCount[title] || 0) + 1
  })

  const entries = Object.entries(categoryCount)
  if (entries.length > 0) {
    const [mostUsed] = entries.reduce((a, b) => {
      return a[1] > b[1] ? a : b
    })
    mostUsedCategory.value = mostUsed
  } else {
    mostUsedCategory.value = 'None yet'
  }

  isLoading.value = false
})
</script>

<template>
  <LoadingView v-if="isLoading" />
  <div v-else class="flex flex-row gap-20 min-h-screen">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-medium text-gray-700">Total Expenses</h2>
            <dollar-sign-icon class="h-6 w-6 text-emerald-600" />
          </div>
          <p class="text-3xl font-bold text-gray-900">{{ totalAmount }} $</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-medium text-gray-700">Main Category</h2>
            <tag-icon class="h-6 w-6 text-emerald-600" />
          </div>
          <p class="text-3xl font-bold text-gray-900">
            {{ mostUsedCategory }}
          </p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-medium text-gray-700">Recent Activity</h2>
            <calendar-icon class="h-6 w-6 text-emerald-600" />
          </div>
          <p class="text-3xl font-bold text-gray-900">{{ expenseStore.expenses.length }}</p>
          <p class="text-sm text-gray-500 mt-2">Expenses recorded this month</p>
        </div>
      </div>

      <div class="flex justify-end mb-6">
        <router-link to="/new-expense">
          <button
            class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg shadow"
          >
            + Add Expense
          </button>
        </router-link>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">Description</th>
              <th scope="col" class="px-6 py-3">Amount</th>
              <th scope="col" class="px-6 py-3">Category</th>
              <th scope="col" class="px-6 py-3">Created At</th>
            </tr>
          </thead>
          <tbody v-for="expense in expenseStore.expenses" :key="expense.id">
            <tr class="odd:bg-white even:bg-gray-50 border-b border-gray-200">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {{ expense.description }}
              </th>
              <td class="px-6 py-4">{{ parseFloat(expense.amount) }} $</td>
              <td class="px-6 py-4">{{ expense.category.title }}</td>
              <td class="px-6 py-4">{{ expense.createdAt.split('T')[0] }}</td>
            </tr>
          </tbody>
        </table>
        <p v-if="expenseStore.expenses.length === 0" class="text-center p-4 text-gray-500">No expenses yet</p>
      </div>
    </main>
  </div>
</template>
