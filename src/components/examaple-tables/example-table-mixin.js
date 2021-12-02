import { fetchTodos } from "@/services/todos";

export default {
  data() {
    return {
      rows: [],
      totalCount: 0,
      page: 1,
      itemsPerPage: 20,
      sorts: [],
      filters: [],
      isLoading: false,
    };
  },
  created() {
    this.loadTodos();
  },
  computed: {
    headers() {
      return [
        {
          prop: "id",
          label: "ID",
          sortable: true,
          class: "app__table-number-column",
        },
        {
          prop: "userId",
          label: "User ID",
          sortable: true,
          filterable: true,
          class: "app__table-number-column",
        },
        {
          prop: "title",
          label: "Title",
          filterable: true,
        },
        {
          prop: "completed",
          label: "Completed",
          sortable: true,
          class: "app__table-completed-column",
        },
      ];
    },
  },
  methods: {
    async fetchData(params) {
      this.isLoading = true;

      try {
        return await fetchTodos(params);
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
