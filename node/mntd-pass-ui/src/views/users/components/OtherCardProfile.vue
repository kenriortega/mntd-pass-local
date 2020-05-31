<template>
  <!-- component -->
  <div class="container">
    <div class="rounded rounded-t-lg overflow-hidden shadow max-w-xs my-8">
      <img src="@/assets/imgs/fondo-profile.jpg" class="w-full" />
      <div class="flex justify-center -mt-8">
        <img
          src="@/assets/imgs/user2.jpg"
          class="h-20 w-20 rounded-full border-solid border-white border-2 -mt-3"
        />
      </div>
      <div class="text-center px-3 pb-6 pt-2">
        <h3 class="text-gray-500 text-sm bold font-sans">
          <i
            class="mr-2 fa fa-lock text-gray-500 cursor-pointer"
            v-tooltip.left="text"
            @click="onShowOptions"
          ></i>
          {{ user.username }}
        </h3>
        <p class="mt-2 font-sans font-light text-gray-700">
          Craated {{ user.createdAt }}
        </p>
      </div>
      <div class="flex items-baseline pb-3 text-gray-700">
        <div class="text-center ml-3 mr-3 border-r pr-3">
          <span class="uppercase text-gray-700">role:</span>
          <h2
            class=" inline-block bg-gray-750 text-gray-700-spotify text-xs px-2 rounded-full uppercase font-semibold tracking-wide ml-2 mr-2"
          >
            {{ user.role }}
          </h2>
        </div>
        <div class="text-center">
          <div class="text-center ml-3 mr-3 pr-3">
            <span class="uppercase text-gray-700">secrets:</span>
            <h2
              class=" inline-block bg-gray-750 text-gray-700-spotify text-xs px-2 rounded-full uppercase font-semibold tracking-wide ml-2 mr-2"
            >
              {{ secrets.count }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userProfile',
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    secrets: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      text: 'Click to change password',
      isOpen: false
    }
  },
  methods: {
    onShowOptions() {
      this.isOpen = !this.isOpen
      this.$emit('show-options', this.isOpen)
    }
  }
}
</script>

<style></style>
