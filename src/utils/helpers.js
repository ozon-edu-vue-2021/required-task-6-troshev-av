import { arrayFromRange } from "./array";

export function getPaginationNumbers(current, total, length) {
  const offsetPerSide = Math.floor((length - 1) / 2);
  let start = current - offsetPerSide;
  let end = current + offsetPerSide;

  if (start < 1) {
    // если упирается в начало
    start = 1;
    end = Math.min(length, total); // компенсируем кол-во дополнительными кнопками в конец
  } else if (end > total) {
    // если упирается в конец
    start = Math.max(total - length + 1, 1); // компенсируем кол-во дополнительными кнопками в начале
    end = total;
  }

  return arrayFromRange(start, end);
}
