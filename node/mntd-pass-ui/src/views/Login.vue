<template>
  <div class="bg-gray-900-spotify flex flex-col items-center h-screen">
    <form class="w-full max-w-sm my-40 items-center">
      <div class="flex flex-col items-center py-2">
        <alert-component v-show="errorMSG.error" :errorMSG="errorMSG" />
      </div>
      <div class="flex items-center border-b border-b-2 border-green-800 py-2">
        <i class="mr-2 fa fa-user text-gray-500"></i>
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-500 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="User..."
          v-model="payload.username"
        />
      </div>
      <div class="flex items-center border-b border-b-2 border-green-800 py-2">
        <i class="mr-2 fa fa-lock text-gray-500"></i>

        <input
          class="appearance-none bg-transparent border-none w-full text-gray-500  mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="password"
          placeholder="*******"
          v-model="payload.password"
        />
      </div>
      <div class="flex flex-col items-center py-2">
        <button
          class="text-green-500 hover:text-white hover:bg-green-500 border border-green-500 text-xs font-semibold rounded-full mt-3 px-4 py-1 leading-normal"
          type="button"
          @click.prevent="authenticate()"
        >
          Sign In
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import AlertComponent from '@/components/AlertComponent'
import { AuthService, UtilesService } from '@/services/'

export default {
  name: 'login',
  components: {
    AlertComponent
  },
  data() {
    return {
      payload: {},
      user: {},
      errorMSG: {}
    }
  },
  methods: {
    async authenticate() {
      try {
        let res = await AuthService.auth(
          this.payload.username,
          this.payload.password
        )
        this.user = res.data
        UtilesService.saveLocalStorage('user', this.user)
        this.$router.push({ name: 'secrets' })
      } catch (err) {
        this.errorMSG = err.response.data
      }
    }
  }
}
</script>
