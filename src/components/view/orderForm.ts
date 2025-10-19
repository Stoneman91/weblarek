import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Buyer } from "../Models/Buyer";
import { Form } from "./form";

export class OrderForm extends Form {
  protected cardButton: HTMLButtonElement;
  protected cashButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;

  constructor(events: IEvents, container: HTMLElement, private buyer: Buyer) {
    super(events, container, "order");

    this.cardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
    this.cashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
    this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

  this.cardButton.addEventListener("click", () => {
      this.buyer.setData({ payment: "card" });
    });


     this.cashButton.addEventListener("click", () => {
      this.buyer.setData({ payment: "cash" });
    });

      this.addressInput.addEventListener("input", () => {
      this.buyer.setData({ address: this.addressInput.value });
    });

  events.on('BuyerData:changed', () => {
      this.updateFormState();
    });
  }

  private updateFormState(): void {
    const data = this.buyer.getData();
    const errors = this.buyer.validate();

    this.cardButton.classList.toggle("button_alt-active", data.payment === "card");
    this.cashButton.classList.toggle("button_alt-active", data.payment === "cash");

    if (data.address) {
      this.addressInput.value = data.address;
    }

    const orderErrors: string[] = [];
    if (errors.payment) orderErrors.push(errors.payment);
    if (errors.address) orderErrors.push(errors.address);

    this.errors = orderErrors.join(', ');
    this.valid = orderErrors.length === 0;
  }

    set address(value: string) {
    this.addressInput.value = value;
    this.buyer.setData({ address: value });
  }
}