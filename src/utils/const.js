export const ARRAY_PROP_DEFAULT = () => [];

export const TABLE_ITEMS_PER_PAGE_PROP_DEFAULT = 20;
export const TABLE_HEADERS_PROP_VALIDATOR = (headers) =>
  headers.every((column) => "prop" in column && "label" in column);

export const PAGINATION_LENGTH_PROP_DEFAULT = 11;
