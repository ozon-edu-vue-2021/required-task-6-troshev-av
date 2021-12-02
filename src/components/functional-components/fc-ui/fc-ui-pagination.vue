<script lang="jsx">
import UiButton from "./fc-ui-button";

import { getPaginationNumbers } from "@/utils/helpers";

const getVisibleNumbers = (currentPage, totalPages, visibleLength) => {
  const ARROW_BUTTONS_LENGTH = 4;
  const length = visibleLength - ARROW_BUTTONS_LENGTH;
  return getPaginationNumbers(currentPage, totalPages, length);
};

const getPaginationItems = (numbers, activeNum, totalLength) => {
  const BUTTON_THEME = "island";
  const ACTIVE_BUTTON_THEME = "primary";

  const getItemOptions = (page, theme, label, isDisabled = false) => {
    label = label || `${page}`;
    return { page, theme, label, isDisabled };
  };

  const isFirstPageActive = activeNum === 1;
  const isLastPageActive = activeNum === totalLength;
  const items = numbers.map((num) => {
    const isActive = num === activeNum;
    const theme = isActive ? ACTIVE_BUTTON_THEME : BUTTON_THEME;

    return getItemOptions(num, theme);
  });

  items.unshift(
    getItemOptions(1, BUTTON_THEME, "<<", isFirstPageActive),
    getItemOptions(activeNum - 1, BUTTON_THEME, "<", isFirstPageActive)
  );

  items.push(
    getItemOptions(activeNum + 1, BUTTON_THEME, ">", isLastPageActive),
    getItemOptions(totalLength, BUTTON_THEME, ">>", isLastPageActive)
  );

  return items;
};

const renderPaginationButton = (h, { label, theme, isDisabled, handler }) => {
  const BUTTON_SIZE = "small";
  return (
    <UiButton
      class="fc-ui-pagination__button"
      label={label}
      size={BUTTON_SIZE}
      theme={theme}
      is-disabled={isDisabled}
      onClick={handler}
    />
  );
};

const renderPaginationItems = (h, items, buttonClickHandler) => {
  return items.map((item) => {
    const handler = () => buttonClickHandler(item.page);
    const button = renderPaginationButton(h, { ...item, handler });

    return <li class="fc-ui-pagination__list-item">{button}</li>;
  });
};

export default {
  name: "fc-ui-pagination",
  functional: true,
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
      default: 11,
    },
  },
  render(h, { props, listeners }) {
    const buttonClickHandler = (num) => {
      listeners.change?.(num);
    };

    const visibleNumbers = getVisibleNumbers(
      props.currentPage,
      props.totalPages,
      props.length
    );
    const paginationItems = getPaginationItems(
      visibleNumbers,
      props.currentPage,
      props.totalPages
    );
    const list = renderPaginationItems(h, paginationItems, buttonClickHandler);

    return (
      <div class="fc-ui-pagination">
        <ul class="fc-ui-pagination__list">{list}</ul>
      </div>
    );
  },
};
</script>

<style>
.fc-ui-pagination {
  display: flex;
}

.fc-ui-pagination__list {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.fc-ui-pagination__list-item:nth-child(1n + 2) {
  margin-left: 0.25rem;
}

.fc-ui-pagination__button {
  width: 2.5rem;
}
</style>
