<template>
  <div class="ui-table-placeholder">Нет данных для отображения</div>
</template>

<script>
export default {
  name: "ui-table-placeholder",
};
</script>

<style>
.ui-table-placeholder {
  padding: 1rem;
  text-align: center;
  border: 1px solid;
  border-color: transparent hsl(var(--gray-light-hsl))
    hsl(var(--gray-light-hsl)) hsl(var(--gray-light-hsl));
  color: hsl(var(--gray-extra-dark-hsl));
}
</style>
