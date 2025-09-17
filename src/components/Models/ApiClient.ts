import { IApi, IProduct } from "../../types";

export class ApiClient {
    private api: IApi;
    constructor (api: IApi) {
        this.api = api;
    }
    async getProducts (): Promise<IProduct[]> {
        try {
      const products = this.api.get<IProduct[]>('/product/');
     return  products;
    } catch (error) {
        console.error('Ошибка при получении товаров:', error);
        return [];
}
}

    async createOrder(orderData:object): Promise<object> {
        try {
            const response = this.api.post('/order', orderData);
            return response;
        } catch (error) {
            console.error('Ошибка при создании заказа:', error);
            return [];
        }
    }
}