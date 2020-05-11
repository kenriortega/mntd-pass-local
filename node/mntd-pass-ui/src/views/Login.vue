<template>
  <div class="bg__login flex flex-col items-center h-screen">
    <div class=" w-full max-w-xs my-40">
      <form class="bg-gray shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-white text-sm font-bold mb-2" for="username"
            >Usuario</label
          >
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            v-model="payload.username"
          />
        </div>
        <div class="mb-6">
          <label class="block text-white text-sm font-bold mb-2" for="password"
            >Password</label
          >
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            v-model="payload.password"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click.prevent="authenticate()"
          >
            Ingresar
          </button>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2020 mntd-pass-ui.
      </p>
    </div>
  </div>
</template>

<script>
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
