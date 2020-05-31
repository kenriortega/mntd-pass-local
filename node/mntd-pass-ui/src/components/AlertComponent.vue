,<template>
  <div
    :class="
      `p-2 bg-${
        notification.error === 'Unauthorized' ? 'yellow' : 'red'
      }-800 items-center text-${
        notification.error === 'Unauthorized' ? 'yellow' : 'red'
      }-100 leading-none lg:rounded-full flex lg:inline-flex`
    "
    role="alert"
  >
    <span
      :class="
        `flex rounded-full bg-${
          notification.error === 'Unauthorized' ? 'yellow' : 'red'
        }-500 uppercase px-2 py-1 text-xs font-bold mr-3`
      "
      >{{ notification.statusCode }}</span
    >
    <span class="font-semibold mr-2 text-left flex-auto">{{
      notification.message
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'AlertComponent',
  props: ['notification']
}
</script>

<style></style>
