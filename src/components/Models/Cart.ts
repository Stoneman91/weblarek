import { IProduct } from "../../types";
export class Cart {
  private items: IProduct[];

  constructor(items: IProduct[] = []) {
    this.items = items;
  }
  getItems(): IProduct[] {
    return [...this.items];
  }

  addItem(product: IProduct): void {
    if (!this.isProductInCart(product.id)) {
      this.items.push(product);
    }
  }

  removeItem(productId: string): void {
    this.items = this.items.filter((item) => item.id !== productId);
  }

  clear(): void {
    this.items = [];
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + (item.price || 0), 0);
  }

  getItemsCount(): number {
    return this.items.length;
  }

  isProductInCart(productId: string): boolean {
    return this.items.some((item) => item.id === productId);
  }
}
