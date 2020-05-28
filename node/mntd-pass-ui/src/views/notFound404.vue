<template>
  <div class="flex flex-col h-screen text-sm text-gray-400 bg-gray-800-spotify">
    <div class="w-full flex flex-col items-center relative">
      <div class="my-2 absolute items-center">
        <h1 class="text-xl text-green-500">Page Not Found</h1>
        <button
          class="items-center text-green-500 hover:text-white hover:bg-green-500 border border-green-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal"
          @click="goBack()"
        >
          Back to Home
        </button>
      </div>
      <div class="flex-1 items-center">
        <svg viewBox="0 0 960 300">
          <symbol id="s-text">
            <text text-anchor="middle" x="50%" y="50%">404</text>
          </symbol>

          <g class="g-ants">
            <use xlink:href="#s-text" class="text"></use>
            <use xlink:href="#s-text" class="text"></use>
            <use xlink:href="#s-text" class="text"></use>
            <use xlink:href="#s-text" class="text"></use>
            <use xlink:href="#s-text" class="text"></use>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notFound404',
  methods: {
    goBack() {
      this.$router.push({ name: 'secrets' })
    }
  }
}
</script>

<style scoped>
svg {
  font: 10.5em 'Monoton';
  width: 100vw;
  height: 100vh;
}

.text {
  fill: none;
  stroke: white;
  stroke-dasharray: 8% 29%;
  stroke-width: 5px;
  stroke-dashoffset: 1%;
  animation: stroke-offset 5.5s infinite linear;
}

.text:nth-child(1) {
  stroke: #38a169;
  animation-delay: -1;
}

.text:nth-child(2) {
  stroke: #38a169;
  animation-delay: -2s;
}

.text:nth-child(3) {
  stroke: #68d391;
  animation-delay: -3s;
}

.text:nth-child(4) {
  stroke: #68d391;
  animation-delay: -4s;
}

.text:nth-child(5) {
  stroke: #c6f6d5;
  animation-delay: -5s;
}

@keyframes stroke-offset {
  100% {
    stroke-dashoffset: -35%;
  }
}
</style>
