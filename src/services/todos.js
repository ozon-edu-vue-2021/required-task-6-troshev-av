import { filterBy, orderBy } from "@/utils/collection";

export async function fetchTodos({ page = 1, length, sorts, filters } = {}) {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  let list = await response.json();

  if (filters) {
    list = filterBy(list, filters);
  }

  if (sorts) {
    list = orderBy(list, sorts);
  }

  const total = list.length;
  const startIndex = (page - 1) * length || 0;
  const endIndex = page * length || total;

  list = list.slice(startIndex, endIndex);

  return { total, list };
}
