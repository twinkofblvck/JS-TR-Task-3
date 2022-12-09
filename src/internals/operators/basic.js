import { Operator, UnaryOperator } from "./abstract.js";
import POSITIONS from "../../types/positions-enum.js";

export class AddOperator extends Operator
{
  constructor()
  {
    super("+", "+");
  }

  _Calculate(left, right)
  {
    return left + right;
  }
}

export class SubtractOperator extends Operator
{
  constructor()
  {
    super("-", "-");
  }

  _Calculate(left, right)
  {
    return left - right;
  }
}

export class MultiplyOperator extends Operator
{
  constructor()
  {
    super("*", "×");
  }

  _Calculate(left, right)
  {
    return left * right;
  }
}

export class DivideOperator extends Operator
{
  constructor()
  {
    super("/", "÷");
  }

  _Calculate(left, right)
  {
    return left / right;
  }
}

export class RemainderOperator extends Operator
{
  constructor()
  {
    super("%", "%");
  }

  _Calculate(left, right)
  {
    return left % right;
  }
}

export class OneDivXOperator extends UnaryOperator
{
  constructor()
  {
    super("1/", "1/x", POSITIONS.LEFT);
  }

  _Calculate(left, right)
  {
    return 1 / left;
  }
}