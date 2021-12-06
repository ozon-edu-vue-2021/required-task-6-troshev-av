<template>
  <fc-ui-dropdown
    class="fc-ui-table-filter-dropdown"
    :is-visible.sync="isVisible"
    direction="right"
    auto-hide
    @show="_onShowPopover()"
    @hide="_onHidePopover()"
  >
    <slot></slot>

    <template #popover>
      <form
        class="fc-ui-table-filter-dropdown__dropdown"
        @submit.prevent="setFilter()"
      >
        <fc-ui-input
          ref="field"
          v-model="innerFilterValue"
          placeholder="Найти в столбце"
          size="small"
        />

        <div class="fc-ui-table-filter-dropdown__actions">
          <fc-ui-button
            class="fc-ui-table-filter-dropdown__actions-unit"
            label="Поиск"
            type="submit"
            size="extra-small"
          />

          <fc-ui-button
            class="fc-ui-table-filter-dropdown__actions-unit"
            label="Сбросить"
            theme="island"
            size="extra-small"
            @click="resetFilter()"
          />
        </div>
      </form>
    </template>
  </fc-ui-dropdown>
</template>

<script>
import FcUiButton from "../fc-ui-button";
import FcUiDropdown from "../fc-ui-dropdown";
import FcUiInput from "../fc-ui-input";

export default {
  name: "fc-ui-table-filter-dropdown",
  components: {
    FcUiButton,
    FcUiDropdown,
    FcUiInput,
  },
  props: {
    filter: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isVisible: false,
      innerFilterValue: this.filter,
    };
  },
  methods: {
    _emitVisibility(value) {
      this.$emit("update:is-visible", value);
    },
    _emitFilter(value) {
      this.$emit("update:filter", value);
    },
    _emitResetFilter() {
      this.$emit("reset");
    },
    _onShowPopover() {
      this.focusField();
    },
    _onHidePopover() {
      this.innerFilterValue = this.filter;
    },

    focusField() {
      this.$nextTick(() => {
        this.$refs.field.focus();
      });
    },
    toggle(value = !this.isVisible) {
      this.isVisible = value;
    },
    setFilter() {
      this.toggle(false);

      if (this.innerFilterValue) {
        this._emitFilter(this.innerFilterValue);
      } else {
        this.resetFilter();
      }
    },
    resetFilter() {
      this.toggle(false);

      if (this.filter) {
        this._emitResetFilter();
      }
    },
  },
};
</script>

<style>
.fc-ui-table-filter-dropdown {
  display: flex;
}

.fc-ui-table-filter-dropdown__dropdown {
  min-width: 10rem;
}

.fc-ui-table-filter-dropdown__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.fc-ui-table-filter-dropdown__actions-unit:nth-child(1n + 2) {
  margin-left: 0.5rem;
}
</style>
