export default (target) => {
  return typeof target === "number" && !isNaN(target);
};