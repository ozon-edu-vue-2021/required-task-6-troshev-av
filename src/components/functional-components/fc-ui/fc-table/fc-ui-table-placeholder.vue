<script>
export default {
  name: "fc-ui-table-placeholder",
  functional: true,
  render() {
    return (
      <div class="fc-ui-table-placeholder">Нет данных для отображения</div>
    );
  },
};
</script>

<style>
.fc-ui-table-placeholder {
  padding: 1rem;
  text-align: center;
  border: 1px solid;
  border-color: transparent hsl(var(--gray-light-hsl))
    hsl(var(--gray-light-hsl)) hsl(var(--gray-light-hsl));
  color: hsl(var(--gray-extra-dark-hsl));
}
</style>
