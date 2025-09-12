import { IProduct } from "../../types";

export class ProductCatalog {
  private products: IProduct[];
  private selectedProduct: IProduct | null;

  constructor(products: IProduct[] = []) {
    this.products = products;
    this.selectedProduct = null;
  }

  setProducts(products: IProduct[]): void {
    this.products = products;
  }
  // Получение массива товаров
  getProducts(): IProduct[] {
    return this.products;
  }

  // Получение товара по ID
  getProductById(id:string) {
    return this.products.find((product) => product.id === id);
  }

  // Сохранение выбранного товара
  setSelectedProduct(product: IProduct): void {
    this.selectedProduct = product;
  }

  // Получение выбранного товара
  getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }
}
