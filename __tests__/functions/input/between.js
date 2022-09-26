import "@testing-library/jest-dom";
import Verificateur from "../../../src/Verificateur";

export default () => {
  document.body.innerHTML = `
    <div>
      <span></span>
      <input type="text" value="10" />
    </div>
  `;

  const tests = [
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
        args: ["The target must be one of the following: input, textarea, select, datalist or output"],
      },
    },
    {
      element: document.querySelector("input"),
      isError: true,
      args: [0, false],
      testMethod: {
        name: "toThrowError",
        args: ["Arguments must be of type number"],
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

  return tests.map(({ testMethod, element, args, isError, }) => {
    return {
      testMethod,
      isError,
      setParams() {
        return Verificateur(element).between(...args);
      },
    };
  });
};