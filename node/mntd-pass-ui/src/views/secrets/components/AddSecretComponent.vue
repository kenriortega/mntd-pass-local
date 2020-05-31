<template>
  <div class="border border-gray-700-spotify p-6 rounded-lg my-8 items-center">
    <div
      class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-gray-800-spotify"
    >
      <img class="h-20 w-20" src="@/assets/imgs/creditcard.svg" />
    </div>
    <ValidationObserver v-slot="{ invalid }">
      <form
        @submit.prevent="createScret"
        class="w-full max-w-sm my-8 items-center"
      >
        <div
          class="flex items-center border-b border-b-2 border-green-800 py-2"
        >
          <i class="mr-2 fa fa-book text-gray-500"></i>
          <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
            <span class="text-red-400">{{ errors[0] }}</span>

            <input
              class="appearance-none bg-transparent border-none w-full text-gray-500 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Name..."
              v-model="payload.name"
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
              placeholder="Value..."
              v-model="payload.value"
            />
          </ValidationProvider>
        </div>
        <div class="flex items-center py-2">
          <i class="mr-2 fa fa-list text-gray-500"></i>
          <ValidationProvider
            name="New password"
            rules="required"
            v-slot="{ errors }"
          >
            <span class="text-red-400">{{ errors[0] }}</span>

            <label class="block mt-4">
              <span class="text-gray-700">Categories</span>
              <select
                class="w-full mt-1 bg-gray-800-spotify border-transparent"
                v-model="payload.category"
              >
                <option class="uppercase">Personal</option>
                <option class="uppercase">Payments</option>
                <option class="uppercase">Servers</option>
                <option class="uppercase">Services</option>
              </select>
            </label>
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
            Create
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'createSecret',
  data() {
    return { payload: {} }
  },
  methods: {
    createScret() {
      this.$emit('cretate-secret', this.payload)
    }
  }
}
</script>

<style></style>
