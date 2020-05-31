<template>
  <!--  -->
  <div>
    <li class="my-2 p-2 ">
      <div
        class="border border-gray-700-spotify max-w-sm mx-auto bg-gray-800-spotify shadow-lg rounded-lg overflow-hidden"
      >
        <div class="sm:flex sm:items-center px-6 py-4">
          <div
            class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800-spotify"
          >
            <img
              class="w-20 h-20 "
              src="@/assets/imgs/profile.svg"
              alt="computer"
            />
          </div>

          <div class="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
            <p class="text-xl leading-tight">
              <i class="fa fa-lock text-green-700"></i>
              {{ secret.name }}
            </p>
            <p class="text-xl leading-tight">
              <i class="fa fa-book text-green-700"></i>
              {{ secret.category }}
            </p>
            <p class="text-sm leading-tight text-gray-600">
              <i class="fa fa-clock text-green-700"></i>
              {{ secret.createdAt }}
            </p>
            <div class="mt-4">
              <button
                v-tooltip.right-end="
                  changed === false ? 'Get Secret' : 'Copy Secret'
                "
                class="text-green-500 hover:text-white hover:bg-green-500 border border-green-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal"
                @click="
                  changed === false
                    ? getValueFromSecret(secret.name)
                    : copyToClipBoard(indice)
                "
              >
                <i
                  :class="
                    `fa fa-${
                      changed === false ? 'lock' : 'clipboard'
                    } text-green-700`
                  "
                ></i>
                {{ changed === false ? 'Get Secret' : 'Copy Secret' }}
              </button>
              <span>
                <p
                  v-if="showSecrets"
                  :class="`text-${isCoping === indice ? 'green' : 'gray'}-700`"
                >
                  {{ value }}
                </p></span
              >
              <input type="hidden" :id="`clipboard-${indice}`" :value="value" />
            </div>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import { SecretService } from '@/services/'

export default {
  name: 'Secret',
  props: ['secret', 'user', 'indice'],
  data() {
    return {
      value: '',
      isCoping: null,
      msg: null,
      changed: false,
      showSecrets: false
    }
  },
  methods: {
    async getValueFromSecret(name) {
      let { username, token } = this.user
      try {
        let res = await SecretService.getValueSecret(username, name, token)
        if (res.status === 200) {
          this.value = res.data.value
          this.changed = true
          this.showSecrets = true

          this.$toaster.success(`get value from ${name} successfully `)
        }
      } catch (err) {
        this.$emit('showError', err.response.data)
        this.changed = false
      }
    },
    copyToClipBoard(indice) {
      this.isCoping = indice
      let copyToClibBoard = document.querySelector(`#clipboard-${indice}`)
      copyToClibBoard.setAttribute('type', 'text')
      copyToClibBoard.select()
      try {
        let successful = document.execCommand('copy')
        this.msg = successful ? 'successful' : 'unsuccessful'
        this.$toaster.success(`copy ${this.msg}`)
        this.showSecrets = false
        this.changed = false

        // Migrar a toast o sweet alert
      } catch (err) {
        this.$toaster.error(`Error: To copy to clibBoard`)
      }

      /* unselect the range */
      copyToClibBoard.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    }
  }
}
</script>
