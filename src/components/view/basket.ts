import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
  items: HTMLElement[];
  total: number;
}

export class Basket extends Component<IBasket> {
  protected basketList: HTMLElement;
  protected basketPrice: HTMLElement;
  protected basketButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.basketList = ensureElement<HTMLElement>(
      ".basket__list",
      this.container
    );
    this.basketPrice = ensureElement<HTMLElement>(
      ".basket__price",
      this.container
    );
    this.basketButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container
    );

    this.basketButton.addEventListener("click", () => {
      this.events.emit("basket:order");
    });
  }

  set items(items: HTMLElement[]) {
    this.basketList.replaceChildren(...items);
  }

  set total(value: number) {
    this.basketPrice.textContent = `${value} синапсов`;
  }

  set disabled(value: boolean) {
    this.basketButton.disabled = value;
  }
}
