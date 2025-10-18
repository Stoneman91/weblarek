import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Buyer } from "../Models/Buyer";
import { Form } from "./form";

export class OrderForm extends Form {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;
  private _payment: string = '';
  private _address: string = '';

  constructor(events: IEvents, container: HTMLElement, private buyer: Buyer) {
    super(events, container, "order");

    this.cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
    this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
    this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

    this.cardButton.addEventListener("click", () => {
      this._payment = "card";
      this.cardButton.classList.add("button_alt-active");
      this.cashButton.classList.remove("button_alt-active");
      this.buyer.setData({ payment: "card" });
      this.valid = this._payment !== '' && this._address.trim() !== '';
    });

    this.cashButton.addEventListener("click", () => {
      this._payment = "cash";
      this.cardButton.classList.remove("button_alt-active");
      this.cashButton.classList.add("button_alt-active");
      this.buyer.setData({ payment: "cash" });
      this.valid = this._payment !== '' && this._address.trim() !== '';
    });

    this.addressInput.addEventListener("input", () => {
      this._address = this.addressInput.value;
      this.buyer.setData({ address: this.addressInput.value });
      this.valid = this._payment !== '' && this._address.trim() !== '';
    });
  }
}