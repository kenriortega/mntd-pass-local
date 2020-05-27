<template>
  <div class="bg-gray-800-spotify">
    <div class="content">
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

      <h1>Page Not Found</h1>
      <router-link to="/">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notFound404'
}
</script>

<style scoped>
body,
html {
  margin: 0 auto;
  padding: 0;
  font-weight: 800;
  display: block;
}

body {
  background: #181818;
  /* font-family: cursive; */
  margin: 0 auto;
}

svg {
  font: 10.5em 'Monoton';
  width: 100vw;
  height: 100vh;
}

.content {
  text-align: center;
}

h1 {
  text-align: center;
  font: 2em 'Roboto', sans-serif;
  font-weight: bold;
  color: #2f8f7f;
  opacity: 0.6;
}

a {
  display: inline-block;
  text-transform: uppercase;
  font-size: 1em 'Roboto';
  font-weight: 300;
  border: 1px solid #2f8f7f;
  border-radius: 4px;
  color: #2f8f7f;
  margin: 20px 0;
  padding: 8px 14px;
  text-decoration: none;
  opacity: 0.6;
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
  stroke: #1c234d;
  animation-delay: -1;
}

.text:nth-child(2) {
  stroke: #315b2c;
  animation-delay: -2s;
}

.text:nth-child(3) {
  stroke: #2f8f7f;
  animation-delay: -3s;
}

.text:nth-child(4) {
  stroke: #2f8f7f;
  animation-delay: -4s;
}

.text:nth-child(5) {
  stroke: #da2717;
  animation-delay: -5s;
}

@keyframes stroke-offset {
  100% {
    stroke-dashoffset: -35%;
  }
}
</style>
