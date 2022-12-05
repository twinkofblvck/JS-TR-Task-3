import OPERANDS from "../types/operand-enum.js";
import * as Commands from "./commands.js";
import { UIButton, UIElement } from "./elements.js";
import { UIErrorListener, UIHistoryListener, UIMathListener } from "./listeners.js";


export default class CalculatorUIBuilder
{
  
  CreateDisplay(tag, classNames)
  {
    const display = new UIElement(tag, classNames, OPERANDS.ZERO);
    display.AddListener(new UIMathListener());
    return display;
  }

  CreateHistoryContainer(tag, classNames, snapshotClasses)
  {
    const [base, highlighted] = snapshotClasses;
    const historyContainer = new UIElement(
      tag, classNames, 
      `<div class="${base} ${highlighted}">Initial >> 0<div>`
    );
    historyContainer.AddListener(
      new UIHistoryListener(snapshotClasses)
    );
    return historyContainer;
  }

  CreateErrorContainer(tag, classNames, messageDelay)
  {
    const errorContainer = new UIElement(tag, classNames, "");
    errorContainer.AddListener(new UIErrorListener(messageDelay));
    return errorContainer;
  }

  CreateOperandButtons(operands, tag, classNames, commandReceiver)
  {
    const buttons = [];

    for(const key in operands)
    {
      const operand = operands[key];
      const button = new UIButton(tag, classNames, operand, 
        new Commands.WriteOperandCommand(commandReceiver, { operand }));

      buttons.push(button);
    }

    return buttons;
  }

  CreateOperatorButtons(operators, tag, classNames, commandReceiver)
  {
    const buttons = [];

    for(const key in operators)
    {
      const operator = new operators[key]();
      const button = new UIButton(tag, classNames, operator.htmlRepr, 
        new Commands.WriteOperatorCommand(commandReceiver, { operator }));

      buttons.push(button);
    }
    
    return buttons;
  }

  CreateUtilityButtons(commandMap, tag, classNames, commandReceiver)
  {
    const buttons = [];

    for(const key in commandMap)
    {
      const Command = commandMap[key];
      const button = new UIButton(tag, classNames, key, 
        new Command(commandReceiver));

      buttons.push(button);
    }
    
    return buttons;
  }

  CreateThemeButtons(themes, tag, classNames, commandReceiver)
  {
    const buttons = [];

    for(const key in themes)
    {
      const theme = themes[key];
      const button = new UIButton(tag, classNames, theme, 
        new Commands.ChangeThemeCommand(commandReceiver, { theme }));

      buttons.push(button);
    }
    
    return buttons;
  }
}