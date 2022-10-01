import Input from "./methods/Input";
import File from "./methods/File";

const classes = [Input, File];

export default (target) => {
	// Получение и возвращение методов классов с заменой контекста на аргумент target
	return classes.reduce((acc, objClass) => {
		Object.getOwnPropertyNames(objClass.prototype).filter((methodName) => methodName !== "constructor").map((methodName) => {
			acc[methodName] = objClass.prototype[methodName].bind(target);
		});

		return acc;
	}, {});
};