<script>
import FcArrowDownIcon from "./../../fc-icons/fc-arrow-down-icon";
import FcArrowUpIcon from "./../../fc-icons/fc-arrow-up-icon";
import FcFilterIcon from "./../../fc-icons/fc-filter-icon";
import FcFilterOutlineIcon from "./../../fc-icons/fc-filter-outline-icon";
import FcUiTableFilterDropdown from "./fc-ui-table-filter-dropdown";

const getColumnClassList = ({ isSortable, sortDirection }) => {
  const isSorted = Boolean(sortDirection);
  const list = ["fc-ui-table-column"];

  if (isSortable) list.push("fc-ui-table-column_is-sortable");
  if (isSorted) list.push("fc-ui-table-column_is-sorted");
  return list;
};

const renderSortIndicator = (h, direction) => {
  const SortIcon = direction === "desc" ? FcArrowDownIcon : FcArrowUpIcon;
  return (
    <span class="fc-ui-table-column__sort-indicator fc-ui-table-column__unit">
      <SortIcon class="fc-ui-table-column__icon" />
    </span>
  );
};

const renderSortIndex = (h, index) => {
  return (
    <span class="ui-table-column__sort-index ui-table-column__unit">
      {index}
    </span>
  );
};

const renderFilterDropdown = (h, { props, setFilter, resetFilter }) => {
  const filterValue = props.filter;
  const filterIcon = props.filter ? FcFilterIcon : FcFilterOutlineIcon;
  const dropdownListeners = {
    "update:filter": setFilter,
    reset: resetFilter,
  };

  return (
    <FcUiTableFilterDropdown
      class="ui-table-column__filter"
      filter={filterValue}
      on={dropdownListeners}
    >
      <button class="ui-table-column__button ui-table-column__popover-trigger">
        <filterIcon className="ui-table-column__icon" />
      </button>
    </FcUiTableFilterDropdown>
  );
};

export default {
  name: "fc-ui-table-column",
  functional: true,
  props: {
    label: {
      type: String,
      default: null,
    },
    isSortable: {
      type: Boolean,
      default: false,
    },
    sortDirection: {
      type: String,
      default: null,
    },
    sortIndex: {
      type: Number,
      default: null,
    },
    isFilterable: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: String,
      default: null,
    },
  },
  render(h, { props, data, listeners, scopedSlots }) {
    const toggleSort = () => {
      const emitSort = (value) => listeners.sort?.(value);
      const emitResetSort = () => listeners["reset-sort"]?.();

      if (!props.isSortable) return;
      if (!props.sortDirection) emitSort("asc");
      else if (props.sortDirection === "asc") emitSort("desc");
      else emitResetSort();
    };

    const setFilter = (value) => {
      listeners["update:filter"]?.(value);
    };
    const resetFilter = () => {
      listeners["reset-filter"]?.();
    };

    const columnClassList = [
      ...getColumnClassList(props),
      data.class,
      data.staticClass,
    ];
    const label = scopedSlots.default?.() || props.label;
    const sortIndicator = props.isSortable
      ? renderSortIndicator(h, props.sortDirection)
      : null;
    const sortIndex = props.sortIndex
      ? renderSortIndex(h, props.sortIndex)
      : null;

    const filterDropdown = props.isFilterable
      ? renderFilterDropdown(h, { props, setFilter, resetFilter })
      : null;

    return (
      <div class={columnClassList}>
        <div class="ui-table-column__inner" onClick={toggleSort}>
          <span class="ui-table-column__label">{label}</span>
          {sortIndicator}
          {sortIndex}
        </div>

        {filterDropdown}
      </div>
    );
  },
};
</script>

<style>
.fc-ui-table-column {
  --table-sort-indicator-opacity: 0;

  display: flex;
  color: hsl(var(--white-hsl));
  min-width: 6rem;
  border: 1px solid hsl(var(--primary-extra-dark-hsl));
  font-weight: bold;
  text-align: inherit;
  background-color: hsl(var(--primary-hsl));
  box-sizing: border-box;
  transition: background-color 0.2s ease;
  overflow: hidden;
}

.fc-ui-table-column:nth-child(1n + 2) {
  border-left-color: transparent;
}

.fc-ui-table-column_is-sortable {
  cursor: pointer;
  user-select: none;
}

.fc-ui-table-column_is-sortable:hover {
  --table-sort-indicator-opacity: 0.5;
}

.fc-ui-table-column_is-sortable.fc-ui-table-column_is-sorted {
  --table-sort-indicator-opacity: 1;
}

.fc-ui-table-column__inner {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  padding: 0.75rem;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
}

.fc-ui-table-column__label {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.fc-ui-table-column__unit:nth-child(1n + 2) {
  margin-left: 0.25rem;
}

.fc-ui-table-column__icon {
  position: relative;
  height: 1.25rem;
  width: 1.25rem;
}

.fc-ui-table-column__sort-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: var(--table-sort-indicator-opacity);
  transition: opacity 0.2s ease;
}

.fc-ui-table-column__sort-index {
  display: inline-block;
  border-radius: 0.75rem;
  padding: 0 0.25rem;
  min-width: 1.25rem;
  box-sizing: border-box;
  font-size: 0.8em;
  line-height: 1.25rem;
  background-color: hsl(var(--primary-extra-dark-hsl));
  text-align: center;
}

.fc-ui-table-column__button {
  padding: 0;
  width: 2rem;
  border: 0;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s ease;
}

.fc-ui-table-column__button:hover,
.fc-ui-table-column__button:focus-visible {
  background-color: hsl(var(--primary-extra-dark-hsl));
}

.fc-ui-table-column__popover-trigger {
  min-height: 100%;
}
</style>
