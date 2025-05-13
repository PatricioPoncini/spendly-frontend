<script setup lang="ts">
import { ref, reactive } from 'vue'
import { WalletIcon, AtSignIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user.store'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const showPassword = ref(false)
const isLoading = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  userName: '',
  password: '',
})

const handleSubmit = async () => {
  isLoading.value = true
  await userStore.register(form)

  toast.success('Account created successfully!')

  clearForm()

  setTimeout(() => {
    router.push('/login')
  }, 2000)
}

const clearForm = () => {
  form.firstName = ''
  form.lastName = ''
  form.userName = ''
  form.password = ''
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md z-50 relative">
      <div class="p-6 border-b text-center">
        <div class="flex justify-center items-center mb-2">
          <wallet-icon class="h-8 w-8 text-emerald-600" />
          <h1 class="text-2xl font-bold ml-2">Spendly</h1>
        </div>
        <p class="text-gray-500">Create your account</p>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="grid gap-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label for="firstName" class="text-sm font-medium"> First Name </label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                placeholder="John"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div class="space-y-2">
              <label for="lastName" class="text-sm font-medium"> Last Name </label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                placeholder="Doe"
                class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <label for="username" class="text-sm font-medium"> Username </label>
            <div class="relative">
              <at-sign-icon
                class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              />
              <input
                id="userName"
                v-model="form.userName"
                type="text"
                placeholder="johndoe"
                class="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <p class="text-xs text-gray-500">This will be your unique identifier on Spendly</p>
          </div>

          <div class="space-y-2">
            <label for="password" class="text-sm font-medium"> Password </label>
            <div class="relative">
              <lock-icon
                class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              />
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
                minlength="8"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <eye-icon v-if="!showPassword" class="h-4 w-4 text-gray-400" />
                <eye-off-icon v-else class="h-4 w-4 text-gray-400" />
              </button>
            </div>
            <p class="text-xs text-gray-500">Must be at least 8 characters</p>
          </div>

          <button
            :disabled="isLoading"
            type="submit"
            class="font-semibold w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <span v-if="!isLoading">Register</span>

            <div class="flex items-center justify-center pointer-events-none" role="status" v-else>
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin fill-green-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            </div>
          </button>

          <div class="text-sm text-center text-gray-500">
            Already have an account?
            <router-link to="/login" class="font-medium text-emerald-600 hover:underline">
              Sign in
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
