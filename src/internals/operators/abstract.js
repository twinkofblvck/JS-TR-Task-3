export class Operator
{
  #alias;
  #htmlRepr;

  constructor(alias, htmlRepr)
  { 
    this.#alias = alias;
    this.#htmlRepr = htmlRepr;
  }

  get alias()
  {
    return this.#alias;
  }

  get htmlRepr()
  {
    return this.#htmlRepr;
  }

  PerformOperation(left, right)
  {
    return this.#Fixate(this.#Validate(this._Calculate(left, right)));
  }

  _Calculate(left, right)
  {
    return false;
  }

  #Fixate(value)
  {
    return +value.toPrecision(12);
  }

  #Validate(value)
  {
    if(Number.isNaN(value)) throw new Error("ILLEGAL OPERATION");
    else if(!Number.isFinite(value)) throw new Error("UNDEFINED / TOO LARGE");
    return value;
  }
}

export class UnaryOperator extends Operator
{
  #position;

  constructor(alias, htmlRepr, position)
  {
    super(alias, htmlRepr);
    this.#position = position;
  }

  get position()
  {
    return this.#position;
  }

}