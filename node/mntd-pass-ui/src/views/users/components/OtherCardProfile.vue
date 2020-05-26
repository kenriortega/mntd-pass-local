<template>
  <!-- component -->
  <div class="container">
    <div class="rounded rounded-t-lg overflow-hidden shadow max-w-xs my-3">
      <img src="https://i.imgur.com/dYcYQ7E.png" class="w-full" />
      <div class="flex justify-center -mt-8">
        <img
          src="@/assets/imgs/user2.jpg"
          class="h-20 w-20 rounded-full border-solid border-white border-2 -mt-3"
        />
      </div>
      <div class="text-center px-3 pb-6 pt-2">
        <h3 class="text-gray-500 text-sm bold font-sans">
          {{ user.username }}
        </h3>
        <p class="mt-2 font-sans font-light text-grey-dark">
          Created at {{ user.createdAt }}
        </p>
      </div>
      <div class="flex justify-center pb-3 text-grey-dark">
        <div class="text-center mr-3 border-r pr-3">
          <h2>worker</h2>
          <span>role</span>
        </div>
        <div class="text-center">
          <h2>42</h2>
          <span>secrets</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userProfile2',
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style></style>
