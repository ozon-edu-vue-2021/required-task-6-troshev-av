export default {
  data() {
    return {
      fetchRequest: null,
    };
  },

  methods: {
    async loadTodos() {
      this.fetchRequest = this.fetchData({
        page: this.page,
        length: this.itemsPerPage,
        sorts: this.sorts,
        filters: this.filters,
      });

      const { total, list } = await this.fetchRequest;

      this.totalCount = total;
      this.rows = Object.freeze(list);
    },
    async loadMoreTodos() {
      if (this.fetchRequest) {
        await this.fetchRequest;
      }

      const newPage = this.page + 1;

      this.fetchRequest = this.fetchData({
        page: newPage,
        length: this.itemsPerPage,
        sorts: this.sorts,
        filters: this.filters,
      });

      const { total, list } = await this.fetchRequest;

      this.page = newPage;
      this.totalCount = total;
      this.rows = Object.freeze([...this.rows, ...list]);
    },
  },
};
