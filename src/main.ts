import "./scss/styles.scss";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { ApiClient } from "./components/Models/ApiClient";
import { ProductCatalog } from "./components/Models/ProductCatalog";

const api = new Api(API_URL);
const apiClient = new ApiClient(api);
const productsModel = new ProductCatalog();

apiClient
  .getProducts()
  .then((products) => {
    console.log("Массив данных с товарами", products);

    productsModel.setProducts(products);

    const savedProducts = productsModel.getProducts();
    console.log("Товары сохранены в каталоге:", savedProducts);
  })
  .catch((error) => {
    console.error("Ошибка загрузки товаров:", error);
  });

const orderData = {
    "payment": "online",
    "email": "test@test.ru",
    "phone": "+71234567890",
    "address": "Spb Vosstania 1",
    "total": 2200,
    "items": [
        "854cef69-976d-4c2a-a18c-2aa45046c390",
        "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
    ]
};
apiClient
  .createOrder(orderData)
  .then((response) => {
    console.log("Заказ создан успешно:", response);
  })
  .catch((error) => {
    console.error("Ошибка при создании заказа:", error);
  });
