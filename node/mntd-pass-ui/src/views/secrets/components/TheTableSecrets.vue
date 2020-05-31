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
          <option>5</option>
          <option>10</option>
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
            <td class="bordered px-4 py-2 text-center">
              <div class="flex flex-col">
                <span> {{ row.name }} </span>
                <span
                  v-if="showSecrets"
                  :contenteditable="isEditing === indice"
                  :ref="`span-${indice}`"
                  @dblclick="editingSecret(indice)"
                  @blur="onFinishToEdditSecret(indice, row.name)"
                  :class="`text-${isCoping === indice ? 'green' : 'gray'}-700`"
                >
                  {{ changed === indice ? value : '' }}
                </span>
              </div>
            </td>
            <td class="bordered px-4 py-2 text-center">{{ row.category }}</td>
            <td class="bordered px-4 py-2 text-center">{{ row.createdAt }}</td>
            <td class="bordered px-4 py-2 text-center">
              <i
                v-if="changed === indice"
                @click="
                  isEditing === indice
                    ? onFinishToEdditSecret(indice, row.name)
                    : editingSecret(indice)
                "
                :class="
                  `text-red-400 ml-2 my-2 mr-2 fa ${
                    isEditing === indice ? 'fa-check-double' : 'fa-edit'
                  }`
                "
              ></i>
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

              <input type="hidden" :id="`clipboard-${indice}`" :value="value" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- end table -->
    <!-- pagination Component -->
    <Pagination
      v-if="filteredSecrets.length > length"
      :filteredSecrets="filteredSecrets"
      :pagination="pagination"
      :tableShow="tableShow"
    />
    <!-- end pagination -->
  </div>
</template>

<script>
import { SecretService } from '@/services/'
import Pagination from '@/components/PaginationComponent'

export default {
  name: 'TheTableSecrets',
  components: {
    Pagination
  },
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
      value: '',
      editing: null,
      msg: null,
      showSecrets: false
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
    isEditing() {
      return this.editing
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

    // get value and copy to clibBoard
    async getValueFromSecret(name, indice) {
      this.changed = indice
      let { username, token } = this.user
      try {
        let res = await SecretService.getValueSecret(username, name, token)
        this.value = res.data.value
        this.showSecrets = true
      } catch (err) {
        this.$emit('showError', err.response.data)
        this.changed = null
      }
    },
    copyToClipBoard(indice) {
      this.isCoping = indice
      let copyToClibBoard = document.querySelector(`#clipboard-${indice}`)
      copyToClibBoard.setAttribute('type', 'text')

      copyToClibBoard.select()
      try {
        let successful = document.execCommand('copy')
        this.msg = successful ? 'successful' : 'unsuccessful'
        this.$toaster.success(`copy ${this.msg}`)
        this.showSecrets = false
        this.changed = null
      } catch (err) {
        this.$toaster.error(`Error: To copy to clibBoard`)
      }

      copyToClibBoard.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    },
    // table logic
    onDeleteItem(name) {
      this.$emit('delete-secret-name', name)
    },
    editingSecret(key) {
      this.editing = key
      const span = this.$refs[`span-${key}`][0]
      // span.setAttribute('contenteditable', 'true')
      span.focus()
    },
    onFinishToEdditSecret(key, name) {
      this.editing = null
      const span = this.$refs[`span-${key}`][0]
      this.value = span.innerHTML.trim()
      this.$emit('edit-secret-name', { value: this.value, name })
    }
  }
}
</script>
<style src="@/assets/components/secretsTable.scss" lang="scss" scoped></style>
