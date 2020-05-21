<template>
  <div>
    <!-- select options -->
    <div class="table-style">
      <input
        class="input"
        type="text"
        v-model="search"
        placeholder="Search..."
        @input="resetPagination()"
        style="width: 250px;"
      />
      <div class="control">
        <div class="select">
          <select v-model="length" @change="resetPagination()">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
      </div>
    </div>
    <!-- end select options -->
    <!-- table -->
    <table class="table-fixed">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.name"
            @click="sortBy(column.name)"
            :class="
              sortKey === column.name
                ? sortOrders[column.name] > 0
                  ? 'sorting_asc'
                  : 'sorting_desc'
                : 'sorting'
            "
            style="width: 40%; cursor: pointer;"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(r, i) in paginatedSecrets" :key="i" @click="onRowClick(r)">
          <td class="border px-4 py-2 text-center">{{ r.createdAt }}</td>
          <td class="border px-4 py-2">{{ r.name }}</td>
          <td class="border px-4 py-2">{{ r.category }}</td>
          <td class="border px-4 py-2">Get Value | Copy Secret</td>
        </tr>
      </tbody>
    </table>
    <!-- end table -->
    <!-- pagination Component -->
    <div>
      <nav class="pagination" v-if="!tableShow.showdata">
        <span class="page-stats"
          >{{ pagination.from }} - {{ pagination.to }} of
          {{ pagination.total }}</span
        >
        <a
          v-if="pagination.prevPageUrl"
          class="btn btn-sm btn-primary pagination-previous"
          @click="--pagination.currentPage"
        >
          Prev
        </a>
        <a class="btn btn-sm btn-primary pagination-previous" v-else disabled>
          Prev
        </a>
        <a
          v-if="pagination.nextPageUrl"
          class="btn btn-sm pagination-next"
          @click="++pagination.currentPage"
        >
          Next
        </a>
        <a class="btn btn-sm btn-primary pagination-next" v-else disabled>
          Next
        </a>
      </nav>
      <nav class="pagination" v-else>
        <span class="page-stats">
          {{ pagination.from }} - {{ pagination.to }} of
          {{ filteredSecrets.length }}
          <span v-if="`filteredSecrets.length < pagination.total`"></span>
        </span>
        <a
          v-if="pagination.prevPage"
          class="btn btn-sm btn-primary pagination-previous"
          @click="--pagination.currentPage"
        >
          Prev
        </a>
        <a class="btn btn-sm pagination-previous btn-primary" v-else disabled>
          Prev
        </a>
        <a
          v-if="pagination.nextPage"
          class="btn btn-sm btn-primary pagination-next"
          @click="++pagination.currentPage"
        >
          Next
        </a>
        <a class="btn btn-sm pagination-next btn-primary" v-else disabled>
          Next
        </a>
      </nav>
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
