<script setup lang="ts">
import { DollarSignIcon } from 'lucide-vue-next'
</script>

<template>
  <footer class="w-full py-12 bg-white border-t border-emerald-100">
    <div class="container px-4 md:px-6 mx-auto">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="rounded-full bg-emerald-600 p-1.5">
              <DollarSignIcon class="h-5 w-5 text-white" />
            </div>
            <span class="text-xl font-bold text-emerald-700">Spendly</span>
          </div>
          <p class="text-gray-500 text-sm mb-4">
            Your personal finance companion for smarter spending and better saving.
          </p>
        </div>
      </div>

      <div
        class="border-t border-emerald-100 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
      >
        <p class="text-sm text-gray-500">
          © {{ new Date().getFullYear() }} Spendly. All rights reserved.
        </p>
        <div class="flex space-x-4 mt-4 md:mt-0">
          <!-- TODO: Desarrollar lógica para términos de privacidad y demás -->
          <a href="#" class="text-sm text-gray-500 hover:text-emerald-600">Privacy</a>
          <a href="#" class="text-sm text-gray-500 hover:text-emerald-600">Terms</a>
          <a href="#" class="text-sm text-gray-500 hover:text-emerald-600">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>
