export class History
{
  #stack;
  #head;

  constructor()
  {
    this.#stack = [];
    this.#head = -1;
  }

  Back()
  {
    if(this.#head <= 0) return;
    this.#stack[--this.#head].Restore();
    return this.#GetState();
  }

  Push(snapshot)
  {
    this.#stack.splice(++this.#head, Infinity, snapshot);
    return this.#GetState();
  }

  Forward()
  {
    if(this.#head >= this.#stack.length - 1) return;
    this.#stack[++this.#head].Restore();
    return this.#GetState();
  }

  #GetState()
  {
    return { stack: this.#stack, head: this.#head };
  }
}

export class Snapshot
{
  #origin;
  #state;
  #title;

  constructor(origin, title, state)
  {
    this.#origin = origin;
    this.#state = state;
    this.#title = title;
  }

  get title()
  {
    return this.#title;
  }

  Restore()
  {
    const { leftOperand, operator, rightOperand, memValue } = this.#state;

    this.#origin.ClearAll();
    
    this.#origin.WriteOperand(leftOperand);
    if(operator) this.#origin.WriteOperator(operator);
    if(rightOperand) this.#origin.WriteOperand(rightOperand);
    this.#origin.memValue = memValue;
  }
}
