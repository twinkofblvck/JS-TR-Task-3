import { UnaryOperator } from "./abstract.js";
import POSITIONS from "../../types/positions-enum.js";

export class FactorialOperator extends UnaryOperator
{
  constructor()
  {
    super("!", "!", POSITIONS.RIGHT);
  }

  _Calculate(left, right)
  {
    if(left < 0 || !Number.isInteger(left)) return NaN;

    let result = 1;
    if(left === 0) return result;

    while(left > 1)
    {
      result *= left--;
    }
    
    return result;
  }
}
