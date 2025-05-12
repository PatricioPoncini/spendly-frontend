<script setup lang="ts">
import {
  ArrowRightIcon,
  CreditCardIcon,
  DollarSignIcon,
  PieChartIcon,
  BarChart3Icon,
  CheckCircleIcon,
  TrendingUpIcon,
} from 'lucide-vue-next'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white">
    <main class="flex-1">
      <section class="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
        <div class="absolute inset-0 -z-10 overflow-hidden">
          <div
            class="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-100 opacity-50 blur-3xl"
          ></div>
          <div
            class="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-emerald-200 opacity-30 blur-3xl"
          ></div>
        </div>

        <div class="container px-4 md:px-6 mx-auto">
          <div
            class="grid gap-8 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center"
          >
            <div class="flex flex-col justify-center space-y-6">
              <div class="space-y-4">
                <h1
                  class="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900"
                >
                  Track Your Expenses <span class="text-emerald-600">with Ease</span>
                </h1>
                <p class="max-w-[600px] text-gray-600 md:text-xl leading-relaxed">
                  Spendly helps you manage your finances, track expenses, and save money with
                  powerful insights and simple tools designed for your financial success.
                </p>
              </div>

              <div class="flex flex-col gap-3 min-[400px]:flex-row">
                <router-link to="/register">
                  <button
                    class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 bg-emerald-600 text-white hover:bg-emerald-700 h-11 px-8 shadow-md transform hover:translate-y-[-2px]"
                  >
                    Get Started
                    <ArrowRightIcon class="ml-2 h-4 w-4" />
                  </button>
                </router-link>
                <a
                  href="#features"
                  class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 border border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50 h-11 px-8"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div
                class="relative w-full h-[350px] md:h-[400px] lg:h-[500px] transform transition-all hover:scale-[1.02]"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white rounded-2xl -z-10"
                ></div>
                <img
                  src="/spendly_logo.png"
                  alt="Spendly App Dashboard"
                  class="absolute inset-0 w-full h-full object-contain p-6 rounded-xl"
                />
                <div
                  class="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-emerald-100 -z-20"
                ></div>
                <div
                  class="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-emerald-200 -z-20"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        class="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-emerald-50"
      >
        <div class="container px-4 md:px-6 mx-auto">
          <div class="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
              Features You'll <span class="text-emerald-600">Love</span>
            </h2>
            <p class="max-w-[800px] text-gray-600 md:text-xl/relaxed">
              Our expense tracker provides everything you need to take control of your finances and
              achieve your financial goals.
            </p>
          </div>

          <div class="mx-auto grid max-w-5xl items-center gap-8 py-8 md:grid-cols-2 lg:grid-cols-3">
            <div
              class="group flex flex-col items-center space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-emerald-200"
            >
              <div
                class="rounded-full bg-emerald-100 p-4 group-hover:bg-emerald-200 transition-colors"
              >
                <CreditCardIcon class="h-6 w-6 text-emerald-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900">Expense Tracking</h3>
              <p class="text-center text-gray-600">
                Easily log and categorize your expenses to see where your money is going with
                intuitive interfaces.
              </p>
              <ul class="mt-2 space-y-2 text-sm text-gray-500">
                <li class="flex items-center">
                  <CheckCircleIcon class="mr-2 h-4 w-4 text-emerald-500" />
                  <span>Automatic categorization</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="mr-2 h-4 w-4 text-emerald-500" />
                  <span>Receipt scanning</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="mr-2 h-4 w-4 text-emerald-500" />
                  <span>Multiple currencies</span>
                </li>
              </ul>
            </div>

            <div
              class="group flex flex-col items-center space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-emerald-200"
            >
              <div
                class="rounded-full bg-emerald-100 p-4 group-hover:bg-emerald-200 transition-colors"
              >
                <BarChart3Icon class="h-6 w-6 text-emerald-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900">Insightful Reports</h3>
              <p class="text-center text-gray-600">
                Get detailed reports and visualizations to understand your spending habits and
                patterns.
              </p>
              <ul class="mt-2 space-y-2 text-sm text-gray-500">
                <li class="flex items-center">
                  <CheckCircleIcon class="mr-2 h-4 w-4 text-emerald-500" />
                  <span>Interactive charts</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="mr-2 h-4 w-4 text-emerald-500" />
                  <span>Monthly comparisons</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="mr-2 h-4 w-4 text-emerald-500" />
                  <span>Exportable data</span>
                </li>
              </ul>
            </div>

            <div
              class="group flex flex-col items-center space-y-4 rounded-xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-emerald-200"
            >
              <div
                class="rounded-full bg-emerald-100 p-4 group-hover:bg-emerald-200 transition-colors"
              >
                <DollarSignIcon class="h-6 w-6 text-emerald-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900">Budget Planning</h3>
              <p class="text-center text-gray-600">
                Set budgets for different categories and receive alerts when you're close to limits.
              </p>
              <ul class="mt-2 space-y-2 text-sm text-gray-500">
                <li class="flex items-center">
                  <CheckCircleIcon class="mr-2 h-4 w-4 text-emerald-500" />
                  <span>Custom budget periods</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="mr-2 h-4 w-4 text-emerald-500" />
                  <span>Smart notifications</span>
                </li>
                <li class="flex items-center">
                  <CheckCircleIcon class="mr-2 h-4 w-4 text-emerald-500" />
                  <span>Goal tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="analytics" class="w-full py-16 md:py-24 lg:py-32">
        <div class="container px-4 md:px-6 mx-auto">
          <div class="grid gap-12 lg:grid-cols-2 items-center">
            <div class="flex flex-col justify-center space-y-6">
              <div class="space-y-4">
                <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
                  Powerful <span class="text-emerald-600">Analytics</span>
                </h2>
                <p class="max-w-[600px] text-gray-600 md:text-xl/relaxed">
                  Understand your spending patterns with our intuitive charts and graphs. Identify
                  areas where you can save and plan for your financial future with confidence.
                </p>
              </div>

              <ul class="grid gap-4 py-4">
                <li class="flex items-start gap-3">
                  <div class="rounded-full bg-emerald-100 p-1.5 mt-0.5">
                    <PieChartIcon class="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">Monthly spending breakdown</h4>
                    <p class="text-sm text-gray-500">
                      See exactly where your money goes each month with detailed category
                      breakdowns.
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="rounded-full bg-emerald-100 p-1.5 mt-0.5">
                    <BarChart3Icon class="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">Category comparison</h4>
                    <p class="text-sm text-gray-500">
                      Compare spending across categories to identify opportunities for savings.
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div class="rounded-full bg-emerald-100 p-1.5 mt-0.5">
                    <TrendingUpIcon class="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">Spending trends over time</h4>
                    <p class="text-sm text-gray-500">
                      Track how your spending habits evolve over weeks, months, and years.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="flex items-center justify-center">
              <div
                class="relative w-full h-[350px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-[1.02]"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white -z-10"
                ></div>

                <img
                  src="/spendly_bar_chart_logo.png"
                  alt="Spendly Analytics Dashboard"
                  class="absolute inset-0 w-full h-full object-contain p-4"
                />

                <div
                  class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(236,253,245,0.8),transparent_70%)]"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white"
      >
        <div class="container px-4 md:px-6 mx-auto">
          <div
            class="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto"
          >
            <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Take Control?</h2>
            <p class="max-w-[600px] text-emerald-100 md:text-xl/relaxed">
              Join thousands of users who have transformed their financial habits with Spendly. Sign
              up today and start taking control of your finances.
            </p>

            <div class="flex flex-col gap-3 min-[400px]:flex-row">
              <router-link to="/register">
                <button
                  class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white bg-white text-emerald-700 hover:bg-emerald-50 h-12 px-8 shadow-md"
                >
                  Get Started Today
                  <ArrowRightIcon class="ml-2 h-4 w-4" />
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </main>

    <FooterComponent />
  </div>
</template>

<style>
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

html {
  scroll-behavior: smooth;
}

:focus {
  outline: 2px solid rgba(16, 185, 129, 0.5);
  outline-offset: 2px;
}

a,
button {
  transition: all 0.2s ease;
}
</style>
