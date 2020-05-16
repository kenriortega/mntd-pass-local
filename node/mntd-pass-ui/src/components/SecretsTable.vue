<template>
  <div class="w-full">
    <DataTable
      :columns="columns"
      :rows="rows"
      :lineNumbers="true"
      :isLoading="false"
      :rtl="false"
      styleClass="vgt-table"
      :search-options="{
        enabled: true,
        placeholder: 'Search this table'
      }"
      :pagination-options="{
        enabled: true,
        mode: 'pages',
        perPage: 5,
        position: 'bottom',
        perPageDropdown: [5, 10, 20],
        dropdownAllowAll: false,
        setCurrentPage: 1,
        nextLabel: 'next',
        prevLabel: 'prev',
        rowsPerPageLabel: 'Rows per page',
        ofLabel: 'of',
        pageLabel: 'page',
        allLabel: 'All'
      }"
      :selectOptions="{
        enabled: true,
        selectOnCheckboxOnly: true,
        selectionText: 'rows selected',
        clearSelectionText: 'clear'
      }"
      @on-row-click="onRowClick"
      :groupOptions="{
        enabled: false
      }"
    >
      <div slot="table-actions">
        <button
          class="inline-block bg-green-700 hover:bg-green-800 focus:bg-green-800 text-white font-semibold focus:outline-none focus:shadow-outline leading-tight rounded select-none align-middle whitespace-no-wrap px-3 py-2 mr-2 cursor-pointer"
        >
          CSV
        </button>
      </div>
      <div slot="emptystate" class="text-center">
        <em>Table is empty.</em>
      </div>
    </DataTable>
  </div>
</template>

<script>
import { VueGoodTable as DataTable } from 'vue-good-table'
// let btn = `
//         <div class="text-center">
//             <button class="inline-block bg-blue-700 text-sm hover:bg-blue-800 focus:bg-blue-800 text-white font-semibold focus:outline-none focus:shadow-outline leading-tight rounded select-none align-middle whitespace-no-wrap px-2 py-1 mb-1 md:mb-0 mr-2 cursor-pointer">Open</button>
//             <button class="inline-block bg-green-700 text-sm hover:bg-green-800 focus:bg-green-800 text-white font-semibold focus:outline-none focus:shadow-outline leading-tight rounded select-none align-middle whitespace-no-wrap px-2 py-1 mb-1 md:mb-0 mr-2 cursor-pointer">Edit</button>
//             <button class="inline-block bg-red-700 text-sm hover:bg-red-800 focus:bg-red-800 text-white font-semibold focus:outline-none focus:shadow-outline leading-tight rounded select-none align-middle whitespace-no-wrap px-2 py-1 mb-1 md:mb-0 cursor-pointer">Delete</button>
//         </div>
//     `
export default {
  name: 'secret-table',
  props: ['secrets'],
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
          filterOptions: {
            enabled: false, // enable filter for this column
            placeholder: 'Filter This Thing', // placeholder for filter input
            filterDropdownItems: [] // dropdown (with selected values) instead of text input
          }
        },
        // { label: 'Age', field: 'age', type: 'number' },
        {
          label: 'Created On',
          field: 'createdAt'
          //   dateInputFormat: 'yyyy-MM-dd',
          //   dateOutputFormat: 'MMM dd, yyyy',
          //   type: 'date'
        },
        // { label: 'Percent', field: 'score', type: 'percentage' },
        {
          label: 'Action',
          field: 'btn',
          html: true,
          filterOptions: {
            enabled: false
          }
        }
      ],
      rows: this.secrets
    }
  },
  components: { DataTable },
  methods: {
    onRowClick(params) {
      console.log('Clicked! +', params)
    }
  }
}
</script>
