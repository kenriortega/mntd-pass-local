<template>
  <div class="bg-gray-800-spotify flex-1  flex flex-col">
    <top-bar />
    <div class="content-spotify overflow-y-auto ">
      <div class="mx-auto container">
        <!-- <alert-component
          v-show="notification.error"
          :notification="notification"
        /> -->
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
              v-tooltip.right="tooltips.change"
              :class="
                `ml-4 mr-2 cursor-pointer fa fa-${
                  showViews ? 'table' : 'address-card'
                }`
              "
              @click="showViews = !showViews"
            ></i>
            <i
              v-tooltip.right="tooltips.add"
              class="
                ml-4 mr-2 cursor-pointer fa fa-plus
              "
              @click="showPanelCreateSecret = !showPanelCreateSecret"
            ></i>
          </h3>

          <!-- Add secret -->
          <div class="flex flex-1 items-center mt-4 -mx-2">
            <AddSecret
              v-if="showPanelCreateSecret"
              @cretate-secret="onCreateSecret"
            />
          </div>
          <!-- end Add secret -->

          <div class="flex flex-1 items-center mt-4 -mx-2" v-if="isHaveSecrets">
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
            <TheTableSecrets
              v-else
              :rowsSecrets="listSecrets"
              :user="user"
              @showError="showError($event)"
              @delete-secret-name="onDeleteSecret"
              @edit-secret-name="onUpdateSecret"
            />
            <!-- end TableView Secrets -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SecretService, UtilsService } from '@/services/'
// import AlertComponent from '@/components/AlertComponent'
import TopBar from '@/components/TopBarComponent'
import Secret from './components/SecretComponent'
import TheTableSecrets from './components/TheTableSecrets'
import AddSecret from './components/AddSecretComponent'
import { bus } from '@/main.js'

export default {
  name: 'secretsContent',
  components: {
    TopBar,
    // AlertComponent,
    Secret,
    TheTableSecrets,
    AddSecret
  },
  data() {
    return {
      user: {},
      data: {
        count: 0,
        data: []
      },
      tooltips: {
        add: 'Add new Secret',
        change: 'Change visualizations'
      },
      filter: '',
      notification: {},
      showViews: true,
      showPanelCreateSecret: false
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
    let { username } = this.user

    if (UtilsService.getItemStorage(`secrets_by_${username}`)) {
      this.data = UtilsService.getItemStorage(`secrets_by_${username}`)
      this.$toaster.info('Load secrets Data from a localStorage.')
    } else {
      this.getSecretsByUsername()
    }
  },
  watch: {
    data: function() {
      UtilsService.saveLocalStorage(
        `secrets_by_${this.user.username}`,
        this.data
      )
    }
  },
  methods: {
    getUserFromLocalStorage() {
      this.user = UtilsService.getItemStorage('user')
    },
    async getSecretsByUsername() {
      let { username, token } = this.user

      try {
        let res = await SecretService.getSecrets(username, token)
        if (res.status === 200) {
          this.data = res.data
          this.$toaster.success('Load secrets Data from a server.')

          UtilsService.saveLocalStorage(`secrets_by_${username}`, this.data)
        }
      } catch (err) {
        this.notification = err.response.data
        this.$toaster.error(
          `Error: ${this.notification.statusCode} \n ${this.notification.type}`
        )
      }
    },
    showError(error) {
      this.notification = error
      this.$toaster.error(
        `Error: ${this.notification.statusCode}\n
        Type: ${this.notification.error}\n  ${this.notification.message}`
      )
    },
    changeView() {
      this.showViews = !this.showViews
      this.data.data = UtilsService.getItemStorage(
        `secrets_by_${this.user.username}`
      )
    },
    async onDeleteSecret(name) {
      let { username, token } = this.user
      try {
        let res = await SecretService.deleteSecretByName(username, name, token)
        if (res.status === 200) {
          if (res.data.result === 1) {
            this.$toaster.success(`${name} was deleted`)
            await this.getSecretsByUsername()
          } else {
            this.$toaster.warning(`${name} was not deleted`)
          }
        }
      } catch (err) {
        this.notification = err.response.data
        this.$toaster.error(
          `Error: ${this.notification.statusCode} \n ${this.notification.error}`
        )
      }
    },
    async onUpdateSecret({ value, name }) {
      let { username, token } = this.user
      try {
        let res = await SecretService.updateSecretByName(
          username,
          name,
          value,
          token
        )
        if (res.status === 200) {
          if (res.data.result[0] === 0) {
            this.$toaster.warning(`${name} was not updated`)
          } else {
            this.$toaster.success(`${name} was updated`)
          }
        }
      } catch (err) {
        this.notification = err.response.data
        this.$toaster.error(
          `Error: ${this.notification.statusCode} \n ${this.notification.error}`
        )
      }
    },
    async onCreateSecret({ category, name, value }) {
      let { username, token } = this.user
      name = name.replace(' ', '_') // check this ok
      category = category.toLowerCase()
      try {
        let res = await SecretService.createSecret(
          username,
          name,
          value,
          category,
          token
        )
        if (res.status === 201) {
          await this.getSecretsByUsername()
          this.$toaster.success('Create secret.')
        }
      } catch (err) {
        this.notification = err.response.data
        this.$toaster.error(
          `Error: ${this.notification.statusCode} \n ${this.notification.error}`
        )
      }
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
