<template>
  <div class="bg-gray-900-spotify flex flex-col items-center h-screen">
    <form class="w-full max-w-sm my-40 items-center">
      <div class="flex items-center border-b border-b-2 border-green-800 py-2">
        <i class="mr-2 fa fa-user text-gray-700-spotify"></i>
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-700-spotify mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="User..."
          v-model="payload.username"
        />
      </div>
      <div class="flex items-center border-b border-b-2 border-green-800 py-2">
        <i class="mr-2 fa fa-lock text-gray-700-spotify"></i>

        <input
          class="appearance-none bg-transparent border-none w-full text-gray-700-spotify mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="password"
          placeholder="*******"
          v-model="payload.password"
        />
      </div>
      <div class="flex flex-col items-center py-2">
        <button
          class="flex-shrink-0 border-green-900 hover:bg-green-700 text-gray-700-spotify text-sm border-2 hover:text-white py-1 px-2 rounded"
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
  import '@/assets/css/all.min.css'

  import utils from '@/assets/utils/'
  export default {
    data() {
      return {
        payload: {},
        user: {}
      }
    },
    methods: {
      async authenticate() {
        try {
          let res = await utils.auth(
            this.payload.username,
            this.payload.password
          )
          if (res.status === 200) {
            this.user = res.data
            utils.saveLocalStorage('user', this.user)
            this.$router.push({ name: 'secrets' })
          } else {
            console.log(res.status)
          }
        } catch (err) {
          console.log(err.message)
        }
      }
    }
  }
</script>
