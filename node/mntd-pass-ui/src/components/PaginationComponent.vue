<template>
  <div class="pagination">
    <div class="pagination__show" v-if="!tableShow.showdata">
      <span class="">
        {{ pagination.from }} - {{ pagination.to }} of
        {{ pagination.total }}
      </span>
      <a
        v-if="pagination.prevPageUrl"
        class="btn__pagination-previous"
        @click="--pagination.currentPage"
        >Prev</a
      >
      <a class="btn__pagination-previouds" v-else disabled>Prev</a>
      <a
        v-if="pagination.nextPageUrl"
        class="btn__pagination-next"
        @click="++pagination.currentPage"
        >Next</a
      >
      <a class="btn__pagination-nextd" v-else disabled>Next</a>
    </div>
    <div class="pagination__show" v-else>
      <span class="">
        {{ pagination.from }} - {{ pagination.to }} of
        {{ filteredSecrets.length }}
        <span v-if="`filteredSecrets.length < pagination.total`"></span>
      </span>
      <a
        v-if="pagination.prevPage"
        class="btn__pagination-previous"
        @click="--pagination.currentPage"
        >Prev</a
      >
      <a class="btn__pagination-previousd" v-else disabled>Prev</a>
      <a
        v-if="pagination.nextPage"
        class="btn__pagination-next"
        @click="++pagination.currentPage"
        >Next</a
      >
      <a class="btn__pagination-nextd" v-else disabled>Next</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    filteredSecrets: { type: Array, default: () => [] },
    pagination: { type: Object, default: () => {} },
    tableShow: { type: Object, default: () => {} }
  }
}
</script>

<style lang="scss" scoped>
.pagination__show {
  @apply text-center font-semibold text-white my-8;
  @apply text-white;
  :hover {
    @apply text-green-500;
  }
}
.btn__pagination {
  &-previous {
    @apply cursor-pointer;

    @apply my-2 ml-2 border  border-green-900 text-xl py-1 px-1;
  }
  &-previousd {
    @apply my-2 ml-2 border  border-green-900 text-xl py-1 px-1 cursor-not-allowed;
    &:hover {
      @apply text-gray-700-spotify border-gray-700-spotify;
    }
  }
  &-next {
    @apply cursor-pointer;

    @apply my-2 ml-2 border  border-green-900 text-xl py-1 px-1;
    &:hover {
      @apply text-green-500;
    }
  }
  &-nextd {
    @apply my-2 ml-2 border  border-green-900 text-xl py-1 px-1 cursor-not-allowed;
    &:hover {
      @apply text-gray-700-spotify border-gray-700-spotify;
    }
  }
}
</style>
