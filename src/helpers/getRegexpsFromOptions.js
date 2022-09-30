export default (options, beginRegexp, value) => {
  const { amount, length, ignoreRegister, } = options;
  const defaultRegexp = new RegExp(`${beginRegexp}${length ? `{${length}}` : "+"}`, `${ignoreRegister ? "i" : ""}g`);
  const regexpForSymbols = new RegExp(beginRegexp, ignoreRegister ? "i" : "");
  const amountIsMatch = amount ? (value.match(defaultRegexp) || []).length >= amount : undefined;

  return {
    defaultRegexp,
    regexpForSymbols,
    amountIsMatch,
  };
};