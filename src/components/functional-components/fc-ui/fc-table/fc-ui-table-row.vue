<script>
import {
  ARRAY_PROP_DEFAULT,
  TABLE_HEADERS_PROP_VALIDATOR,
} from "@/utils/const";

const getCellsOptions = (headers, row, slot) => {
  return headers.map(({ class: externalClass, prop }) => ({
    externalClass,
    content: slot?.({ prop: prop }) || row[prop],
  }));
};

const renderCells = (h, options) => {
  return options.map(({ externalClass, content }) => {
    const elmClasses = ["fc-ui-table-row__cell", externalClass];
    return <div class={elmClasses}>{content}</div>;
  });
};

export default {
  name: "fc-ui-table-row",
  functional: true,
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
  render(h, { props, scopedSlots }) {
    const cellsOptions = getCellsOptions(
      props.headers,
      props.row,
      scopedSlots.default
    );
    const cells = renderCells(h, cellsOptions);

    return <div class="fc-ui-table-row">{cells}</div>;
  },
};
</script>

<style>
.fc-ui-table-row {
  display: flex;
}

.fc-ui-table-row__cell {
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

.fc-ui-table-row__cell:last-child {
  border-right-color: hsl(var(--gray-light-hsl));
}
</style>
