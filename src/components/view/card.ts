import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface ICardActions {
  onClick?: (event: MouseEvent) => void;
}

export abstract class Card<T> extends Component<T> {
  protected _title: HTMLElement;
  protected _price: HTMLElement;
  protected _actions?: ICardActions;

  constructor(protected container: HTMLElement) {
    super(container);
    this._title = ensureElement<HTMLElement>(".card__title", this.container);
    this._price = ensureElement<HTMLElement>(".card__price", this.container);
    if (this._actions?.onClick) {
      this.container.addEventListener("click", this._actions.onClick);
    }
  }

  set title(value: string) {
    this._title.textContent = value;
  }

  set price(value: string | number) {
    this._price.textContent = `${value} синапсов`;
  }
}
