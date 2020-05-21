<template>
  <div class="container">
    <!-- TODO: add styles to table component -->
    <!-- select options -->
    <div class="flex flex-wrap -mx-3 mb-2">
      <div class="flex items-center border-b border-b-2 border-green-800 py-2">
        <i class="mr-2 fa fa-search text-gray-500"></i>
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-500  mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          v-model="search"
          placeholder="Search..."
          @input="resetPagination()"
          style="width: 250px;"
        />
      </div>
      <div class="secrets__row-count">
        <select
          class="secrets__row-count__select"
          v-model="length"
          @change="resetPagination()"
        >
          <option class="secrets__row-count__label" value="10">10</option>
          <option class="secrets__row-count__label" value="20">20</option>
          <option class="secrets__row-count__label" value="30">30</option>
        </select>
      </div>
    </div>

    <!-- end select options -->
    <!-- table -->
    <div class="flex flex-wrap -mx-3 mb-2">
      <table class="table-fixed secret-table">
        <thead>
          <tr>
            <th
              class="mt-8 px-4 py-2 cursor-pointer "
              v-for="column in columns"
              :key="column.name"
              @click="sortBy(column.name)"
            >
              <i
                :class="
                  sortKey === column.name
                    ? sortOrders[column.name] > 0
                      ? 'fa fa-arrow-up'
                      : 'fa fa-arrow-down'
                    : 'sorting'
                "
              ></i>
              {{ column.label }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            class="clickable"
            v-for="(r, i) in paginatedSecrets"
            :key="i"
            @click="onRowClick(r)"
          >
            <td class="bordered px-4 py-2 text-center">{{ r.createdAt }}</td>
            <td class="bordered px-4 py-2 text-center">{{ r.name }}</td>
            <td class="bordered px-4 py-2 text-center">{{ r.category }}</td>
            <td class="bordered px-4 py-2 text-center">
              Get Value | Copy Secret
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- end table -->
    <!-- pagination Component -->
    <div
      class="mt-8 text-center font-semibold text-gray-700-spotify hover:text-green-500"
    >
      <div class="" v-if="!tableShow.showdata">
        <span class=""
          >{{ pagination.from }} - {{ pagination.to }} of
          {{ pagination.total }}</span
        >
        <a
          v-if="pagination.prevPageUrl"
          class=""
          @click="--pagination.currentPage"
        >
          Prev
        </a>
        <a class="" v-else disabled>
          Prev
        </a>
        <a
          v-if="pagination.nextPageUrl"
          class=""
          @click="++pagination.currentPage"
        >
          Next
        </a>
        <a class="" v-else disabled>
          Next
        </a>
      </div>
      <div class="" v-else>
        <span class="">
          {{ pagination.from }} - {{ pagination.to }} of
          {{ filteredSecrets.length }}
          <span v-if="`filteredSecrets.length < pagination.total`"></span>
        </span>
        <a
          v-if="pagination.prevPage"
          class=""
          @click="--pagination.currentPage"
        >
          Prev
        </a>
        <a class="" v-else disabled>
          Prev
        </a>
        <a
          v-if="pagination.nextPage"
          class=""
          @click="++pagination.currentPage"
        >
          Next
        </a>
        <a class="" v-else disabled>
          Next
        </a>
      </div>
    </div>
    <!-- end pagination -->
  </div>
</template>

<script>
export default {
  name: 'TheTableSecrets',
  props: {
    rowsSecrets: {
      type: Array,
      default: () => []
    }
  },
  data() {
    let sortOrders = {}
    let columns = [
      { label: 'Created At', name: 'createdAt' },
      { label: 'Name', name: 'name' },
      { label: 'Category', name: 'category' },
      { label: 'Action', name: 'action' }
    ]
    columns.forEach(column => {
      sortOrders[column.name] = -1
    })
    return {
      columns: columns,
      sortKey: 'fecha',
      sortOrders: sortOrders,
      length: 5,
      search: '',
      tableShow: {
        showdata: true
      },
      pagination: {
        currentPage: 1,
        total: '',
        nextPage: '',
        prevPage: '',
        from: '',
        to: ''
      }
    }
  },
  computed: {
    paginatedSecrets() {
      return this.paginate(
        this.filteredSecrets,
        this.length,
        this.pagination.currentPage
      )
    },
    filteredSecrets() {
      let secrets = this.rowsSecrets
      if (this.search) {
        secrets = secrets.filter(row => {
          return Object.keys(row).some(key => {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(this.search.toLowerCase()) > -1
            )
          })
        })
      }

      return secrets
    }
  },
  methods: {
    paginate(array, length, pageNumber) {
      this.pagination.from = array.length ? (pageNumber - 1) * length + 1 : ' '
      this.pagination.to =
        pageNumber * length > array.length ? array.length : pageNumber * length
      this.pagination.prevPage = pageNumber > 1 ? pageNumber : ''
      this.pagination.nextPage =
        array.length > this.pagination.to ? pageNumber + 1 : ''
      return array.slice((pageNumber - 1) * length, pageNumber * length)
    },
    resetPagination() {
      this.pagination.currentPage = 1
      this.pagination.prevPage = ''
      this.pagination.nextPage = ''
    },
    sortBy(key) {
      this.resetPagination()
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    getIndex(array, key, value) {
      return array.findIndex(i => i[key] == value)
    },
    onRowClick({ createdAt, name, category }) {
      console.log('Clicked! +', createdAt, name, category)
    }
  }
}
</script>
<style src="@/assets/components/secretsTable.scss" lang="scss" scoped></style>
