import Input from "./utils/Input";

const classes = [Input];

export default (target) => {
  return classes.reduce((acc, objClass) => {
    Object.getOwnPropertyNames(objClass.prototype).filter((methodName) => methodName !== "constructor").map((methodName) => {
      acc[methodName] = objClass.prototype[methodName].bind(target);
    });

    return acc;
  }, {});
};