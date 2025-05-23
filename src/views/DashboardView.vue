<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import LoadingView from '@/components/LoadingView.vue'
import { useExpenseStore } from '@/stores/expense.store.ts'
import { DollarSignIcon, Tag, Calendar } from 'lucide-vue-next'
import VueApexCharts from 'vue3-apexcharts'
import { truncateText } from '@/utils/format.ts'

const totalAmount = ref(0)
const mostUsedCategory = ref('')
const expenseStore = useExpenseStore()
const isLoading = ref(true)
const selectedMonth = ref<number>(0)
const hasChartData = computed(() => chartSeries.value.length > 0)

const chartSeries = computed(() => {
  const categoryTotals: Record<string, number> = {}

  expenseStore.expenses.forEach((expense) => {
    const category = expense.category.title
    const amount = parseFloat(expense.amount)

    if (categoryTotals[category]) {
      categoryTotals[category] += amount
    } else {
      categoryTotals[category] = amount
    }
  })

  return Object.values(categoryTotals)
})

const chartLabels = computed(() => {
  const categoryTotals: Record<string, number> = {}

  expenseStore.expenses.forEach((expense) => {
    const category = expense.category.title
    const amount = parseFloat(expense.amount)

    if (categoryTotals[category]) {
      categoryTotals[category] += amount
    } else {
      categoryTotals[category] = amount
    }
  })

  if (Object.keys(categoryTotals).length === 0) {
    return ['No data yet']
  }

  return Object.keys(categoryTotals)
})

const chartOptions = computed(() => ({
  chart: {
    type: 'donut',
  },
  labels: chartLabels.value,
  colors: hasChartData.value
    ? ['#3D8D7A', '#A3D1C6', '#537D5D', '#328E6E', '#6A9C89', '#16423C']
    : ['#84939c'],
  noData: {
    text: 'No data yet',
    align: 'center',
    verticalAlign: 'middle',
    style: {
      color: '#9e9e9e',
      fontSize: '14px',
    },
  },
  legend: {
    position: 'bottom',
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
  tooltip: {
    y: {
      formatter: function (value: number) {
        return '$' + value.toFixed(2)
      },
    },
  },
}))

const months = [
  { id: 1, name: 'January' },
  { id: 2, name: 'February' },
  { id: 3, name: 'March' },
  { id: 4, name: 'April' },
  { id: 5, name: 'May' },
  { id: 6, name: 'June' },
  { id: 7, name: 'July' },
  { id: 8, name: 'August' },
  { id: 9, name: 'September' },
  { id: 10, name: 'October' },
  { id: 11, name: 'November' },
  { id: 12, name: 'December' },
]

const updateExpenses = async () => {
  isLoading.value = true
  await expenseStore.bringExpensesByMonth(selectedMonth.value)
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
}

onMounted(async () => {
  selectedMonth.value = new Date().getMonth() + 1
  await updateExpenses()
})

watch(selectedMonth, async () => {
  await updateExpenses()
})
</script>

<template>
  <LoadingView v-if="isLoading" />
  <div v-else class="flex flex-col gap-8 min-h-screen px-4 py-6 sm:px-6 lg:px-8">
    <main class="w-full max-w-7xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Expense Dashboard</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div
          class="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 overflow-hidden"
        >
          <div class="p-6 relative">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-800">Total Expenses</h2>
              <div class="bg-emerald-100 rounded-full p-2.5">
                <DollarSignIcon class="h-5 w-5 text-emerald-600" />
              </div>
            </div>

            <p class="text-3xl font-bold text-gray-900">$ {{ totalAmount }}</p>
          </div>
        </div>

        <div
          class="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 overflow-hidden"
        >
          <div class="p-6 relative">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-800">Main Category</h2>
              <div class="bg-emerald-100 rounded-full p-2.5">
                <Tag class="h-5 w-5 text-emerald-600" />
              </div>
            </div>

            <p class="text-3xl font-bold text-gray-900">{{ mostUsedCategory }}</p>
          </div>
        </div>

        <div
          class="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 overflow-hidden"
        >
          <div class="p-6 relative">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <div class="bg-emerald-100 rounded-full p-2.5">
                <Calendar class="h-5 w-5 text-emerald-600" />
              </div>
            </div>

            <p class="text-3xl font-bold text-gray-900">{{ expenseStore.expenses.length }}</p>
            <p class="text-sm text-gray-500 mt-2">Expenses recorded this month</p>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <label class="block mb-2 text-sm font-medium text-gray-700">Select Month</label>
        <div class="relative w-full sm:w-1/2 md:w-1/3">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-gray-500"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <select
            id="category"
            v-model="selectedMonth"
            class="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm p-3 text-gray-700 appearance-none"
            required
          >
            <option disabled value="">Select category</option>
            <option v-for="month in months" :key="month.id" :value="month.id">
              {{ month.name }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-gray-500"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
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

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-md p-6 h-full">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Expenses by Category</h2>
            <div class="h-80">
              <VueApexCharts
                type="donut"
                height="100%"
                :options="chartOptions"
                :series="chartSeries"
              />
            </div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-md p-6 h-full">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">All Expenses</h2>

            <div class="hidden sm:block relative overflow-x-auto w-full max-h-96 overflow-y-auto">
              <table
                class="min-w-full text-sm text-left rtl:text-right text-gray-500 whitespace-nowrap"
              >
                <thead class="sticky top-0 bg-gray-50 text-xs text-gray-700 uppercase">
                  <tr>
                    <th scope="col" class="px-6 py-3">Description</th>
                    <th scope="col" class="px-6 py-3">Amount</th>
                    <th scope="col" class="px-6 py-3">Category</th>
                    <th scope="col" class="px-6 py-3">Spent At</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="expense in expenseStore.expenses"
                    :key="expense.id"
                    class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
                  >
                    <td class="px-6 py-4 font-medium text-gray-900">
                      {{ truncateText(expense.description, 20) }}
                    </td>
                    <td class="px-6 py-4">$ {{ parseFloat(expense.amount) }}</td>
                    <td class="px-6 py-4">{{ expense.category.title }}</td>
                    <td class="px-6 py-4">{{ expense.spentAt.split('T')[0] }}</td>
                  </tr>
                </tbody>
              </table>
              <p v-if="expenseStore.expenses.length === 0" class="text-center p-4 text-gray-500">
                No expenses yet
              </p>
            </div>

            <div class="block sm:hidden space-y-4">
              <div
                v-for="expense in expenseStore.expenses"
                :key="expense.id"
                class="bg-white rounded-lg shadow p-4 border border-gray-200"
              >
                <p class="text-sm text-gray-700 mb-1">
                  <span class="font-semibold">Description:</span>
                  {{ truncateText(expense.description, 15) }}
                </p>
                <p class="text-sm text-gray-700 mb-1">
                  <span class="font-semibold">Amount:</span> $ {{ parseFloat(expense.amount) }}
                </p>
                <p class="text-sm text-gray-700 mb-1">
                  <span class="font-semibold">Category:</span> {{ expense.category.title }}
                </p>
                <p class="text-sm text-gray-700">
                  <span class="font-semibold">Spent At:</span> {{ expense.spentAt.split('T')[0] }}
                </p>
              </div>
              <p v-if="expenseStore.expenses.length === 0" class="text-center p-4 text-gray-500">
                No expenses yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
