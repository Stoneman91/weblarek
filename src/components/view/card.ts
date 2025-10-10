import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export interface ICardActions {
    onClick?: (event: MouseEvent) => void;
}

export abstract class Card<T> extends Component<ICardActions> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;

    constructor(protected container: HTMLElement) {
        super(container);
        this._title = ensureElement<HTMLElement>('.card__title', this.container);
        this._price = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set title(value: string) {
        this._title.textContent = value;
    }

    set price(value: string | number) {
        const priceText = typeof value === 'number' ? `${value} синапсов` : value;
        this._price.textContent = priceText;
    }
}