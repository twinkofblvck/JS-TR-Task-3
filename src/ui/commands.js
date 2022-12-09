class EmptyCommand
{
  _receiver;

  constructor(receiver)
  {
    this._receiver = receiver;
  }

  RunByTemplate()
  {
    this.Exec();
  }

  Exec()
  {
    return false;
  }
}

class CommandWithParams extends EmptyCommand
{
  _params;

  constructor(receiver, params)
  {
    super(receiver);
    this._params = params;
  }
}

const undoMixin = Super => class extends Super
{
  _name;

  RunByTemplate()
  {
    if(!this.Exec()) return;
    this.#SuggestBackup();
  }

  #SuggestBackup()
  {
    this._receiver.CreateSnapshot(this._name);
  }
};

export class WriteOperandCommand extends undoMixin(CommandWithParams)
{
  _name = `Operand ( ${this._params.operand} )`;

  Exec()
  {
    return this._receiver.WriteOperand(this._params.operand);
  }
}

export class WriteOperatorCommand extends undoMixin(CommandWithParams)
{
  _name = `Operator ( ${this._params.operator.alias} )`;

  Exec()
  {
    return this._receiver.WriteOperator(this._params.operator);
  }
}

export class EvaluateCommand extends undoMixin(EmptyCommand)
{
  _name = "Evaluate";

  Exec()
  {
    return this._receiver.Evaluate();
  }
}

export class ClearAllCommand extends undoMixin(EmptyCommand)
{
  _name = "Clear All";

  Exec()
  {
    return this._receiver.ClearAll();
  }
}

export class NegateCommand extends undoMixin(EmptyCommand)
{
  _name = "Negate";

  Exec()
  {
    return this._receiver.Negate();
  }
}

export class MemSaveCommand extends undoMixin(EmptyCommand)
{
  _name = "Memory Save";

  Exec()
  {
    return this._receiver.MemSave();
  }
}

export class MemReadCommand extends undoMixin(EmptyCommand)
{
  _name = "Memory Read";

  Exec()
  {
    return this._receiver.MemRead();
  }
}

export class MemClearCommand extends undoMixin(EmptyCommand)
{
  _name = "Memory Clear";

  Exec()
  {
    return this._receiver.MemClear();
  }
}

export class MemAddCommand extends undoMixin(EmptyCommand)
{
  _name = "Memory +";

  Exec()
  {
    return this._receiver.MemAdd();
  }
}

export class MemSubtractCommand extends undoMixin(EmptyCommand)
{
  _name = "Memory -";

  Exec()
  {
    return this._receiver.MemSubtract();
  }
}

export class UndoCommand extends EmptyCommand
{
  Exec()
  {
    return this._receiver.Undo();
  }
}

export class RedoCommand extends EmptyCommand
{
  Exec()
  {
    return this._receiver.Redo();
  }
}

export class ChangeThemeCommand extends CommandWithParams
{
  Exec()
  {
    return this._receiver.ChangeTheme(this._params.theme);
  }
}
