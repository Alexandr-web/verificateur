import "@testing-library/jest-dom";
import Verificateur from "../../../src/Verificateur";

export default () => {
  document.body.innerHTML = `
    <div>
      <span></span>
      <input type="file" />
      <input type="number" />
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
        args: ["The target must be of type file"],
      },
    },
    {
      element: document.querySelector("input[type=number]"),
      isError: true,
      args: [],
      testMethod: {
        name: "toThrowError",
        args: ["The target must be of type file"],
      },
    },
    {
      element: document.querySelector("input[type=file]"),
      args: ["string"],
      isError: true,
      testMethod: {
        name: "toThrowError",
        args: ["Argument must be of type number"],
      },
    },
    {
      element: document.querySelector("input[type=file]"),
      args: [10, Boolean],
      isError: true,
      testMethod: {
        name: "toThrowError",
        args: ["The second argument must be of type string"],
      },
    }
  ];

  return tests.map(({ testMethod, element, args, isError, }) => {
    return {
      testMethod,
      isError,
      setParams() {
        return Verificateur(element).weightLimit(...args);
      },
    };
  });
};