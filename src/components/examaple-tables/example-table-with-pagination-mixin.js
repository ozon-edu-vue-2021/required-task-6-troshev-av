export default {
  methods: {
    async loadTodos() {
      const { total, list } = await this.fetchData({
        page: this.page,
        length: this.itemsPerPage,
        sorts: this.sorts,
        filters: this.filters,
      });

      this.totalCount = total;
      this.rows = Object.freeze(list);
    },
  },
};
