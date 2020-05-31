<template>
  <div class="bg-gray-900-spotify flex flex-col items-center h-screen">
    <ValidationObserver v-slot="{ invalid }">
      <form
        @submit.prevent="authenticate"
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
            Sign In
          </button>
          <router-link
            to="/signup"
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
import { AuthService, UtilsService } from '@/services/'
import moment from 'moment'
moment.locale('en')

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
      question: `Don't have an account? Create one`
    }
  },
  methods: {
    async authenticate() {
      try {
        let res = await AuthService.auth(
          this.payload.username,
          this.payload.password
        )
        res.data.createdAt = moment(res.data.createdAt).fromNow()
        this.user = res.data
        UtilsService.saveLocalStorage('user', this.user)
        this.$router.push({ name: 'secrets' })
      } catch (err) {
        this.notification = err.response.data
      }
    }
  }
}
</script>
