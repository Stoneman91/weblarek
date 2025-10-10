import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./form";

interface IOrderForm {
  payment: string;
  address: string;
}

export class OrderForm extends Form<IOrderForm> {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;

  constructor(events: IEvents, container: HTMLElement) {
    super(events, container, "order");

    this.cardButton = ensureElement<HTMLButtonElement>(
      'button[name="card"]',
      this.container
    );
    this.cashButton = ensureElement<HTMLButtonElement>(
      'button[name="cash"]',
      this.container
    );
    this.addressInput = ensureElement<HTMLInputElement>(
      'input[name="address"]',
      this.container
    );

    this.cardButton.addEventListener("click", () => (this.payment = "card"));
    this.cashButton.addEventListener("click", () => (this.payment = "cash"));
    this.addressInput.addEventListener("input", () =>
      this.events.emit("order:address", { address: this.addressInput.value })
    );
  }

  set payment(value: string) {
    this.cardButton.classList.toggle("button_alt-active", value === "card");
    this.cashButton.classList.toggle("button_alt-active", value === "cash");
    this.events.emit("order:payment", { payment: value });
  }

  set address(value: string) {
    this.addressInput.value = value;
  }
}
