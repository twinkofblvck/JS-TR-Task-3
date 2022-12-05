export default class EventManager 
{
  #subscribers;

  constructor() 
  {
    this.#subscribers = [];
  }

  Subscribe(object, eventType) 
  {
    this.#subscribers.push({ object, eventType });
  }

  FireAnEvent(value, eventType) 
  {
    const appropriate = this.#subscribers.filter(sub => sub.eventType === eventType);
    if(!appropriate.length) return;

    for (let i = 0; i < appropriate.length; i++)
      appropriate[i].object.OnUpdate(value);
  }
}
