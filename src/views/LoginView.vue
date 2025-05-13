<script setup lang="ts">
import { useUserStore } from '@/stores/user.store'
import { AtSignIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const userStore = useUserStore()
const router = useRouter()
const showPassword = ref(false)
const isLoading = ref(false)

const form = reactive({
  userName: '',
  password: '',
})

const handleSubmit = async () => {
  isLoading.value = true
  await userStore.login(form)

  toast.success('Login successfully!')

  setTimeout(() => {
    router.push('/dashboard')
  }, 2000)
}
</script>

<template>
  <div class="pt-10 flex flex-col items-center justify-center bg-gray-50 p-4">
    <div class="flex flex-col gap-4 text-center mb-6 mt-40">
      <div class="flex flex-wrap gap-2">
        <p class="text-3xl font-semibold">Welcome to</p>
        <p class="text-green-700 text-3xl font-semibold">Spendly</p>
      </div>
      <p class="text-lg text-gray-600">Sign in into your account to continue</p>
    </div>

    <div class="bg-white rounded-lg shadow-xl w-full max-w-md z-50 relative">
      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="grid gap-6">
          <div class="space-y-2">
            <label for="username" class="text-sm font-medium text-gray-700 flex items-center">
              Username
              <span class="text-red-500 ml-1">*</span>
            </label>
            <div class="relative">
              <at-sign-icon
                class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              />
              <input
                id="userName"
                v-model="form.userName"
                type="text"
                placeholder="johndoe"
                class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div class="space-y-2">
            <label for="password" class="text-sm font-medium text-gray-700 flex items-center">
              Password
              <span class="text-red-500 ml-1">*</span>
            </label>
            <div class="relative">
              <lock-icon
                class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              />
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
          </div>

          <button
            :disabled="isLoading"
            type="submit"
            class="font-semibold w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <span v-if="!isLoading">Sign in</span>

            <div class="flex items-center justify-center pointer-events-none" role="status" v-else>
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-200 animate-spin fill-green-800"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          </button>
        </div>
      </form>
    </div>

    <div class="mt-6 text-center">
      <p class="text-xs text-gray-500 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        Secure login - Your data is protected
      </p>
    </div>
  </div>
</template>
