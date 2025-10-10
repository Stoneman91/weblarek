import "./scss/styles.scss";
import { API_URL } from "./utils/constants";
import { ApiClient } from "./components/Models/ApiClient";
import { ProductCatalog } from "./components/Models/ProductCatalog";

//Тестирование ApiClient

const apiClient = new ApiClient(API_URL); 
const productsModel = new ProductCatalog();

apiClient
  .getProducts()
  .then((products) => {
    console.log("# Массив данных с товарами", products);

    productsModel.setProducts(products);

    console.log("# Товары сохранены в каталоге:", productsModel.getProducts());
  })
  .catch((error) => {
    console.error("# Ошибка загрузки товаров:", error);
  });
