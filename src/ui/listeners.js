class UIEventListener
{
  OnUpdate(target, value)
  {
    return false;
  }
}

export class UIMathListener extends UIEventListener
{
  OnUpdate(target, value) 
  {
    target.textContent = value;
    target.scrollLeft = target.scrollWidth;
  }
}

export class UIErrorListener extends UIEventListener
{
  #timer;
  #duration;

  constructor(message_duration)
  {
    super();
    this.#timer = null;
    this.#duration = message_duration;
  }

  OnUpdate(target, value)
  {
    if(this.#timer) clearTimeout(this.#timer);
    target.textContent = "ERROR! " + value;
    this.#timer = setTimeout(() => 
    {
      target.textContent = "";
      this.#timer = null;
    }, this.#duration);
  }
}

export class UIHistoryListener extends UIEventListener
{
  #snapshotClasses;

  constructor(snapshotClasses)
  {
    super();
    this.#snapshotClasses = snapshotClasses;
  }

  OnUpdate(target, history)
  {
    const { stack, head } = history;
    if (!stack) return; 

    const [base, highlighted, greyed] = this.#snapshotClasses;
    
    target.innerHTML = stack.map((snapshot, i) =>
    {
      let classNames = [base];
      if(i === head) classNames.push(highlighted);
      if(i > head) classNames.push(greyed);
      return `
        <div class="${classNames.join(" ")}">${snapshot.title}</div>
      `;
    }).join("\n");
  }
}

