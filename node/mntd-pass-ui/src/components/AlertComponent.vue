,<template>
  <div
    :class="
      `p-2 bg-${
        errorMSG.error === 'Unauthorized' ? 'yellow' : 'red'
      }-800 items-center text-${
        errorMSG.error === 'Unauthorized' ? 'yellow' : 'red'
      }-100 leading-none lg:rounded-full flex lg:inline-flex`
    "
    role="alert"
  >
    <span
      :class="
        `flex rounded-full bg-${
          errorMSG.error === 'Unauthorized' ? 'yellow' : 'red'
        }-500 uppercase px-2 py-1 text-xs font-bold mr-3`
      "
      >{{ errorMSG.statusCode }}</span
    >
    <span class="font-semibold mr-2 text-left flex-auto">{{
      errorMSG.message
    }}</span>
  </div>
  <!-- <div
    :class="
      `bg-${
        errorMSG.error === 'Unauthorized' ? 'yellow' : 'red'
      }-100 border border-${
        errorMSG.error === 'Unauthorized' ? 'yellow' : 'red'
      }-400 text-${
        errorMSG.error === 'Unauthorized' ? 'yellow' : 'red'
      }-700 px-4 py-3 rounded relative my-5`
    "
    role="alert"
  >
    <strong
      :class="
        `font-bold bg-${
          errorMSG.error === 'Unauthorized' ? 'yellow' : 'red'
        }-500 rounded-lg rounded relative m-2 p-2`
      "
      >{{ errorMSG.statusCode }}
    </strong>
    <span class="block sm:inline">{{ errorMSG.message }}</span> -->
  <!-- </div> -->
</template>

<script>
  export default {
    name: 'Alert',
    props: ['errorMSG']
  }
</script>

<style></style>
