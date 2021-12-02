<template functional>
  <v-dropdown
    :shown="props.isVisible"
    :triggers="props.triggers"
    :auto-hide="props.autoHide"
    placement="bottom-end"
    @update:shown="
      $options.methods._emit(listeners, 'update:is-visible', $event)
    "
    @apply-show="$options.methods._emit(listeners, 'show')"
    @apply-hide="$options.methods._emit(listeners, 'hide')"
  >
    <slot></slot>

    <template #popper>
      <slot name="popover"></slot>
    </template>
  </v-dropdown>
</template>

<script>
export default {
  name: "ui-dropdown",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    autoHide: {
      type: Boolean,
      default: false,
    },
    triggers: {
      type: Array,
      default: () => ["click"],
    },
    direction: {
      type: String,
      default: "left",
      validator: (value) => ["left", "right"].includes(value),
    },
    placement: {
      type: String,
      default: "bottom",
      validator: (value) =>
        [
          "auto",
          "auto-start",
          "auto-end",
          "top",
          "top-start",
          "top-end",
          "right",
          "right-start",
          "right-end",
          "bottom",
          "bottom-start",
          "bottom-end",
          "left",
          "left-start",
          "left-end",
        ].includes(value),
    },
  },
  methods: {
    _emit(listeners, name, value) {
      listeners[name]?.(value);
    },
  },
};
</script>
