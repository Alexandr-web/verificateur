export default (target) => {
  return target.nodeName.toLowerCase() === "input" && target.type === "file";
};