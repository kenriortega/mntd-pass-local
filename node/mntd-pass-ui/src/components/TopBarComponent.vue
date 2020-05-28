<template>
  <div class="top-bar flex items-center justify-between px-4 py-3">
    <div class="flex items-center">
      <div class="ml-2">
        <i
          :class="
            `ml-4 mr-2 cursor-pointer fa fa-${
              showViews ? 'arrow-right' : 'arrow-left'
            }`
          "
          @click="toggleSidebar()"
        ></i>
      </div>
    </div>
    <div class="flex items-center ">
      <account-dropdown class="ml-6" />
    </div>
  </div>
</template>

<script>
import AccountDropdown from '@/components/AccountDropdownComponent'
import { bus } from '@/main.js'

export default {
  name: 'top-bar',
  components: {
    AccountDropdown
  },
  data() {
    return {
      showViews: false
    }
  },
  mounted() {},
  methods: {
    toggleSidebar() {
      this.showViews = !this.showViews
      bus.$emit('toggleSidebar', this.showViews)
    }
  }
}
</script>

<style></style>
