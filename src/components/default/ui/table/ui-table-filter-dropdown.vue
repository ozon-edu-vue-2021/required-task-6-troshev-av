<template>
  <ui-dropdown
    class="ui-table-filter-dropdown"
    :is-visible.sync="isVisible"
    direction="right"
    auto-hide
    @show="_onShowPopover()"
    @hide="_onHidePopover()"
  >
    <slot></slot>

    <template #popover>
      <form
        class="ui-table-filter-dropdown__dropdown"
        @submit.prevent="_onSubmitFilter()"
      >
        <UiInput
          ref="field"
          v-model="innerFilterValue"
          placeholder="Найти в столбце"
          size="small"
        />

        <div class="ui-table-filter-dropdown__actions">
          <UiButton
            class="ui-table-filter-dropdown__actions-unit"
            label="Поиск"
            type="submit"
            size="extra-small"
          />

          <UiButton
            class="ui-table-filter-dropdown__actions-unit"
            label="Сбросить"
            theme="island"
            size="extra-small"
            @click="_onResetFilter()"
          />
        </div>
      </form>
    </template>
  </ui-dropdown>
</template>

<script>
import UiButton from "../ui-button";
import UiDropdown from "../ui-dropdown";
import UiInput from "../ui-input";

export default {
  name: "ui-table-filter-dropdown",
  components: {
    UiButton,
    UiDropdown,
    UiInput,
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
    _onSubmitFilter() {
      this.toggle(false);
      this.setFilter();
    },
    _onResetFilter() {
      this.toggle(false);
      this.resetFilter();
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
      if (this.innerFilterValue) {
        this._emitFilter(this.innerFilterValue);
      } else {
        this.resetFilter();
      }
    },
    resetFilter() {
      if (this.filter) {
        this._emitResetFilter();
      }
    },
  },
};
</script>

<style>
.ui-table-filter-dropdown {
  display: flex;
}

.ui-table-filter-dropdown__dropdown {
  min-width: 10rem;
}

.ui-table-filter-dropdown__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.ui-table-filter-dropdown__actions-unit:nth-child(1n + 2) {
  margin-left: 0.5rem;
}
</style>
