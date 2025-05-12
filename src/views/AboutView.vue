<script setup lang="ts">
import { ref } from 'vue'
import {
  DollarSignIcon,
  BarChart3Icon,
  TagIcon,
  UsersIcon,
  TrendingUpIcon,
  ShieldIcon,
  ArrowRightIcon,
} from 'lucide-vue-next'
import FooterComponent from '@/components/FooterComponent.vue'

const features = ref([
  {
    title: 'Expense Tracking',
    description: 'Easily record and categorize all your expenses in one place.',
    icon: DollarSignIcon,
  },
  {
    title: 'Monthly Reports',
    description: 'Get detailed insights about your spending habits with monthly breakdowns.',
    icon: BarChart3Icon,
  },
  {
    title: 'Category Management',
    description:
      'Organize expenses with customizable categories to better understand your spending.',
    icon: TagIcon,
  },
])

const values = ref([
  {
    title: 'Simplicity',
    description: 'We believe financial tools should be easy to use and understand.',
    icon: UsersIcon,
  },
  {
    title: 'Transparency',
    description: 'We are committed to being clear about how we use your data.',
    icon: ShieldIcon,
  },
  {
    title: 'Growth',
    description: 'We continuously improve our platform based on user feedback.',
    icon: TrendingUpIcon,
  },
])
</script>

<template>
  <div class="min-h-screen bg-white">
    <section class="relative w-full py-16 md:py-24 overflow-hidden">
      <div class="absolute inset-0 -z-10 overflow-hidden">
        <div
          class="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-100 opacity-50 blur-3xl"
        ></div>
        <div
          class="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-200 opacity-30 blur-3xl"
        ></div>
      </div>

      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl mb-6">
            About <span class="text-emerald-600">Spendly</span>
          </h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your personal finance companion designed to help you track, manage, and optimize your
            expenses for a better financial future.
          </p>
        </div>
      </div>
    </section>

    <section class="w-full py-12 md:py-16 bg-gradient-to-b from-white to-emerald-50">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="bg-white rounded-xl shadow-sm border border-emerald-100 p-8 md:p-10 relative overflow-hidden"
        >
          <div class="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-emerald-100 -z-10"></div>
          <div class="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-emerald-200 -z-10"></div>

          <div class="max-w-3xl mx-auto">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p class="text-gray-600 text-lg mb-8 leading-relaxed">
              We believe that
              <span class="text-emerald-600 font-medium"
                >financial clarity leads to financial freedom</span
              >. Our mission is to provide a simple yet powerful tool that helps you understand your
              spending habits, make informed decisions, and achieve your financial goals.
            </p>
            <p class="text-gray-600 text-lg mb-8 leading-relaxed">
              At Spendly, we're committed to making personal finance management accessible to
              everyone, regardless of their financial background or expertise.
            </p>
            <div class="flex justify-center">
              <button
                class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 bg-emerald-600 text-white hover:bg-emerald-700 h-11 px-8 shadow-md transform hover:translate-y-[-2px]"
              >
                Learn More
                <ArrowRightIcon class="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full py-16 md:py-24">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl mb-6">
            Key <span class="text-emerald-600">Features</span>
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Discover the powerful tools that make Spendly the perfect companion for your financial
            journey.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="group flex flex-col rounded-xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-emerald-200"
          >
            <div
              class="rounded-full bg-emerald-100 p-4 w-14 h-14 flex items-center justify-center group-hover:bg-emerald-200 transition-colors mb-5"
            >
              <component :is="feature.icon" class="h-6 w-6 text-emerald-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600 flex-1">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="w-full py-16 md:py-24 bg-gradient-to-b from-emerald-50 to-white">
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl mb-6">
            Our <span class="text-emerald-600">Values</span>
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            The core principles that guide everything we do at Spendly.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div
            v-for="value in values"
            :key="value.title"
            class="group flex flex-col rounded-xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-emerald-200"
          >
            <div
              class="rounded-full bg-emerald-100 p-4 w-14 h-14 flex items-center justify-center group-hover:bg-emerald-200 transition-colors mb-5"
            >
              <component :is="value.icon" class="h-6 w-6 text-emerald-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ value.title }}</h3>
            <p class="text-gray-600 flex-1">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section
      class="w-full py-16 md:py-24 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white"
    >
      <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto"
        >
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">
            Ready to Take Control of Your Finances?
          </h2>
          <p class="max-w-[600px] text-emerald-100 md:text-xl/relaxed">
            Start your financial journey with Spendly today and discover a new way to manage your
            expenses.
          </p>

          <div class="flex flex-col gap-3 min-[400px]:flex-row">
            <a href="/register">
              <button
                class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white bg-white text-emerald-700 hover:bg-emerald-50 h-12 px-8 shadow-md"
              >
                Get Started
                <ArrowRightIcon class="ml-2 h-4 w-4" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>

    <FooterComponent />
  </div>
</template>

<style scoped>
:focus {
  outline: 2px solid rgba(16, 185, 129, 0.5);
  outline-offset: 2px;
}

a,
button {
  transition: all 0.2s ease;
}
</style>
