<template>
  <section class="text-gray-500 body-font bg-gray-800-spotify">
    <div class="container px-5 py-24 mx-auto">
      <div
        class="flex flex-wrap w-full mb-20 flex-col items-center text-center"
      ></div>
      <div class="flex flex-wrap -m-4">
        <div class="xl:w-1/3 md:w-1/2 p-4"></div>

        <div class="xl:w-1/3 md:w-1/2 p-4">
          <div
            class="border border-gray-700-spotify max-w-sm mx-auto bg-gray-800-spotify shadow-lg rounded-lg overflow-hidden"
          >
            <div class="sm:flex sm:items-center items-center px-6 py-4">
              <img
                class="w-20 h-20 block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 sm:h-24 rounded-full"
                src="@/assets/imgs/twitter.svg"
                alt="computer"
              />
              <div class="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                <p class="text-center text-xl leading-tight">
                  <i class="fa fa-user text-green-700"></i>
                  {{ user.fullName }}
                </p>

                <p class="text-center text-sm leading-tight text-gray-600">
                  <i class="fa fa-clock text-green-700"></i>
                  {{ user.createdAt }}
                </p>
                <p class="text-center text-sm leading-tight text-gray-600">
                  <i class="fa fa-cogs text-green-700"></i>
                  {{ user.role }}
                </p>
                <div class="mt-4">
                  <button
                    class="text-green-500 hover:text-white hover:bg-green-500 border border-green-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="xl:w-1/3 md:w-1/2 p-4"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'userProfile',
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped></style>
