<template>
  <div class="bg-gray-800-spotify flex-1  flex flex-col">
    <top-bar />
    <div class="content-spotify overflow-y-auto ">
      <div class="mx-auto container">
        <alert-component v-show="errorMSG.error" :errorMSG="errorMSG" />
        <h2 class="mt-18 text-5xl font-semibold text-white">Profile</h2>
        <div class="mt-10">
          <h3 class="font-semiblod text-sm border-b border-gray-900 pb-2">
            <strong class="text-xl text-green-300">
              {{ user.fullName || user.username }}</strong
            >
            this is your profile...
          </h3>
          <!-- here profile component -->
          <CardProfile2 :user="user" />
          <!-- end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UtilsService } from '@/services/'

import AlertComponent from '@/components/AlertComponent'
import TopBar from '@/components/TopBarComponent'
import CardProfile2 from './components/OtherCardProfile'
export default {
  name: 'profile',
  components: {
    TopBar,
    AlertComponent,
    CardProfile2
  },
  data: () => ({
    errorMSG: {},
    user: {}
  }),
  mounted() {
    this.getUserFromLocalStorage()
  },
  methods: {
    getUserFromLocalStorage() {
      this.user = UtilsService.getItemStorage('user')
    }
  }
}
</script>

<style></style>
