import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(!!localStorage.getItem('authToken'))

  function login(token: string) {
    localStorage.setItem('authToken', token)
    isLoggedIn.value = true
  }

  function logout() {
    localStorage.removeItem('authToken')
    isLoggedIn.value = false
  }

  return {
    isLoggedIn,
    login,
    logout,
  }
})
