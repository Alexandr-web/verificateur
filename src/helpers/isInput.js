export default (target) => {
  return ["input", "textarea"].includes(target.nodeName.toLowerCase());
};