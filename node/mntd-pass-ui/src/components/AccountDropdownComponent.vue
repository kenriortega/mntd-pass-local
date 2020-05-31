<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="relative z-10 block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-700-spotify focus:outline-none focus:border-white"
    >
      <img
        class="h-full w-full object-cover"
        src="@/assets/imgs/user2.jpg"
        alt=""
      />
    </button>
    <button
      v-if="isOpen"
      @click="isOpen = false"
      tabindex="-1"
      class="fixed inset-0 h-full w-full bg-black opacity-50 cursor-default"
    ></button>
    <div
      v-if="isOpen"
      class="absolute right-0 mt-1 py-2 w-48 bg-gray-900-spotify rounded-lg shadow-xl"
    >
      <router-link
        :to="{ name: 'profile' }"
        class="block px-4 py-2 text-gray-700-spotify rounded hover:bg-green-900 hover:text-white"
      >
        <i class="mr-2 fa fa-user"></i>Profile</router-link
      >

      <a
        href="#"
        class="block px-4 py-2 text-gray-700-spotify rounded hover:bg-green-900 hover:text-white"
        @click="logout()"
      >
        <i class="mr-2 fa fa-sign-out-alt"></i>Log out</a
      >
    </div>
  </div>
</template>

<script>
import { UtilsService } from '@/services/'

import ROUTES from '@/constant/routes'
export default {
  name: 'account-dropdown',

  data() {
    return {
      isOpen: false,
      user: {}
    }
  },
  mounted() {
    this.getUserFromLocalStorage()
  },
  created() {
    const handleEsc = e => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false
      }
    }
    document.addEventListener('keydown', handleEsc)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleEsc)
    })
  },
  methods: {
    logout() {
      window.localStorage.clear()
      this.$router.push({ name: ROUTES.LOGIN.name })
    },

    getUserFromLocalStorage() {
      this.user = UtilsService.getItemStorage('user')
    }
  }
}
</script>

<style></style>
