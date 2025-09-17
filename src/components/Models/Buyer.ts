import { IBuyer, TPayment } from "../../types";
export class Buyer {
  private payment: TPayment;
  private email: string;
  private phone: string;
  private address: string;

  constructor(
    payment: TPayment = "" as TPayment,
    email: string = "",
    phone: string = "",
    address: string = ""
  ) {
    this.payment = payment;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }

  setData(data: Partial<IBuyer>): void {
    if (data.payment) this.payment = data.payment;
    if (data.email) this.email = data.email;
    if (data.phone) this.phone = data.phone;
    if (data.address) this.address = data.address;
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  clear(): void {
    this.payment = "" as TPayment;
    this.email = "";
    this.phone = "";
    this.address = "";
  }
  validate(): Partial<Record<keyof IBuyer, string>> {
    const errors: Partial<Record<keyof IBuyer, string>> = {};

    if (!this.payment) {
      errors.payment = "Выберите способ оплаты";
    }

    if (!this.address) {
      errors.address = "Введите адрес доставки";
    }

    if (!this.phone) {
      errors.phone = "Введите телефон";
    }

    if (!this.email) {
      errors.email = "Введите email";
    } 
    return errors;
  }
  }