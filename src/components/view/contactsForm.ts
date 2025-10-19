import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Buyer } from "../Models/Buyer";
import { Form } from "./form";

export class ContactsForm extends Form {
  protected _emailInput: HTMLInputElement;
  protected _phoneInput: HTMLInputElement;

  constructor(events: IEvents, container: HTMLElement, private buyer: Buyer) {
    super(events, container, "contacts");

    this._emailInput = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container
    );
    this._phoneInput = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container
    );

    this._emailInput.addEventListener("input", () => {
      this.buyer.setData({ email: this._emailInput.value });
    });

    this._phoneInput.addEventListener("input", () => {
      this.buyer.setData({ phone: this._phoneInput.value });
    });

    events.on("BuyerData:changed", () => {
      this.updateFormState();
    });
  }

  private updateFormState(): void {
    const data = this.buyer.getData();
    const errors = this.buyer.validate();
    if (data.email) {
      this._emailInput.value = data.email;
    }
    if (data.phone) {
      this._phoneInput.value = data.phone;
    }
    const contactErrors: string[] = [];
    if (errors.email) contactErrors.push(errors.email);
    if (errors.phone) contactErrors.push(errors.phone);

    this.errors = contactErrors.join(", ");
    this.valid = contactErrors.length === 0;
  }

  set email(value: string) {
    this._emailInput.value = value;
    this.buyer.setData({ email: value });
  }
  set phone(value: string) {
    this._phoneInput.value = value;
    this.buyer.setData({ phone: value });
  }
}
