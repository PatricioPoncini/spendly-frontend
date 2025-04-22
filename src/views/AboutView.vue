<script setup lang="ts">
import { ref } from 'vue'

const features = ref([
  {
    title: 'Expense Tracking',
    description: 'Easily record and categorize all your expenses in one place.',
    icon: 'DollarSignIcon',
  },
  {
    title: 'Monthly Reports',
    description: 'Get detailed insights about your spending habits with monthly breakdowns.',
    icon: 'BarChartIcon',
  },
  {
    title: 'Category Management',
    description:
      'Organize expenses with customizable categories to better understand your spending.',
    icon: 'TagIcon',
  },
])
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <main class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">About Spendly</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Your personal finance companion designed to help you track, manage, and optimize your
          expenses.
        </p>
      </div>

      <div class="bg-white rounded-lg shadow p-8 mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p class="text-gray-600 mb-6">
          We believe that financial clarity leads to financial freedom. Our mission is to provide a
          simple yet powerful tool that helps you understand your spending habits, make informed
          decisions, and achieve your financial goals.
        </p>
        <div class="flex justify-center">
          <button
            class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-200"
          >
            Learn More
          </button>
        </div>
      </div>

      <h2 class="text-2xl font-semibold text-gray-800 mb-6">Key Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-white rounded-lg shadow p-6"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-700">{{ feature.title }}</h3>
            <component :is="feature.icon" class="h-6 w-6 text-emerald-600" />
          </div>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>

      <div class="text-center mt-12 text-gray-500 text-sm">
        <p>Spendly v1.0.0</p>
        <p class="mt-1">© {{ new Date().getFullYear() }} Spendly. All rights reserved.</p>
      </div>
    </main>
  </div>
</template>
