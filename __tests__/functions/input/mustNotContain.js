import "@testing-library/jest-dom";
import Verificateur from "../../../src/Verificateur";

export default () => {
  document.body.innerHTML = `
    <div>
      <span></span>
      <input type="text" value="123 $! 321" />
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
        args: ["The target must be one of the following: input, textarea, select, datalist or output"],
      },
    },
    {
      element: document.querySelector("input"),
      isError: true,
      args: [],
      testMethod: {
        name: "toThrowError",
        args: ["Argument must be of type object"],
      },
    },
    {
      element: document.querySelector("input"),
      args: [{
        numbers: {
          start: [0, 7],
          end: [2, 9],
        },
        spaces: { points: [3, 6], },
        other: { $: true, "!": true, },
      }],
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
        return Verificateur(element).mustNotContain(...args);
      },
    };
  });
};