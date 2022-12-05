import Operand from "../internals/operand";
import * as BasicOperators from "../internals/operators/basic.js";
import * as ExpOperators from "../internals/operators/exp.js";
import * as RootOperators from "../internals/operators/root.js";
import { FactorialOperator } from "../internals/operators/factorial.js";


test("ADD: 0.1 + 2 === 0.3", () => 
{
  const operator = new BasicOperators.AddOperator();
  expect(operator.PerformOperation(0.1, 0.2)).toBe(0.3);
});

test("SUBTRACT: 0.3 - 0.1 === 0.2", () =>
{
  const operator = new BasicOperators.SubtractOperator();
  expect(operator.PerformOperation(0.3, 0.1)).toBe(0.2);
});

test("MULTIPLY: 0.2 * 0.1 === 0.02", () => 
{
  const operator = new BasicOperators.MultiplyOperator();
  expect(operator.PerformOperation(0.2, 0.1)).toBe(0.02);
});

test("DIVIDE: 0.3 / 0.1 === 3", () => 
{
  const operator = new BasicOperators.DivideOperator();
  expect(operator.PerformOperation(0.3, 0.1)).toBe(3);
});

test("REMAINDER: 0.3 % 0.1 === 0.1", () =>
{
  const operator = new BasicOperators.RemainderOperator();
  expect(operator.PerformOperation(0.3, 0.1)).toBe(0.1);
});

test("EXP: 0.2 ^ 4 === 0.0016", () =>
{
  const operator = new ExpOperators.ExpOperator();
  expect(operator.PerformOperation(0.2, 4)).toBe(0.0016);
});

test("ROOT: root(276, 4) === 4.07593519647", () =>
{
  const operator = new RootOperators.RootOperator();
  expect(operator.PerformOperation(276, 4)).toBe(4.07593519647);
});

test("SQUARE: 1.6 ^ 2 === 2.56", () =>
{
  const operator = new ExpOperators.SquareOperator();
  expect(operator.PerformOperation(1.6)).toBe(2.56);
});

test("CUBE: 40.9 ^ 3 === 68417.929", () =>
{
  const operator = new ExpOperators.CubeOperator();
  expect(operator.PerformOperation(40.9)).toBe(68417.929);
});

test("SQRT: sqrt(1.21) === 1.1", () =>
{
  const operator = new RootOperators.SqrtOperator();
  expect(operator.PerformOperation(1.21)).toBe(1.1);
});

test("CBRT: cbrt(27) === 3", () =>
{
  const operator = new RootOperators.CbrtOperator();
  expect(operator.PerformOperation(27)).toBe(3);
});

test("10^x: 10 ^ -11 === 1e-11", () =>
{
  const operator = new ExpOperators.TenExpXOperator();
  expect(operator.PerformOperation(-11)).toBe(1e-11);
});

test("1/x: 1 / 1.1 === 0.909090909091", () =>
{
  const operator = new BasicOperators.OneDivXOperator();
  expect(operator.PerformOperation(1.1)).toBe(0.909090909091);
});

test("FACTORIAL: 10! === 3628800", () => 
{
  const operator = new FactorialOperator();
  expect(operator.PerformOperation(10)).toBe(3628800);
});

test("NEGATE: -(1) === -1", () =>
{
  const operand = new Operand(1);
  operand.Negate();
  expect(+operand.value).toBe(-1);
});

test("NEGATE[2]: -(-1) === 1", () =>
{
  const operand = new Operand(-1);
  operand.Negate();
  expect(+operand.value).toBe(1);
});


