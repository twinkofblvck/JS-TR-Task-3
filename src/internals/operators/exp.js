import { Operator, UnaryOperator } from "./abstract.js";
import POSITIONS from "../../types/positions-enum.js";

export class ExpOperator extends Operator
{
  constructor()
  {
    super("^", "x<sup>y</sup>");
  }

  _Calculate(left, right)
  {
    return left ** right;
  }
}

export class SquareOperator extends UnaryOperator
{
  constructor()
  {
    super("^2", "x<sup>2</sup>", POSITIONS.RIGHT);
  }

  _Calculate(left, right)
  {
    return left ** 2;
  }
}

export class CubeOperator extends UnaryOperator
{
  constructor()
  {
    super("^3", "x<sup>3</sup>", POSITIONS.RIGHT);
  }

  _Calculate(left, right)
  {
    return left ** 3;
  }
}

export class TenExpXOperator extends UnaryOperator
{
  constructor()
  {
    super("10^", "10<sup>x</sup>", POSITIONS.LEFT);
  }

  _Calculate(left, right)
  {
    return 10 ** left;
  }
}