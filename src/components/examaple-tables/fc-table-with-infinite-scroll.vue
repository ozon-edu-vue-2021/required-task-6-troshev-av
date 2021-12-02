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
    is-infinite-scroll
    @load="loadTodos()"
    @infinite-load="loadMoreTodos()"
  >
    <template #completed.cell="row">
      <template v-if="row.completed">Yes</template>
      <template v-else>No</template>
    </template>
  </ui-table>
</template>

<script>
import UiTable from "../functional-components/fc-ui/fc-table/fc-ui-table";

import ExampleTableMixin from "./example-table-mixin";
import ExampleTableWithInfiniteScrollMixin from "./example-table-with-infinite-scroll-mixin";

export default {
  name: "fc-table-with-infinite-scroll",
  mixins: [ExampleTableMixin, ExampleTableWithInfiniteScrollMixin],
  components: {
    UiTable,
  },
};
</script>
