import "@testing-library/jest-dom";
import Input from "../../../src/utils/Input";

export default () => {
  document.body.innerHTML = `
    <div>
      <span></span>
      <input type="text" value="10, 20" />
    </div>
  `;

  const tests = [
    {
      element: null,
      isError: true,
      args: [],
      testMethod: {
        name: "toThrowError",
        args: ["The target must be an HTML element"],
      },
    },
    {
      element: document.querySelector("span"),
      isError: true,
      args: [],
      testMethod: {
        name: "toThrowError",
        args: ["Target must be a input"],
      },
    },
    {
      element: document.querySelector("input"),
      args: [{ useSpace: true, punctuationMarks: true, }],
      testMethod: {
        name: "toBeTruthy",
        args: [],
      },
    },
    {
      element: document.querySelector("input"),
      args: [{ useSpace: true, }],
      testMethod: {
        name: "toBeFalsy",
        args: [],
      },
    }
  ];

  return tests.map(({ testMethod, element, args, isError, }) => {
    return {
      testMethod,
      isError,
      setParams() {
        return new Input(element).onlyNumbers(...args);
      },
    };
  });
};