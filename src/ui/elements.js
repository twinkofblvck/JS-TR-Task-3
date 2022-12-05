export class UIElement 
{
  _domElement;
  _tag;
  _classNames;
  _listeners;

  constructor(tag, classNames, content) 
  {
    this._domElement = null;
    this._tag = tag;
    this._classNames = classNames;
    this._content = content;
    this._listeners = [];
  }

  InjectIntoDOM(root) 
  {
    this._domElement = document.createElement(this._tag);

    if (this._classNames) this._domElement.classList.add(...this._classNames);
    this._domElement.innerHTML = this._content;

    root.append(this._domElement);
  }

  AddListener(listener)
  {
    this._listeners.push(listener);
  }

  OnUpdate(value)
  {
    if(!this._listeners.length) return;
    for(let i = 0; i < this._listeners.length; i++)
      this._listeners[i].OnUpdate(this._domElement, value);
  }
}

export class UIWrapper extends UIElement 
{
  #children;

  constructor(tag, classNames, content) 
  {
    super(tag, classNames, content);
    this.#children = [];
  }

  AddChildren(children) 
  {
    this.#children.push(...children);
  }

  InjectIntoDOM(root) 
  {
    super.InjectIntoDOM(root);

    if (!this.#children.length) return;

    for (let i = 0; i < this.#children.length; i++)
      this.#children[i].InjectIntoDOM(this._domElement);
  }

  OnUpdate(value)
  {
    super.OnUpdate(value);

    for(let i = 0; i < this.#children.length; i++)
      this.#children[i].OnUpdate(value);
  }
}

export class UIButton extends UIElement 
{
  #command;

  constructor(tag, classNames, content, command) 
  {
    super(tag, classNames, content);
    this.#command = command;
  }

  InjectIntoDOM(root) 
  {
    super.InjectIntoDOM(root);
    this._domElement.addEventListener("click", this.#OnClick.bind(this));
  }

  #OnClick() 
  {
    this.#command.RunByTemplate();
  }
}


