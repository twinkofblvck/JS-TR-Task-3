import { Operator, UnaryOperator } from "./abstract.js";
import POSITIONS from "../../types/positions-enum.js";

export class RootOperator extends Operator
{
  constructor()
  {
    super("√", "<sup>y</sup>√x");
  }

  _Calculate(left, right)
  {
    if(right % 2 === 0) return left ** (1 / right);
    
    const sign = left < 0 ? -1 : 1;
    if(left < 0) left = -left;

    return sign * (left ** (1 / right));
  }
}

export class SqrtOperator extends UnaryOperator
{
  constructor()
  {
    super("√2", "<sup>2</sup>√x", POSITIONS.RIGHT);
  }

  _Calculate(left, right)
  {
    return left ** 0.5;
  }
}

export class CbrtOperator extends UnaryOperator
{
  constructor()
  {
    super("√3", "<sup>3</sup>√x", POSITIONS.RIGHT);
  }

  _Calculate(left, right)
  {
    const sign = left < 0 ? -1 : 1;
    if(left < 0) left = -left;

    return sign * (left ** (1 / 3));
  }
}