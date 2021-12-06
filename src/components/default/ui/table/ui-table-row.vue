<template>
  <div class="ui-table-row">
    <div
      v-for="column in headers"
      :key="column.prop"
      class="ui-table-row__cell"
      :class="column.class"
    >
      <slot v-bind="{ prop: column.prop }">{{ row[column.prop] }}</slot>
    </div>
  </div>
</template>

<script>
import {
  ARRAY_PROP_DEFAULT,
  TABLE_HEADERS_PROP_VALIDATOR,
} from "@/utils/const";

export default {
  name: "ui-table-row",
  props: {
    headers: {
      type: Array,
      default: ARRAY_PROP_DEFAULT,
      validator: TABLE_HEADERS_PROP_VALIDATOR,
    },
    row: {
      type: Object,
      default: ARRAY_PROP_DEFAULT,
    },
  },
};
</script>

<style>
.ui-table-row {
  display: flex;
}

.ui-table-row__cell {
  flex: 1 1 0;
  border: 1px solid transparent;
  border-bottom-color: hsl(var(--gray-light-hsl));
  border-left-color: hsl(var(--gray-light-hsl));
  padding: 0.75rem;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.ui-table-row__cell:last-child {
  border-right-color: hsl(var(--gray-light-hsl));
}
</style>
