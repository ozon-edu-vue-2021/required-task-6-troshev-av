<script>
import UiInfiniteScroll from "../fc-ui-infinite-scroll";
import FcUiPagination from "../fc-ui-pagination";
import FcUiTableColumn from "./fc-ui-table-column";
import FcUiTablePlaceholder from "./fc-ui-table-placeholder";
import FcUiTableRow from "./fc-ui-table-row";

import {
  ARRAY_PROP_DEFAULT,
  TABLE_HEADERS_PROP_VALIDATOR,
  TABLE_ITEMS_PER_PAGE_PROP_DEFAULT,
} from "@/utils/const";
import { patchCollection } from "@/utils/collection";

const getColumnsOptions = ({ headers, sorts, filters }) => {
  return headers.map((column) => {
    const sortIndex = sorts.findIndex(({ prop }) => prop === column.prop);
    const sortDirection = sorts[sortIndex]?.direction;
    const filterIndex = filters.findIndex(({ prop }) => prop === column.prop);
    const filterValue = filters[filterIndex]?.value;

    return {
      ...column,
      filterValue,
      sortDirection,
      sortIndex: sortIndex + 1,
    };
  });
};

const renderColumns = (
  h,
  { columnsOptions, scopedSlots, setSort, resetSort, setFilter, resetFilter }
) => {
  return columnsOptions.map((column) => {
    const columnDefaultSlot = scopedSlots[`${column.prop}.title`]?.();
    const columnListeners = {
      sort: setSort.bind(undefined, column.prop),
      "reset-sort": resetSort.bind(undefined, column.prop),
      "update:filter": setFilter.bind(undefined, column.prop),
      "reset-filter": resetFilter.bind(undefined, column.prop),
    };

    return (
      <FcUiTableColumn
        class={["fc-ui-table__column", column.class]}
        label={column.label}
        is-sortable={column.sortable}
        sort-direction={column.sortDirection}
        sort-index={column.sortIndex}
        is-filterable={column.filterable}
        filter={column.filterValue}
        on={columnListeners}
      >
        {columnDefaultSlot}
      </FcUiTableColumn>
    );
  });
};

const renderRow = (h, { row, headers, scopedSlots }) => {
  const rowScopedSlots = {
    default: ({ prop }) => scopedSlots[`${prop}.cell`]?.(row),
  };
  return (
    <FcUiTableRow
      class="fc-ui-table__row"
      row={row}
      headers={headers}
      scopedSlots={rowScopedSlots}
    />
  );
};

const renderRowsList = (h, { list, headers, scopedSlots }) => {
  const scrollerScopedSlots = {
    default: ({ item }) => {
      return renderRow(h, { row: item, headers, scopedSlots });
    },
  };

  return (
    <RecycleScroller
      items={list}
      item-size={48}
      scopedSlots={scrollerScopedSlots}
      page-mode
    />
  );
};

const renderPagination = (h, { page, totalCount, itemsPerPage }, setPage) => {
  const totalPagesCount = Math.ceil(totalCount / itemsPerPage);
  return (
    <div class="ui-table__pagination">
      <FcUiPagination
        current-page={page}
        total-pages={totalPagesCount}
        onChange={setPage}
      />
    </div>
  );
};

const renderInfiniteScroll = (h, infiniteLoad) => (
  <UiInfiniteScroll onLoad={infiniteLoad} />
);

export default {
  name: "fc-ui-table",
  functional: true,
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
  render(h, { props, listeners, scopedSlots }) {
    const emit = (name, value) => {
      listeners[name]?.(value);
    };

    const updateDataParams = ({ page, sorts, filters }) => {
      if (sorts) emit("update:sorts", sorts);
      if (filters) emit("update:filters", filters);
      if (page) emit("update:page", page);
      emit("load", filters);
    };

    const setPage = (page) => {
      updateDataParams({ page });
    };

    const setSort = (prop, direction) => {
      const sorts = patchCollection(props.sorts, { prop, direction }, "prop");
      updateDataParams({ sorts, page: 1 });
    };
    const resetSort = (prop) => {
      const sorts = props.sorts.filter((sort) => sort.prop !== prop);
      updateDataParams({ sorts, page: 1 });
    };

    const setFilter = (prop, value) => {
      const filters = patchCollection(props.filters, { prop, value }, "prop");
      updateDataParams({ filters, page: 1 });
    };

    const resetFilter = (prop) => {
      const filters = props.filters.filter((filter) => filter.prop !== prop);
      updateDataParams({ filters, page: 1 });
    };

    const infiniteLoad = () => {
      emit("infinite-load");
    };

    const columnsOptions = getColumnsOptions(props);
    const tableHeaderColumns = renderColumns(h, {
      columnsOptions,
      scopedSlots,
      setSort,
      resetSort,
      setFilter,
      resetFilter,
    });

    const tableContent =
      props.data.length > 0 ? (
        renderRowsList(h, {
          list: props.data,
          headers: props.headers,
          scopedSlots,
        })
      ) : (
        <FcUiTablePlaceholder />
      );

    const isVisiblePagination = !props.isInfiniteScroll && props.totalCount > 0;
    const isVisibleInfiniteScroll =
      props.isInfiniteScroll && props.data.length < props.totalCount;
    const tableNavigation =
      (isVisiblePagination && renderPagination(h, props, setPage)) ||
      (isVisibleInfiniteScroll && renderInfiniteScroll(h, infiniteLoad));

    return (
      <div class="fc-ui-table">
        <div class="fc-ui-table__header">{tableHeaderColumns}</div>
        <div class="fc-ui-table__body">{tableContent}</div>
        <div class="ui-table__navigation">{tableNavigation}</div>
      </div>
    );
  },
};
</script>

<style>
.fc-ui-table {
  --table-row-background-color: hsl(var(--white-hsl));
}

.fc-ui-table__header {
  display: flex;
  width: 100%;
}

.fc-ui-table__column {
  flex: 1 1 0;
}

.fc-ui-table__row {
  background-color: var(--table-row-background-color);
}

.fc-ui-table__row:nth-child(even) {
  --table-row-background-color: hsl(var(--silver-hsl));
}

.fc-ui-table__pagination {
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
