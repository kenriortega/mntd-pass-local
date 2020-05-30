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
          <div
            class="flex flex-wrap w-full mb-20 flex-col  items-center text-center"
          >
            <div class="flex flex-wrap -m-4 justify-between">
              <div class="xl:w-2/5 md:w-1/2 p-4">
                <!-- here profile component -->
                <CardProfile2
                  class="flex flex-1"
                  :user="user"
                  :secrets="secrets"
                />
                <!-- end -->
              </div>

              <div class="xl:w-2/5 md:w-1/2 p-4">
                <!-- sections -->
                <div class="border border-gray-700-spotify p-6 rounded-lg my-8">
                  <div
                    class="w-32 h-32 inline-flex items-center justify-center rounded-full bg-gray-800-spotify mb-4"
                  >
                    <img class="h-32 w-32" src="@/assets/imgs/creditcard.svg" />
                  </div>
                  <h2
                    class="text-lg text-white font-medium title-font mb-2 text-gray-700 hover:text-gray-300"
                  >
                    Update password
                  </h2>
                  <p class="leading-relaxed text-base text-gray-700">
                    Change password. This feat will be to change your password
                    and encrypt all secrets for better security
                  </p>
                </div>
                <!-- end sections -->
              </div>
            </div>
          </div>
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
    user: {},
    secrets: []
  }),
  mounted() {
    this.getUserFromLocalStorage()
    this.getSecretsFromLocalStorage()
  },
  methods: {
    getUserFromLocalStorage() {
      this.user = UtilsService.getItemStorage('user')
    },
    getSecretsFromLocalStorage() {
      this.secrets = UtilsService.getItemStorage(
        `secrets_by_${this.user.username}`
      )
    }
  }
}
</script>

<style></style>
