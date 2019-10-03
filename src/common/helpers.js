export function getElementWidth(elem) {
  return elem.getBoundingClientRect().width || elem.offsetWidth || 0;
}

export function getElementHeight(elem) {
  return elem.getBoundingClientRect().height || elem.offsetHeight || 0;
}

export function sortNumber(a, b) {
  return a - b;
}
