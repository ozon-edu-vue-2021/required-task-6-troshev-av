<template>
  <v-dropdown
    :shown="isVisible"
    :triggers="triggers"
    :auto-hide="autoHide"
    placement="bottom-end"
    @update:shown="_emitEvent('update:is-visible', $event)"
    @apply-show="_emitEvent('show')"
    @apply-hide="_emitEvent('hide')"
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
    _emitEvent(name, value) {
      this.$emit(name, value);
    },
  },
};
</script>

<style>
.v-popper__inner {
  padding: 1rem !important;
}
</style>
