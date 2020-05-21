<template>
  <div class="bg-gray-800-spotify flex-1  flex flex-col">
    <top-bar />
    <div class="content-spotify overflow-y-auto ">
      <div class="mx-auto container">
        <alert-component v-show="errorMSG.error" :errorMSG="errorMSG" />
        <h2 class="mt-18 text-5xl font-semibold text-white">Secrets</h2>
        <div class="mt-10">
          <h3 class="font-semiblod text-sm border-b border-gray-900 pb-2">
            Hello
            <strong class="text-xl text-green-300">
              {{ user.fullName || user.username }}</strong
            >
            , you have
            <strong class="text-xl text-green-300">{{ data.count }}</strong>
            secrets in total
            <i
              :class="
                `ml-4 mr-2 cursor-pointer fa fa-${
                  showViews ? 'table' : 'address-card'
                }`
              "
              @click="showViews = !showViews"
            ></i>
          </h3>
          <div class="flex items-center mt-4 -mx-2" v-if="isHaveSecrets">
            <!-- CardView Secrets -->
            <ul v-if="showViews" class="flex flex-wrap justify-center">
              <secret
                v-for="(secret, key) in filterSecrets"
                :key="secret.name"
                :secret="secret"
                :user="user"
                :indice="key"
                @showError="showError($event)"
              />
            </ul>
            <!-- end CardView Secrets -->
            <!-- TableView  Secrets -->
            <TheTableSecrets v-else :rowsSecrets="listSecrets" />
            <!-- end TableView Secrets -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SecretService, UtilesService } from '@/services/'
import AlertComponent from '@/components/AlertComponent'
import TopBar from '@/components/TopBarComponent'
import Secret from '@/components/SecretComponent'
import TheTableSecrets from './components/TheTableSecrets'
import { bus } from '@/main.js'

export default {
  name: 'secretsContent',
  components: {
    TopBar,
    AlertComponent,
    Secret,
    TheTableSecrets
  },
  data() {
    return {
      user: {},
      data: {
        count: 0,
        data: []
      },
      filter: '',
      errorMSG: {},
      showViews: true
    }
  },
  computed: {
    listSecrets() {
      return this.data.data
    },
    filterSecrets() {
      bus.$on('filterByName', data => {
        this.filter = data
      })
      if (this.filter === 'all') {
        return this.data.data
      } else {
        return this.data.data.filter(el => el.category.match(this.filter))
      }
    },
    isHaveSecrets() {
      if (this.data.data.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  async mounted() {
    this.getUserFromLocalStorage()
    if (UtilesService.getItemStorage('secrets')) {
      this.data = UtilesService.getItemStorage('secrets')
    } else {
      this.getSecretsByUsername()
    }
  },
  methods: {
    getUserFromLocalStorage() {
      this.user = UtilesService.getItemStorage('user')
    },
    async getSecretsByUsername() {
      let { username, token } = this.user

      try {
        let res = await SecretService.getSecrets(username, token)
        if (res.status === 200) {
          this.data = res.data

          UtilesService.saveLocalStorage('secrets', this.data)
        }
      } catch (err) {
        this.errorMSG = err.response.data
      }
    },
    showError(error) {
      this.errorMSG = error
    },
    changeView() {
      this.showViews = !this.showViews
      this.data.data = UtilesService.getItemStorage('secrets')
    }
  }
}
</script>
<style lang="scss">
.content-spotify::-webkit-scrollbar {
  width: 8px;
  background-color: #181818;
}

.content-spotify::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: #535353;
}
</style>
