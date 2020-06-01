<template>
  <div class="bg-gray-900-spotify flex flex-col items-center h-screen">
    <ValidationObserver v-slot="{ invalid }">
      <form
        @submit.prevent="signUp()"
        class="w-full max-w-sm my-40 items-center"
      >
        <div class="flex flex-col items-center py-2">
          <alert-component
            v-show="notification.error"
            :notification="notification"
          />
        </div>
        <div
          class="flex items-center border-b border-b-2 border-green-800 py-2"
        >
          <i class="mr-2 fa fa-user text-gray-500"></i>
          <ValidationProvider
            name="Username"
            rules="required"
            v-slot="{ errors }"
          >
            <span class="text-red-400">{{ errors[0] }}</span>
            <input
              class="appearance-none bg-transparent border-none w-full text-gray-500 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="User..."
              v-model="payload.username"
            />
          </ValidationProvider>
        </div>
        <div
          class="flex items-center border-b border-b-2 border-green-800 py-2"
        >
          <i class="mr-2 fa fa-lock text-gray-500"></i>
          <ValidationProvider
            name="password"
            rules="required"
            v-slot="{ errors }"
          >
            <span class="text-red-400">{{ errors[0] }}</span>
            <input
              class="appearance-none bg-transparent border-none w-full text-gray-500  mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="password"
              placeholder="*******"
              v-model="payload.password"
            />
          </ValidationProvider>
        </div>
        <div
          class="flex items-center border-b border-b-2 border-green-800 py-2"
        >
          <i class="mr-2 fa fa-check text-gray-500"></i>
          <ValidationProvider
            name="passwordConfirm"
            rules="required"
            v-slot="{ errors }"
          >
            <span class="text-red-400">{{ errors[0] }}</span>
            <input
              class="appearance-none bg-transparent border-none w-full text-gray-500  mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="password"
              placeholder="*******"
              v-model="payload.confirmPassword"
            />
          </ValidationProvider>
        </div>
        <div class="flex flex-col items-center py-2">
          <button
            :disabled="invalid"
            :class="
              `text-green-500 hover:text-white hover:bg-green-500 border border-green-500 text-xs font-semibold rounded-full mt-3 px-4 py-1 leading-normal ${
                invalid ? 'cursor-not-allowed opacity-50' : ''
              }`
            "
            type="submit"
          >
            Sign Up
          </button>
          <router-link
            to="/"
            class="text-gray-500 mr-3 py-1 px-2 leading-tight focus:outline-none"
            >{{ question }}</router-link
          >
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import AlertComponent from '@/components/AlertComponent'
import { UserService } from '@/services/'

export default {
  name: 'login',
  components: {
    AlertComponent
  },
  data() {
    return {
      payload: {},
      user: {},
      notification: {},
      question: 'Already have an account? Sign In'
    }
  },
  methods: {
    async signUp() {
      try {
        if (this.payload.password !== this.payload.confirmPassword) {
          this.notification = {
            error: 'Password not match',
            message: 'password not match',
            statusCode: 500
          }
          this.payload = {}
        } else {
          let res = await UserService.signUp(
            this.payload.username,
            this.payload.password
          )
          this.user = res.data
          this.$router.push({ name: 'login' })
        }
      } catch (err) {
        this.notification = err.response.data
      }
    }
  }
}
</script>
