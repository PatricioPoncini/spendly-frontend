<script setup lang="ts">
import { useUserStore } from '@/stores/user.store'
import { WalletIcon, AtSignIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const userStore = useUserStore()
const router = useRouter()
const showPassword = ref(false)

const form = reactive({
  userName: '',
  password: '',
})

const handleSubmit = async () => {
  await userStore.login(form)

  toast.success('Login successfully!')

  setTimeout(() => {
    router.push('/')
  }, 2000)
}
</script>

<template>
  <div class="pt-10 flex items-center justify-center bg-gray-50 p-4">
    <div class="fixed inset-0 bg-opacity-50 z-40"></div>

    <div class="bg-white rounded-lg shadow-xl w-full max-w-md z-50 relative">
      <div class="p-6 border-b text-center">
        <div class="flex justify-center items-center mb-2">
          <wallet-icon class="h-8 w-8 text-emerald-600" />
          <h1 class="text-2xl font-bold ml-2">Spendly</h1>
        </div>
        <p class="text-gray-500">Login into your account</p>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="grid gap-6">
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
          </div>

          <button
            type="submit"
            class="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
