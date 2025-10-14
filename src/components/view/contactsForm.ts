import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./form";

export class ContactsForm extends Form {
  protected _emailInput: HTMLInputElement;
  protected _phoneInput: HTMLInputElement;

  constructor(events: IEvents, container: HTMLElement) {
    super(events, container, "contacts");

    this._emailInput = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container
    );
    this._phoneInput = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container
    );

    this._emailInput.addEventListener('input', () =>
      this.events.emit('contacts:email', { email: this._emailInput.value })
    );
    this._phoneInput.addEventListener('input', () =>
      this.events.emit('contacts:phon', { phone: this._phoneInput.value })
    );
  }

  
  set email(value: string) {
    this._emailInput.value = value;
  }

  set phone(value: string) {
    this._phoneInput.value = value;
  }
}
