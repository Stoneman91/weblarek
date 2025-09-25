import { IProduct, IOrder, IOrderResult } from "../../types";
import { Api } from "../base/Api";

export class ApiClient extends Api {
    constructor(baseUrl: string, options: RequestInit = {}) {
        super(baseUrl, options);
    }

    getProducts(): Promise<IProduct[]> {
        return this.get("/product/");
    }

    createOrder(order: IOrder): Promise<IOrderResult> {
        return this.post("/order/", order);
    }
}