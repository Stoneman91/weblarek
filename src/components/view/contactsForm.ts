import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Buyer } from "../Models/Buyer";
import { Form } from "./form";

export class ContactsForm extends Form {
  protected _emailInput: HTMLInputElement;
  protected _phoneInput: HTMLInputElement;
  private _email: string = '';
  private _phone: string = '';

  constructor(events: IEvents, container: HTMLElement, private buyer: Buyer) {
    super(events, container, "contacts");

    this._emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this._phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

    this._emailInput.addEventListener('input', () => {
      this._email = this._emailInput.value;
      this.buyer.setData({ email: this._emailInput.value });
      this.valid = this._email.trim() !== '' && this._phone.trim() !== '';
    });

    this._phoneInput.addEventListener('input', () => {
      this._phone = this._phoneInput.value;
      this.buyer.setData({ phone: this._phoneInput.value });
      this.valid = this._email.trim() !== '' && this._phone.trim() !== '';
    });
  }

  set email(value: string) {
    this._email = value;
    this._emailInput.value = value;
    this.buyer.setData({ email: value });
    this.valid = this._email.trim() !== '' && this._phone.trim() !== '';
  }

  set phone(value: string) {
    this._phone = value;
    this._phoneInput.value = value;
    this.buyer.setData({ phone: value });
    this.valid = this._email.trim() !== '' && this._phone.trim() !== '';
  }
}