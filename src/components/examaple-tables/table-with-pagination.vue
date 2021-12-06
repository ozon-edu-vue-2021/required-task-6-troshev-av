<template>
  <ui-table
    :headers="headers"
    :data="rows"
    :page.sync="page"
    :items-per-page="itemsPerPage"
    :total-count="totalCount"
    :sorts.sync="sorts"
    :filters.sync="filters"
    :is-loading="isLoading"
    @load="loadTodos()"
  >
    <template #completed.cell="row">
      <template v-if="row.completed">Yes</template>
      <template v-else>No</template>
    </template>
  </ui-table>
</template>

<script>
import UiTable from "../default/ui/table/ui-table";

import ExampleTableMixin from "./example-table-mixin";
import ExampleTableWithPaginationMixin from "./example-table-with-pagination-mixin";

export default {
  name: "table-with-pagination",
  mixins: [ExampleTableMixin, ExampleTableWithPaginationMixin],
  components: {
    UiTable,
  },
};
</script>
