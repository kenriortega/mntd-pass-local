<template>
  <div class="container">
    <!-- select options -->
    <div class="mt-8 flex flex-wrap -mx-3 mb-2">
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
      <label class="block mt-4">
        <span class="text-gray-700">Requested Limit</span>
        <select
          class="w-full mt-1 bg-gray-800-spotify border-transparent"
          v-model="length"
          @change="resetPagination()"
        >
          <option>10</option>
          <option>20</option>
        </select>
      </label>
    </div>

    <!-- end select options -->
    <!-- table -->
    <div class="flex flex-wrap -mx-3 mb-2">
      <table class="table-fixed secret-table">
        <thead>
          <tr>
            <th
              class="mt-8 px-4 py-2 cursor-pointer uppercase "
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
            v-for="(row, indice) in paginatedSecrets"
            :key="indice"
          >
            <td class="bordered px-4 py-2 text-center">{{ row.name }}</td>
            <td class="bordered px-4 py-2 text-center">{{ row.category }}</td>
            <td class="bordered px-4 py-2 text-center">{{ row.createdAt }}</td>
            <td class="bordered px-4 py-2 text-center">
              <i
                class="text-red-400 ml-2 my-2 mr-2 fa fa-trash-alt"
                @click="onDeleteItem(row.name)"
              ></i>
              <button
                v-tooltip.right-end="
                  changed !== indice ? 'Get Secret' : 'Copy Secret'
                "
                class="text-green-500 hover:text-white hover:bg-green-500 border border-green-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal"
                @click="
                  changed !== indice
                    ? getValueFromSecret(row.name, indice)
                    : copyToClipBoard(indice)
                "
              >
                <i
                  :class="
                    `fa fa-${
                      changed === false ? 'lock' : 'clipboard'
                    } text-green-700`
                  "
                ></i>
                {{ changed !== indice ? 'Get Secret' : 'Copy Secret' }}
              </button>
              <span>
                <p
                  :class="`text-${isCoping === indice ? 'green' : 'gray'}-700`"
                >
                  {{ changed === indice ? value : '' }}
                </p></span
              >
              <input type="hidden" :id="`clipboard-${indice}`" :value="value" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- end table -->
    <!-- pagination Component -->
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
    <!-- end pagination -->
  </div>
</template>

<script>
import { SecretService } from '@/services/'

export default {
  name: 'TheTableSecrets',
  props: {
    rowsSecrets: {
      type: Array,
      default: () => []
    },
    user: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    let sortOrders = {}
    let columns = [
      { label: 'Name', name: 'name' },
      { label: 'Category', name: 'category' },
      { label: 'Created At', name: 'createdAt' },
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
      },
      isCoping: null,
      changed: null,
      value: ''
      // msg: null,
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
    // onRowClick({ createdAt, name, category }) {
    //   console.log('Clicked! +', createdAt, name, category)
    // },
    async getValueFromSecret(name, indice) {
      this.changed = indice
      let { username, token } = this.user
      try {
        let res = await SecretService.getValueSecret(username, name, token)
        this.value = res.data.value
      } catch (err) {
        this.$emit('showError', err.response.data)
        this.changed = null
      }
    },
    copyToClipBoard(indice) {
      this.isCoping = indice
      let copyToClibBoard = document.querySelector(`#clipboard-${indice}`)
      copyToClibBoard.select()
      try {
        let successful = document.execCommand('copy')
        this.msg = successful ? 'successful' : 'unsuccessful'
      } catch (err) {
        this.$emit('showError', {
          statusCode: 500,
          error: 'Failed to Copy'
        })
      }

      copyToClibBoard.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    },
    onDeleteItem(name) {
      this.$emit('delete-secret-name', name)
    }
  }
}
</script>
<style src="@/assets/components/secretsTable.scss" lang="scss" scoped></style>
