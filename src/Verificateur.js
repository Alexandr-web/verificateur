import Input from "./methods/Input";
import File from "./methods/File";
import Ajax from "./methods/Ajax";

const classes = [
	{
		classObj: Input,
		className: "Input",
		useConstructor: false,
	},
	{
		classObj: File,
		className: "File",
		useConstructor: false,
	},
	{
		classObj: Ajax,
		className: "Ajax",
		useConstructor: true,
	}
];

export default (target) => {
	return classes.reduce((acc, { classObj, useConstructor, className, }) => {
		// Получение и возвращение методов классов с заменой контекста на аргумент target (если отключена опция useConstructor)
		if (!useConstructor) {
			Object
				.getOwnPropertyNames(classObj.prototype)
				.filter((methodName) => methodName !== "constructor")
				.map((methodName) => {
					acc[methodName] = classObj.prototype[methodName].bind(target);
				});
		} else {
			// Добавление класса в объект
			acc[className] = classObj;
		}

		return acc;
	}, {});
};