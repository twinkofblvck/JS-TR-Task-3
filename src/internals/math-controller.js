import OPERANDS from "../types/operand-enum.js";
import Operand from "./operand.js";


export default class MathController
{
  #leftOperand;
  #rightOperand;
  #operator;

  constructor()
  {
    this.#rightOperand = this.#operator = null;
    this.#leftOperand = new Operand(0);  
  }

  get leftValue()
  {
    return this.#leftOperand.value;
  }

  get rightValue()
  {
    return this.#rightOperand?.value;
  }

  get operator()
  {
    return this.#operator;
  }

  WriteOperand(value)
  {
    let isSuccess = false;
    if(!this.#operator) isSuccess = this.#leftOperand.Extend(value);
    else if(this.#operator.position !== undefined) return isSuccess;
    else if(this.#rightOperand) isSuccess = this.#rightOperand.Extend(value);
    else 
    {
      this.#rightOperand = new Operand(value === OPERANDS.FRACTION ? 
        OPERANDS.ZERO + value : value
      );
      isSuccess = true;
    }

    return isSuccess;
  }

  WriteOperator(operator)
  {
    let isSuccess = false;
    if(this.#operator && (this.#rightOperand || this.#operator.position !== undefined)) 
      isSuccess = this.Evaluate();

    if(this.#operator?.alias === operator.alias) return false;
    this.#operator = operator;

    this.#leftOperand.Overwrite(+this.#leftOperand.value);

    isSuccess = true;
    return isSuccess;
  }

  Evaluate()
  {
    if(
      !this.#operator || 
      (!this.#rightOperand && this.#operator.position === undefined)
    ) return false;
    
    this.#leftOperand.Overwrite(this.#operator.PerformOperation(
      +this.#leftOperand.value, 
      +(this.#rightOperand?.value ?? 0)
    ));

    this.#rightOperand = this.#operator = null;

    return true;
  }

  ClearAll()
  {
    if(this.#leftOperand.value === OPERANDS.ZERO && !this.#operator && !this.#rightOperand)
      return false;
    this.#rightOperand = this.#operator = null;
    this.#leftOperand.Overwrite(0);

    return true;
  }

  Negate()
  {
    let isSuccess = false;
    if(!this.#operator || !this.#rightOperand) 
      isSuccess = this.#leftOperand.Negate();
    else if(this.#rightOperand)
      isSuccess = this.#rightOperand.Negate();

    return isSuccess;
  }

  GetOperationStr()
  {
    const order = 
    [
      (this.#leftOperand?.value ?? ""),
      (this.#operator?.alias ?? ""),
      (this.#rightOperand?.value ?? "")
    ];

    const pos = this.#operator?.position;
    if(pos === undefined) return order.join("");

    [order[pos], order[1]] = [order[1], order[pos]];

    return order.join("");
  }
}