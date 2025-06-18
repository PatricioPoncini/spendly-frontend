<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter, useRoute } from 'vue-router'
import { Menu, X, User, Home, Info, UserPlus } from 'lucide-vue-next'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const redirectToLogin = async () => {
  closeMenu()
  if (auth.isLoggedIn) {
    auth.logout()
    await router.push('/login')
  } else {
    await router.push('/login')
  }
}

const redirectToRegister = async () => {
  closeMenu()
  await router.push('/register')
}

const isActive = (path: string) => {
  return route.path === path
}

const handleResize = () => {
  if (window.innerWidth >= 768) {
    isMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
</script>

<template>
  <nav class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center space-x-2 rtl:space-x-reverse" @click="closeMenu">
        <img src="/spendly_logo.png" class="h-10" alt="Spendly Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-gray-800"
          >Spendly</span
        >
      </a>

      <button
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        @click="toggleMenu"
        aria-controls="navbar-menu"
        :aria-expanded="isMenuOpen"
      >
        <span class="sr-only">{{ isMenuOpen ? 'Close main menu' : 'Open main menu' }}</span>
        <Menu v-if="!isMenuOpen" class="w-5 h-5" />
        <X v-else class="w-5 h-5" />
      </button>

      <div id="navbar-menu" :class="[isMenuOpen ? 'block' : 'hidden', 'w-full md:block md:w-auto']">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white"
        >
          <li v-if="auth.isLoggedIn">
            <a
              href="/dashboard"
              :class="[
                'block py-2 px-3 rounded-md',
                isActive('/dashboard')
                  ? 'text-green-700 bg-green-50 md:bg-transparent md:text-green-700 font-semibold'
                  : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700',
              ]"
              @click="closeMenu"
            >
              <div class="flex items-center gap-1.5">
                <Home class="w-4 h-4" />
                <span>Dashboard</span>
              </div>
            </a>
          </li>

          <li>
            <a
              href="/about"
              :class="[
                'block py-2 px-3 rounded-md',
                isActive('/about')
                  ? 'text-green-700 bg-green-50 md:bg-transparent md:text-green-700 font-semibold'
                  : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700',
              ]"
              @click="closeMenu"
            >
              <div class="flex items-center gap-1.5">
                <Info class="w-4 h-4" />
                <span>About</span>
              </div>
            </a>
          </li>

          <li v-if="!auth.isLoggedIn">
            <a
              @click="redirectToRegister"
              class="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 cursor-pointer"
            >
              <div class="flex items-center gap-1.5">
                <UserPlus class="w-4 h-4" />
                <span>Join now</span>
              </div>
            </a>
          </li>

          <li>
            <a
              @click="redirectToLogin"
              class="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 cursor-pointer"
            >
              <div class="flex items-center gap-1.5">
                <User class="w-4 h-4" />
                <span>{{ auth.isLoggedIn ? 'Logout' : 'Login' }}</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
