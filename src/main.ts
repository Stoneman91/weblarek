import "./scss/styles.scss";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { ApiClient } from "./components/Models/ApiClient";
import { ProductCatalog } from "./components/Models/ProductCatalog";
import { Buyer } from "./components/Models/Buyer";
import { IBuyer, IProduct } from "./types";
import { Cart } from "./components/Models/Cart";

//Тестирование ApiClient

const api = new Api(API_URL);
const apiClient = new ApiClient(api);
const productsModel = new ProductCatalog();

apiClient
  .getProducts()
  .then((products) => {
    console.log("# Массив данных с товарами", products);

    productsModel.setProducts(products);

    const savedProducts = productsModel.getProducts();
    console.log("# Товары сохранены в каталоге:", savedProducts);
  })
  .catch((error) => {
    console.error("# Ошибка загрузки товаров:", error);
  });


apiClient
  .createOrder(order)
  .then((response) => {
    console.log("# Заказ создан успешно:", response);
  })
  .catch((error) => {
    console.error("# Ошибка при создании заказа:", error);
  });

//Тестирование Buyer
console.log("Тестирование Buyer");
const b1 = new Buyer();
const b1Data: Partial<IBuyer> = {
  payment: "cash",
  email: "123@mail.ru",
  phone: "",
  address: "",
};
const b2 = new Buyer();
const b2Data: Partial<IBuyer> = {
  payment: "card",
  email: "55555@mail.ru",
  phone: "+788932893893",
  address: "pppp",
};
const b3 = new Buyer();

b1.setData(b1Data);
console.log("1. Данные покупателя:", b1.getData());
b1.setData({ email: "newemail@mail.ru" });
console.log("2. После обновления email:", b1.getData());

b2.setData(b2Data);
console.log("3. Данные покупателя:", b2.getData());
b2.clear();
console.log("4. После очистки:", b2.getData());

console.log("5. Пустые данные:", b3.getData());
console.log("6. Ошибки валидации:", b3.validate());

b3.setData({
  payment: "cash",
  email: "test@mail.ru",
  phone: "+1234567890",
  address: "ул. Пиковая, 123",
});
console.log("7. Заполненные данные:", b3.getData());
console.log("8. Ошибки валидации:", b3.validate());

//Тестирование Cart
const product1: IProduct = { id: "1", title: "Товар 1", price: 100 };
const product2: IProduct = { id: "2", title: "Товар 2", price: 200 };
const product3: IProduct = { id: "3", title: "Товар 3", price: 150 };

const cart = new Cart();

console.log("Тестирование Cart");

console.log("1. Начальный массив товаров:", cart.getItems());

cart.addItem(product1);
cart.addItem(product2);

console.log("2. После добавления 2 товаров:", cart.getItems());

console.log("3. Товар '1' в корзине?", cart.isProductInCart("1"));
console.log("4. Товар '3' в корзине?", cart.isProductInCart("3"));

console.log("5. Количество товаров:", cart.getItemsCount());
console.log("6. Общая стоимость:", cart.getTotalPrice());

cart.removeItem("1");
console.log("7. После удаления товара '1':", cart.getItems());

cart.addItem(product3);
console.log("8. После добавления третьего товара:", cart.getItems());
console.log("9. Количество товаров:", cart.getItemsCount());
console.log("10. Общая стоимость:", cart.getTotalPrice());

cart.clear();
console.log("11. После очистки:", cart.getItems());
console.log("12. Количество после очистки:", cart.getItemsCount());

// Тестирование ProductCatalog

console.log("ProductCatalog");

const catalog = new ProductCatalog();

const testProducts: IProduct[] = [
  { id: "1", title: "Тестовый товар 1", price: 100 },
  { id: "2", title: "Тестовый товар 2", price: 200 },
  { id: "3", title: "Тестовый товар 3", price: 150 },
];

console.log("1. Массив товаров из модели:", catalog.getProducts());

catalog.setProducts(testProducts);
console.log("2. После сохранения массива товаров:", catalog.getProducts());

console.log("3. Товар с ID '2':", catalog.getProductById("2"));
console.log(
  "4. Товар с ID '999' (несуществующий):",
  catalog.getProductById("999")
);

catalog.setSelectedProduct(testProducts[0]);
console.log(
  "5. После сохранения товара для отображения:",
  catalog.getSelectedProduct()
);

console.log("6. Получение сохраненного товара:", catalog.getSelectedProduct());
