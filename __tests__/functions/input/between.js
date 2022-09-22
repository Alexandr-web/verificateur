import "@testing-library/jest-dom";
import Input from "../../../src/utils/Input";

export default () => {
  document.body.innerHTML = `
    <div>
      <span></span>
      <input type="text" value="10" />
    </div>
  `;

  const examples = [
    {
      element: null,
      isError: true,
      args: [0, 10],
      testMethod: {
        name: "toThrowError",
        args: ["The target must be an HTML element"],
      },
    },
    {
      element: document.querySelector("span"),
      isError: true,
      args: [0, 10],
      testMethod: {
        name: "toThrowError",
        args: ["Target must be a input"],
      },
    },
    {
      element: document.querySelector("input"),
      isError: true,
      args: [0, false],
      testMethod: {
        name: "toThrowError",
        args: ["Argument must be of type number"],
      },
    },
    {
      element: document.querySelector("input"),
      args: [0, 4],
      testMethod: {
        name: "toBeFalsy",
        args: [],
      },
    }
  ];

  return examples.map(({ testMethod, element, args, isError, }) => {
    return {
      testMethod,
      isError,
      setParams() {
        return new Input(element).between(...args);
      },
    };
  });
};