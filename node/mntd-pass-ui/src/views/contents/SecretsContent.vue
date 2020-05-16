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
            secrets
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
                v-for="(secret, key) in listSecrets"
                :key="secret.name"
                :secret="secret"
                :user="user"
                :indice="key"
                @showError="showError($event)"
              />
            </ul>
            <!-- end CardView Secrets -->
            <!-- TableView  Secrets -->
            <SecretsTable v-else :secrets="listSecrets" />
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
import SecretsTable from '@/components/SecretsTable'
export default {
  name: 'secretsContent',
  components: {
    TopBar,
    AlertComponent,
    Secret,
    SecretsTable
  },
  data() {
    return {
      user: {},
      data: {
        count: 0,
        data: []
      },
      errorMSG: {},
      showViews: true,
      columns: [
        {
          label: 'CreatedAt',
          field: 'createdAt',
          filterable: true
        },
        {
          label: 'Name',
          field: 'name',
          filterable: true
        },
        {
          label: 'Category',
          field: 'category',
          filterable: true
        }
      ]
    }
  },
  computed: {
    listSecrets() {
      return this.data.data
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
