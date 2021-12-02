<template>
  <div class="ui-table">
    <div class="ui-table__header">
      <ui-table-column
        v-for="column in columnsOptions"
        :key="column.prop"
        class="ui-table__column"
        :class="column.class"
        :label="column.label"
        :is-sortable="column.sortable"
        :sort-direction="column.sortDirection"
        :sort-index="column.sortIndex"
        :is-filterable="column.filterable"
        :filter="column.filterValue"
        @sort="setSort(column.prop, $event)"
        @reset-sort="resetSort(column.prop)"
        @update:filter="setFilter(column.prop, $event)"
        @reset-filter="resetFilter(column.prop)"
      >
        <slot :name="`${column.prop}.title`"></slot>
      </ui-table-column>
    </div>

    <div class="ui-table__body">
      <recycle-scroller
        v-if="hasRows"
        :items="data"
        :item-size="48"
        page-mode
        key-field="id"
        v-slot="{ item }"
      >
        <ui-table-row :headers="headers" :row="item" class="ui-table__row">
          <template #default="{ prop }">
            <slot :name="`${prop}.cell`" v-bind="item"></slot>
          </template>
        </ui-table-row>
      </recycle-scroller>

      <ui-table-placeholder v-else />
    </div>

    <div class="ui-table__navigation">
      <div v-if="isVisiblePagination" class="ui-table__pagination">
        <ui-pagination
          :current-page="page"
          :total-pages="totalPagesCount"
          @change="setPage($event)"
        />
      </div>

      <ui-infinite-scroll
        v-else-if="isVisibleInfiniteScroll"
        @load="infiniteLoad()"
      />
    </div>
  </div>
</template>

<script>
import UiInfiniteScroll from "../ui-infinite-scroll";
import UiPagination from "../ui-pagination";
import UiTableColumn from "./ui-table-column";
import UiTablePlaceholder from "./ui-table-placeholder";
import UiTableRow from "./ui-table-row";

import {
  ARRAY_PROP_DEFAULT,
  TABLE_HEADERS_PROP_VALIDATOR,
  TABLE_ITEMS_PER_PAGE_PROP_DEFAULT,
} from "@/utils/const";
import { patchCollection } from "@/utils/collection";

export default {
  name: "ui-table",
  components: {
    UiInfiniteScroll,
    UiPagination,
    UiTableColumn,
    UiTablePlaceholder,
    UiTableRow,
  },
  props: {
    headers: {
      type: Array,
      required: true,
      validator: TABLE_HEADERS_PROP_VALIDATOR,
    },
    data: {
      type: Array,
      default: ARRAY_PROP_DEFAULT,
    },
    page: {
      type: Number,
      default: 1,
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    itemsPerPage: {
      type: [Number, String],
      default: TABLE_ITEMS_PER_PAGE_PROP_DEFAULT,
    },
    sorts: {
      type: Array,
      default: ARRAY_PROP_DEFAULT,
    },
    filters: {
      type: Array,
      default: ARRAY_PROP_DEFAULT,
    },
    isInfiniteScroll: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    totalPagesCount() {
      return Math.ceil(this.totalCount / this.itemsPerPage);
    },
    isVisiblePagination() {
      return !this.isInfiniteScroll && this.totalCount > 0;
    },
    isVisibleInfiniteScroll() {
      return this.isInfiniteScroll && this.data.length < this.totalCount;
    },
    hasRows() {
      return this.data.length > 0;
    },
    columnsOptions() {
      const { headers, sorts, filters } = this;

      return headers.map((column) => {
        const sortIndex = sorts.findIndex(({ prop }) => prop === column.prop);
        const sortOptions = sorts[sortIndex] || {};
        const filterIndex = filters.findIndex(
          ({ prop }) => prop === column.prop
        );
        const filterOptions = filters[filterIndex] || {};

        return {
          ...column,
          sortIndex: sortIndex + 1,
          sortDirection: sortOptions.direction,
          filterValue: filterOptions.value,
        };
      });
    },
  },
  methods: {
    _emitLoad() {
      this.$emit("load");
    },
    _emitInfiniteLoad() {
      this.$emit("infinite-load");
    },
    _updateDataParams({ page, sorts, filters }) {
      if (sorts) this.$emit("update:sorts", sorts);
      if (filters) this.$emit("update:filters", filters);
      if (page) this.$emit("update:page", page);
      this.$emit("load", filters);
    },

    setPage(page) {
      this._updateDataParams({ page });
    },
    setSort(prop, direction) {
      const sorts = patchCollection(this.sorts, { prop, direction }, "prop");
      this._updateDataParams({ sorts, page: 1 });
    },
    resetSort(prop) {
      const sorts = this.sorts.filter((sort) => sort.prop !== prop);
      this._updateDataParams({ sorts, page: 1 });
    },
    setFilter(prop, value) {
      const filters = patchCollection(this.filters, { prop, value }, "prop");
      this._updateDataParams({ filters, page: 1 });
    },
    resetFilter(prop) {
      const filters = this.filters.filter((filter) => filter.prop !== prop);
      this._updateDataParams({ filters, page: 1 });
    },
    infiniteLoad() {
      this._emitInfiniteLoad();
    },
  },
};
</script>

<style>
.ui-table {
  --table-row-background-color: hsl(var(--white-hsl));
}

.ui-table__header {
  display: flex;
  width: 100%;
}

.ui-table__column {
  flex: 1 1 0;
}

.ui-table__row {
  background-color: var(--table-row-background-color);
}

.ui-table__row:nth-child(even) {
  --table-row-background-color: hsl(var(--silver-hsl));
}

.ui-table__pagination {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

.test {
  padding: 0.75rem;
  /*min-height: 48px;*/
  box-sizing: border-box;
}
</style>
