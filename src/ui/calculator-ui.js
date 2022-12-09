import THEMES from "../types/themes-enum.js";
import { UIButton, UIWrapper } from "./elements.js";
import * as Commands from "./commands.js";
import OPERANDS from "../types/operand-enum.js";
import * as BasicOperators from "../internals/operators/basic.js";
import * as ExpOperators from "../internals/operators/exp.js";
import * as RootOperators from "../internals/operators/root.js";
import { FactorialOperator } from "../internals/operators/factorial.js";
import EVENTS from "../types/events_enum.js";

export default class CalculatorUI
{
  #root;
  #mainWrapper;
  #display;
  #historyContainer;
  #errorContainer;
  #themeContainer;
  #operandContainer;
  #operatorContainer;
  #utilityContainer;

  #builder;

  constructor(root, builder)
  {
    this.#root = root;
    this.#display = null;
    this.#errorContainer = null;
    this.#historyContainer = null;
    this.#mainWrapper = new UIWrapper("div", ["main-wrapper"], "");

    this.#builder = builder;

    const savedTheme = localStorage.getItem("theme");
    if(savedTheme) this.ChangeTheme(savedTheme);
  }

  ListenToEvents(eventEmitter)
  {
    eventEmitter.SubscribeForEvents(this.#display, EVENTS.MATH);
    eventEmitter.SubscribeForEvents(this.#historyContainer, EVENTS.HISTORY);
    eventEmitter.SubscribeForEvents(this.#errorContainer, EVENTS.ERROR);
    return this;
  }

  ChangeTheme(theme)
  {
    if(!this.#root) return;
    this.#root.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }

  CreateDisplay()
  {
    this.#display = this.#builder.CreateDisplay("div", ["display"]);
    return this;
  }

  CreateHistoryContainer()
  {
    const snapshotClasses = ["snapshot", "highlighted", "greyed"];
    this.#historyContainer = this.#builder.CreateHistoryContainer("div", ["history"], snapshotClasses);
    return this;
  }

  CreateErrorContainer()
  {
    this.#errorContainer = this.#builder.CreateErrorContainer("div", ["error-container"], 2000);
    return this;
  }

  CreateThemeContainer()
  {
    this.#themeContainer = new UIWrapper("div", ["theme-wrapper"], "");

    this.#themeContainer.AddChildren(
      this.#builder.CreateThemeButtons(THEMES, "button", ["theme-btn"], this)
    );
    return this;
  }

  CreateOperandContainer(commandReceiver)
  {
    this.#operandContainer = new UIWrapper("div", ["section-wrapper"], "");

    this.#operandContainer.AddChildren(
      this.#builder.CreateOperandButtons(OPERANDS, "button", ["digit-btn"], commandReceiver)
    );
    this.#operandContainer.AddChildren(
      [new UIButton("button", ["digit-btn"], "+/-", new Commands.NegateCommand(commandReceiver))]
    );
    return this;
  }

  CreateOperatorContainer(commandReceiver)
  {
    this.#operatorContainer = new UIWrapper("div", ["section-wrapper"], "");

    const operators = [BasicOperators, ExpOperators, { ...RootOperators, FactorialOperator }];

    for(let i = 0; i < operators.length; i++)
      this.#operatorContainer.AddChildren(
        this.#builder.CreateOperatorButtons(operators[i], "button", ["digit-btn", "operator"], commandReceiver)
      );

    this.#operatorContainer.AddChildren([
      new UIButton("button", ["digit-btn", "equals"], "=", new Commands.EvaluateCommand(commandReceiver))
    ]);
    return this;
  }

  CreateUtilityContainer(commandReceiver)
  {
    this.#utilityContainer = new UIWrapper("div", ["section-wrapper", "full"], "");
    const UtilityCommandsMap = 
    {
      "AC": Commands.ClearAllCommand,
      "MS": Commands.MemSaveCommand,
      "MR": Commands.MemReadCommand,
      "MC": Commands.MemClearCommand,
      "M+": Commands.MemAddCommand,
      "M-": Commands.MemSubtractCommand,
      "<-": Commands.UndoCommand,
      "->": Commands.RedoCommand
    };

    this.#utilityContainer.AddChildren(
      this.#builder.CreateUtilityButtons(UtilityCommandsMap, "button", ["digit-btn", "utility"], commandReceiver)
    );
    return this;
  }

  Mount()
  {
    this.#mainWrapper.AddChildren([
      this.#display, 
      this.#operandContainer,
      this.#operatorContainer,
      this.#utilityContainer,
      this.#errorContainer
    ]);

    this.#themeContainer.InjectIntoDOM(this.#root);
    this.#mainWrapper.InjectIntoDOM(this.#root);
    this.#historyContainer.InjectIntoDOM(this.#root);
  }
}