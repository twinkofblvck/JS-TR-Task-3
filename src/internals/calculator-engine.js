import OPERANDS from "../types/operand-enum.js";
import { History, Snapshot } from "./history.js";
import MathController from "./math-controller.js";
import EventManager from "./event-manager.js";
import EVENTS from "../types/events_enum.js";
import { AddOperator, SubtractOperator } from "./operators/basic.js";

export default class CalculatorEngine
{
  #memValue;

  #history;
  #eventManager;
  #mathController;

  constructor()
  {
    this.#eventManager = new EventManager();

    this.#mathController = new MathController();
    this.MemClear();
    
    this.#history = new History(this.#eventManager);
    this.CreateSnapshot("Initial");
  }

  set memValue(value)
  {
    this.#memValue = value;
  }

  WriteOperator(operator)
  {
    try
    {
      const isSuccess = this.#mathController.WriteOperator(operator);
      if(isSuccess) this.#SuggestMathUpdate();
      return isSuccess;
    }
    catch ({ message })
    {
      this.#ThrowError(message);
      return false;
    } 
  }

  WriteOperand(value)
  {
    const isSuccess = this.#mathController.WriteOperand(value);
    if(isSuccess) this.#SuggestMathUpdate();
    return isSuccess;
  }

  Evaluate()
  {    
    try
    {
      const isSuccess = this.#mathController.Evaluate();
      if(isSuccess) this.#SuggestMathUpdate();
      return isSuccess;
    }
    catch ({ message })
    {
      this.#ThrowError(message);
      return false;
    }
  }

  SubscribeForEvents(object, eventType)
  {
    this.#eventManager.Subscribe(object, eventType);
  }

  ClearAll()
  {
    const isSuccess = this.#mathController.ClearAll();
    if(isSuccess) this.#SuggestMathUpdate();
    return isSuccess;
  }

  Negate()
  {
    const isSuccess = this.#mathController.Negate();
    if(isSuccess) this.#SuggestMathUpdate();
    return isSuccess;
  }

  MemSave()
  {
    if(+this.#mathController.leftValue === this.#memValue) return false;
    this.#memValue = +this.#mathController.leftValue;
    return true;
  }

  MemRead()
  {
    if(
      this.#mathController.leftValue === "" + this.#memValue && 
      !this.#mathController.operator && 
      !this.#mathController.rightOperand
    ) return false;

    this.ClearAll();
    this.WriteOperand(this.#memValue);

    this.#SuggestMathUpdate();
    return true;
  }

  MemClear()
  {
    if(this.#memValue === 0) return false;
    
    this.#memValue = 0;
    return true;
  }

  MemAdd()
  {
    if(this.#mathController.leftValue === OPERANDS.ZERO) return false;

    const addOperator = new AddOperator();

    this.#memValue = addOperator.PerformOperation(
      this.#memValue, +this.#mathController.leftValue
    );
    return true;
  }

  MemSubtract()
  {
    if(this.#mathController.leftValue === OPERANDS.ZERO) return false;

    const subtractOperator = new SubtractOperator();

    this.#memValue = subtractOperator.PerformOperation(
      this.#memValue, +this.#mathController.leftValue
    );
    return true;
  }

  CreateSnapshot(title)
  {
    const state = 
    {
      leftOperand: this.#mathController.leftValue,
      rightOperand: this.#mathController.rightValue,
      operator: this.#mathController.operator,
      memValue: this.#memValue
    };

    const historyState = this.#history.Push(
      new Snapshot(this, title + " >> " + this.#mathController.GetOperationStr(), state)
    );
    this.#SuggestHistoryUpdate(historyState);
  }

  Undo()
  {
    const response = this.#history.Back();
    if(!response) return; 
    this.#SuggestHistoryUpdate(response);
  }

  Redo()
  {
    const response = this.#history.Forward();
    if(!response) return; 
    this.#SuggestHistoryUpdate(response);
  }

  #SuggestMathUpdate()
  {
    this.#eventManager.FireAnEvent(this.#mathController.GetOperationStr(), EVENTS.MATH);
  }

  #SuggestHistoryUpdate(historyState)
  {
    this.#eventManager.FireAnEvent(historyState, EVENTS.HISTORY);
  }

  #ThrowError(message)
  {
    this.#eventManager.FireAnEvent(message, EVENTS.ERROR);
  }
}