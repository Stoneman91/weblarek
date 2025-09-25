import { IProduct, IBuyer, IOrderResult } from "../../types";
import { Api } from "../base/Api";

export class ApiClient extends Api {
    constructor(baseUrl: string, options: RequestInit = {}) {
        super(baseUrl, options);
    }

    getProducts(): Promise<IProduct[]> {
        return this.get("/product/");
    }

    createOrder(orderData: IBuyer): Promise<IOrderResult> {
        return this.post("/order", orderData);
    }
}