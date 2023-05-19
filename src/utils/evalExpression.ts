export const evalExpression = (expression: string) => {
  if (expression.includes("+")) {
    const numbers = expression.split("+");
    return Number(numbers[0]) + Number(numbers[1]);
  }

  if (expression.includes("-")) {
    const numbers = expression.split("-");
    return Number(numbers[0]) - Number(numbers[1]);
  }

  if (expression.includes("*")) {
    const numbers = expression.split("*");
    return Number(numbers[0]) * Number(numbers[1]);
  }

  if (expression.includes("/")) {
    const numbers = expression.split("/");
    return Number(numbers[0]) / Number(numbers[1]);
  }

  return Number(expression);
};
