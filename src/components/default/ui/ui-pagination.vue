<template>
  <div class="ui-pagination">
    <ul class="ui-pagination__list">
      <li
        v-for="button in buttonsList"
        :key="button.label"
        class="ui-pagination__list-item"
      >
        <ui-button
          class="ui-pagination__button"
          :label="button.label"
          size="small"
          :theme="button.theme"
          :is-disabled="button.disabled"
          @click="select(button.page)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import UiButton from "./ui-button";

import { PAGINATION_LENGTH_PROP_DEFAULT } from "@/utils/const";
import { getPaginationNumbers } from "@/utils/helpers";

export default {
  name: "ui-pagination",
  components: {
    UiButton,
  },
  model: {
    prop: "currentPage",
    event: "change",
  },
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
    length: {
      type: Number,
      default: PAGINATION_LENGTH_PROP_DEFAULT,
    },
  },
  computed: {
    isFirstPage() {
      return this.currentPage === 1;
    },
    isLastPage() {
      return this.currentPage === this.totalPages;
    },
    visibleNumbers() {
      const ARROW_BUTTONS_LENGTH = 4;
      const { currentPage, totalPages } = this;
      const length = this.length - ARROW_BUTTONS_LENGTH;

      return getPaginationNumbers(currentPage, totalPages, length);
    },
    buttonsList() {
      const BUTTON_THEME = "island";
      const ACTIVE_BUTTON_THEME = "primary";
      const { currentPage, isFirstPage, isLastPage, totalPages } = this;

      const visibleButtons = this.visibleNumbers.map((page) => {
        const isActive = page === currentPage;
        const theme = isActive ? ACTIVE_BUTTON_THEME : BUTTON_THEME;
        return {
          page,
          theme,
          label: `${page}`,
          disabled: false,
        };
      });

      visibleButtons.unshift(
        {
          page: 1,
          theme: BUTTON_THEME,
          label: "<<",
          disabled: isFirstPage,
        },
        {
          page: currentPage - 1,
          theme: BUTTON_THEME,
          label: "<",
          disabled: isFirstPage,
        }
      );

      visibleButtons.push(
        {
          page: currentPage + 1,
          theme: BUTTON_THEME,
          label: ">",
          disabled: isLastPage,
        },
        {
          page: totalPages,
          theme: BUTTON_THEME,
          label: ">>",
          disabled: isLastPage,
        }
      );

      return visibleButtons;
    },
  },
  methods: {
    _emitPage(page) {
      this.$emit("change", page);
    },

    select(page) {
      if (page === this.currentPage) return;

      this._emitPage(page);
    },
  },
};
</script>

<style>
.ui-pagination {
  display: flex;
}

.ui-pagination__list {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ui-pagination__list-item:nth-child(1n + 2) {
  margin-left: 0.25rem;
}

.ui-pagination__button {
  width: 2.5rem;
}
</style>
