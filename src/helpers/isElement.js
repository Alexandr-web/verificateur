export default (item) => {
  return item instanceof Element || item instanceof HTMLElement;
};