<template>
  <div id="app">
    <div class="app__mode">
      <select v-model="mode">
        <option v-for="item in options" :key="item.key" :value="item.key">
          {{ item.label }}
        </option>
      </select>
    </div>

    <component :is="view" />
  </div>
</template>

<script>
import FcTableWithInfiniteScroll from "@/components/examaple-tables/fc-table-with-infinite-scroll";
import FcTableWithPagination from "@/components/examaple-tables/fc-table-with-pagination";
import TableWithInfiniteScroll from "@/components/examaple-tables/table-with-infinite-scroll";
import TableWithPagination from "@/components/examaple-tables/table-with-pagination";

const OPTIONS = [
  { key: "hidden", label: "Скрыть все" },
  { key: "pagination", label: "Пагинация", component: TableWithPagination },
  {
    key: "infinity-scroll",
    label: "Бесконечный скролл",
    component: TableWithInfiniteScroll,
  },
  {
    key: "fc-pagination",
    label: "Функциональные с пагинацией",
    component: FcTableWithPagination,
  },
  {
    key: "fc-infinity-scroll",
    label: "Функциональные с бесконечным скроллом",
    component: FcTableWithInfiniteScroll,
  },
];

export default {
  name: "app",
  data() {
    return {
      mode: "pagination",
    };
  },
  computed: {
    options() {
      return OPTIONS;
    },
    selectedOption() {
      const { mode } = this;
      return this.options.find(({ key }) => key === mode);
    },
    view() {
      const { selectedOption } = this;
      return selectedOption ? selectedOption.component : null;
    },
  },
  beforeUpdate() {
    performance.mark("start");
  },
  updated() {
    performance.mark("end");
    performance.measure(
      `updated with ${this.selectedOption.label}`,
      "start",
      "end"
    );

    const measure = performance.getEntriesByType("measure")[0];

    // eslint-disable-next-line
    console.log(measure.name, measure.duration, measure);
    performance.clearMeasures();
  },
};
</script>

<style>
:root {
  --black-hsl: 210deg, 29%, 24%;
  --white-hsl: 0deg, 0%, 100%;
  --silver-hsl: 208deg, 12%, 96%;
  --silver-ligth-hsl: 208deg, 12%, 98%;
  --silver-dark-hsl: 208deg, 12%, 94%;
  --silver-extra-dark-hsl: 208deg, 12%, 92%;
  --gray-hsl: 218deg, 17%, 78%;
  --gray-light-hsl: 218deg, 17%, 88%;
  --gray-dark-hsl: 218deg, 17%, 68%;
  --gray-extra-dark-hsl: 218deg, 17%, 48%;
  --primary-hsl: 219deg, 100%, 50%;
  --primary-light-hsl: 219deg, 100%, 60%;
  --primary-dark-hsl: 219deg, 100%, 46%;
  --primary-extra-dark-hsl: 219deg, 100%, 42%;
  --danger-hsl: 359deg, 99%, 71%;
  --gutter: 1rem;
  --dropdown-zindex: 100;
}

#app {
  margin: 3rem 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  color: hsl(var(--black-hsl));
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app__mode {
  margin-bottom: 1rem;
}

.app__table-number-column {
  max-width: 12%;
}

.app__table-completed-column {
  max-width: 16%;
}
</style>
