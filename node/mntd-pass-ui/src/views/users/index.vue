<template>
  <div class="bg-gray-800-spotify flex-1  flex flex-col">
    <top-bar />
    <div class="content-spotify overflow-y-auto ">
      <div class="mx-auto container">
        <!-- <alert-component v-show="errorMSG.error" :errorMSG="errorMSG" /> -->
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
            <div class="flex flex-wrap -m-4 ">
              <div class="xl:w-2/5 md:w-1/2 p-4">
                <!-- here profile component -->
                <CardProfile2
                  class="flex flex-1"
                  :user="user"
                  :secrets="secrets"
                  @show-options="onShowOptions"
                />
                <!-- end -->
              </div>

              <!-- Info sections -->
              <div class="xl:w-1/4 md:w-1/2 p-4">
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
                    Change password. This feature will be available to change
                    your password and encrypt all secrets for better security
                  </p>
                </div>
              </div>
              <!-- end sections -->
              <!-- UpdatePassword section -->
              <div v-if="showPanel" class="xl:w-1/4 md:w-1/2 p-4">
                <!-- sections -->
                <div class="border border-gray-700-spotify p-6 rounded-lg my-8">
                  <div
                    class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800-spotify"
                  >
                    <img class="h-20 w-20" src="@/assets/imgs/creditcard.svg" />
                  </div>
                  <ValidationObserver v-slot="{ invalid }">
                    <form
                      @submit.prevent="changePassword()"
                      class="w-full max-w-sm my-8 items-center"
                    >
                      <div
                        class="flex items-center border-b border-b-2 border-green-800 py-2"
                      >
                        <i class="mr-2 fa fa-lock text-gray-500"></i>
                        <ValidationProvider
                          name="Old password"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <span class="text-red-400">{{ errors[0] }}</span>

                          <input
                            class="appearance-none bg-transparent border-none w-full text-gray-500 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="password"
                            placeholder="Old Password..."
                            v-model="payload.oldPassword"
                          />
                        </ValidationProvider>
                      </div>
                      <div
                        class="flex items-center border-b border-b-2 border-green-800 py-2"
                      >
                        <i class="mr-2 fa fa-lock text-gray-500"></i>
                        <ValidationProvider
                          name="New password"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <span class="text-red-400">{{ errors[0] }}</span>

                          <input
                            class="appearance-none bg-transparent border-none w-full text-gray-500  mr-3 py-1 px-2 leading-tight focus:outline-none"
                            type="password"
                            placeholder="New Password..."
                            v-model="payload.newPassword"
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
                          Update
                        </button>
                      </div>
                    </form>
                  </ValidationObserver>
                </div>
                <!-- end sections -->
              </div>
              <!-- end UpdatePassword section -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UtilsService, UserService } from '@/services/'

import TopBar from '@/components/TopBarComponent'
import CardProfile2 from './components/OtherCardProfile'
export default {
  name: 'profile',
  components: {
    TopBar,
    CardProfile2
  },
  data: () => ({
    notification: {},
    user: {},
    secrets: {},
    payload: {},
    showPanel: null
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
    },
    async changePassword() {
      try {
        let res = await UserService.changePassword(
          this.payload.oldPassword,
          this.payload.newPassword,
          this.user.token
        )
        if (res.status === 202) {
          this.$toaster.success(`Yours password update are ${res.data.result}`)
        }
      } catch (err) {
        this.notification = err.response.data
        this.$toaster.error(
          `Error: ${this.notification.statusCode} \n ${this.notification.error}`
        )
      }
    },
    onShowOptions(data) {
      this.showPanel = data
    }
  }
}
</script>

<style></style>
