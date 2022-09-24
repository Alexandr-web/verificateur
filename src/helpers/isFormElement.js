export default (target) => {
  return ["input", "textarea", "select", "datalist", "output"].includes(target.nodeName.toLowerCase());
};