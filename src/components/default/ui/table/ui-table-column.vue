<template>
  <div
    class="ui-table-column"
    :class="{
      'ui-table-column_is-sortable': isSortable,
      'ui-table-column_is-sorted': isSorted,
    }"
  >
    <div class="ui-table-column__inner" @click="toggleSort()">
      <span class="ui-table-column__label">
        <slot>{{ label }}</slot>
      </span>

      <span
        v-if="isSortable"
        class="ui-table-column__sort-indicator ui-table-column__unit"
      >
        <component :is="sortDirectionIcon" class="ui-table-column__icon" />
      </span>

      <span
        v-if="sortIndex"
        class="ui-table-column__sort-index ui-table-column__unit"
      >
        {{ sortIndex }}
      </span>
    </div>

    <ui-table-filter-dropdown
      v-if="isFilterable"
      class="ui-table-column__filter"
      :filter="filter"
      @update:filter="setFilter($event)"
      @reset="resetFilter()"
    >
      <button class="ui-table-column__button ui-table-column__popover-trigger">
        <filter-icon v-if="isFiltered" class="ui-table-column__icon" />
        <filter-outline-icon v-else class="ui-table-column__icon" />
      </button>
    </ui-table-filter-dropdown>
  </div>
</template>

<script>
import ArrowUpIcon from "../../icons/arrow-up-icon";
import ArrowDownIcon from "../../icons/arrow-down-icon";
import FilterIcon from "../../icons/filter-icon";
import FilterOutlineIcon from "../../icons/filter-outline-icon";
import UiTableFilterDropdown from "./ui-table-filter-dropdown";

export default {
  name: "ui-table-column",
  components: {
    FilterIcon,
    FilterOutlineIcon,
    UiTableFilterDropdown,
  },
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
      validator(value) {
        return ["asc", "desc"].includes(value);
      },
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
  computed: {
    isSorted() {
      return Boolean(this.sortDirection);
    },
    isFiltered() {
      return Boolean(this.filter);
    },
    sortDirectionIcon() {
      return this.sortDirection === "desc" ? ArrowDownIcon : ArrowUpIcon;
    },
  },
  methods: {
    _emitSort(direction) {
      this.$emit("sort", direction);
    },
    _emitResetSort() {
      this.$emit("reset-sort");
    },
    _emitFilter(value) {
      this.$emit("update:filter", value);
    },
    _emitResetFilter() {
      this.$emit("reset-filter");
    },

    toggleSort() {
      if (!this.isSortable) return;

      if (!this.sortDirection) this._emitSort("asc");
      else if (this.sortDirection === "asc") this._emitSort("desc");
      else this._emitResetSort();
    },
    setFilter(value) {
      this._emitFilter(value);
    },
    resetFilter() {
      this._emitResetFilter();
    },
  },
};
</script>

<style>
.ui-table-column {
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

.ui-table-column:nth-child(1n + 2) {
  border-left-color: transparent;
}

.ui-table-column_is-sortable {
  cursor: pointer;
  user-select: none;
}

.ui-table-column_is-sortable:hover {
  --table-sort-indicator-opacity: 0.5;
}

.ui-table-column_is-sortable.ui-table-column_is-sorted {
  --table-sort-indicator-opacity: 1;
}

.ui-table-column__inner {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  padding: 0.75rem;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
}

.ui-table-column__label {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.ui-table-column__unit:nth-child(1n + 2) {
  margin-left: 0.25rem;
}

.ui-table-column__icon {
  position: relative;
  height: 1.25rem;
  width: 1.25rem;
}

.ui-table-column__sort-indicator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: var(--table-sort-indicator-opacity);
  transition: opacity 0.2s ease;
}

.ui-table-column__sort-index {
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

.ui-table-column__button {
  padding: 0;
  width: 2rem;
  border: 0;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s ease;
}

.ui-table-column__button:hover,
.ui-table-column__button:focus-visible {
  background-color: hsl(var(--primary-extra-dark-hsl));
}

.ui-table-column__popover-trigger {
  min-height: 100%;
}
</style>
