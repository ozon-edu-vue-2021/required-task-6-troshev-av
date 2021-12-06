import { orderBy as lodashOrderBy } from "lodash-es/collection";

export function orderBy(collection, sorts) {
  const props = [];
  const directions = [];

  sorts.forEach(({ prop, direction }) => {
    props.push(prop);
    directions.push(direction);
  });

  return lodashOrderBy(collection, props, directions);
}

export function filterBy(collection, filters) {
  return collection.filter((item) =>
    filters.every(({ prop, value }) => {
      const itemValue = `${item[prop]}`.toLowerCase();
      const substring = `${value}`.toLowerCase();

      return itemValue.includes(substring);
    })
  );
}

export function patchCollection(original, update, key) {
  const prop = update[key];
  const itemIndex = original.findIndex((item) => item[key] === prop);
  let result = original;

  if (itemIndex >= 0) {
    result = result.map((item) => (item[key] === prop ? update : item));
  } else {
    result = [...result, update];
  }

  return result;
}
