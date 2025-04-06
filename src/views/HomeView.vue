<script setup lang="ts">
import { ArrowRightIcon, CreditCardIcon, DollarSignIcon, PieChartIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <main class="flex-1">
      <section class="w-full py-12">
        <div class="container px-4 md:px-6 mx-auto">
          <div class="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div class="flex flex-col justify-center space-y-4">
              <div class="space-y-2">
                <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Track Your Expenses with Ease
                </h1>
                <p class="max-w-[600px] text-gray-500 md:text-xl">
                  Spendly helps you manage your finances, track expenses, and save money with
                  powerful insights and simple tools.
                </p>
              </div>
              <div class="flex flex-col gap-2 min-[400px]:flex-row">
                <!-- TODO: Pasar a @click para redirigir -->
                <router-link to="/register">
                  <button
                    class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-600 text-white hover:bg-emerald-700 h-11 px-8"
                  >
                    Get Started
                    <arrow-right-icon class="ml-2 h-4 w-4" />
                  </button>
                </router-link>
                <a href="#learn-more">
                  <button
                    class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
                  >
                    Learn More
                  </button>
                </a>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <div class="relative w-full h-[350px] md:h-[400px] lg:h-[500px]">
                <img
                  src="/spendly_logo.png"
                  alt="Spendly App Dashboard"
                  class="absolute inset-0 w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="learn-more" class="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div class="container px-4 md:px-6 mx-auto">
          <div class="flex flex-col items-center justify-center space-y-4 text-center">
            <div class="space-y-2">
              <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Spendly?</h2>
              <p
                class="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              >
                Our expense tracker provides everything you need to take control of your finances.
              </p>
            </div>
          </div>
          <div class="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div class="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div class="rounded-full bg-emerald-100 p-4">
                <credit-card-icon class="h-6 w-6 text-emerald-600" />
              </div>
              <h3 class="text-xl font-bold">Expense Tracking</h3>
              <p class="text-center text-gray-500">
                Easily log and categorize your expenses to see where your money is going.
              </p>
            </div>
            <div class="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div class="rounded-full bg-emerald-100 p-4">
                <bar-chart-3-icon class="h-6 w-6 text-emerald-600" />
              </div>
              <h3 class="text-xl font-bold">Insightful Reports</h3>
              <p class="text-center text-gray-500">
                Get detailed reports and visualizations to understand your spending habits.
              </p>
            </div>
            <div class="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div class="rounded-full bg-emerald-100 p-4">
                <dollar-sign-icon class="h-6 w-6 text-emerald-600" />
              </div>
              <h3 class="text-xl font-bold">Budget Planning</h3>
              <p class="text-center text-gray-500">
                Set budgets for different categories and receive alerts when you're close to limits.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="w-full py-12 md:py-24 lg:py-32">
        <div class="container px-4 md:px-6 mx-auto">
          <div class="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div class="flex flex-col justify-center space-y-4">
              <div class="space-y-2">
                <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Powerful Analytics</h2>
                <p
                  class="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                >
                  Understand your spending patterns with our intuitive charts and graphs. Identify
                  areas where you can save and plan for your financial future.
                </p>
              </div>
              <ul class="grid gap-2 py-4">
                <li class="flex items-center gap-2">
                  <div class="rounded-full bg-emerald-100 p-1">
                    <pie-chart-icon class="h-4 w-4 text-emerald-600" />
                  </div>
                  <span class="text-gray-700">Monthly spending breakdown</span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="rounded-full bg-emerald-100 p-1">
                    <pie-chart-icon class="h-4 w-4 text-emerald-600" />
                  </div>
                  <span class="text-gray-700">Category comparison</span>
                </li>
                <li class="flex items-center gap-2">
                  <div class="rounded-full bg-emerald-100 p-1">
                    <pie-chart-icon class="h-4 w-4 text-emerald-600" />
                  </div>
                  <span class="text-gray-700">Spending trends over time</span>
                </li>
              </ul>
            </div>
            <div class="flex items-center justify-center">
              <div class="relative w-full h-[300px] md:h-[400px]">
                <img
                  src="/spendly_bar_chart_logo.png"
                  alt="Spendly Analytics Dashboard"
                  class="absolute inset-0 w-full h-full object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="w-full py-12 md:py-24 lg:py-32 bg-emerald-50">
        <div class="container px-4 md:px-6 mx-auto">
          <div class="flex flex-col items-center justify-center space-y-4 text-center">
            <div class="space-y-2">
              <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Take Control?
              </h2>
              <p
                class="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
              >
                Join thousands of users who have transformed their financial habits with Spendly.
              </p>
            </div>
            <div class="flex flex-col gap-2 min-[400px]:flex-row">
              <!-- TODO: Pasar a @click para redirigir -->
              <router-link to="/register">
                <button
                  class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-emerald-600 text-white hover:bg-emerald-700 h-11 px-8"
                >
                  Get Started Today
                  <arrow-right-icon class="ml-2 h-4 w-4" />
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
