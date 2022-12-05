import OPERANDS from "../types/operand-enum.js";


export default class Operand
{
  #value;

  constructor(initial_value)
  {
    this.#value = "" + initial_value;
  }

  get value()
  {
    return this.#value;
  }

  Extend(value)
  {
    if(this.#value === OPERANDS.ZERO && value !== OPERANDS.FRACTION) 
      return this.Overwrite(value);

    if(value === OPERANDS.FRACTION && this.#value.includes(OPERANDS.FRACTION)) 
      return false;

    this.#value += value;
    return true;
  }

  Overwrite(value)
  {
    if(this.#value === "" + value) return false;
    this.#value = "" + value;
    return true;
  }

  Negate()
  {
    if(+this.#value === 0) return false;
    this.#value = "" + -this.#value;
    return true;
  }
}