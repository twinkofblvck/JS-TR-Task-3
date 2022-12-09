import CalculatorEngine from "./internals/calculator-engine.js";
import CalculatorUI from "./ui/calculator-ui.js";
import CalculatorUIBuilder from "./ui/calculator-ui-builder.js";
import "./style.css";

class Calculator
{
  #ui;
  #engine;

  constructor(ui, engine)
  {
    this.#ui = ui;
    this.#engine = engine;
  }

  Init()
  {
    this.#ui
      .CreateDisplay()
      .CreateHistoryContainer()
      .CreateErrorContainer()
      .CreateThemeContainer()
      .CreateOperandContainer(this.#engine)
      .CreateOperatorContainer(this.#engine)
      .CreateUtilityContainer(this.#engine)
      .ListenToEvents(this.#engine)
      .Mount();
  }
}

const calculator = new Calculator(
  new CalculatorUI(document.body, new CalculatorUIBuilder()),
  new CalculatorEngine()
);

calculator.Init();
