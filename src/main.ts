import "./scss/styles.scss";
import { API_URL } from "./utils/constants";
import { ApiClient } from "./components/Models/ApiClient";
import { ProductCatalog } from "./components/Models/ProductCatalog";
import { Buyer } from "./components/Models/Buyer";
import { IBuyer, IProduct, TPayment } from "./types";
import { Cart } from "./components/Models/Cart";

//Тестирование ApiClient

const apiClient = new ApiClient(API_URL); 
const productsModel = new ProductCatalog();
const buyerModel = new Buyer();
const cartModel = new Cart();

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

const orderData = {
  payment: "cash" as TPayment,
  email: "proverka@testov.ru",
  phone: "+71234567890",
  address: "Msk 1",
  total: 2200,
  items: [
    "854cef69-976d-4c2a-a18c-2aa45046c390",
    "c101ab44-ed99-4a54-990d-47aa2bb4e7d9",
  ],
};

apiClient
  .createOrder(orderData)
  .then((response) => {
    console.log("# Заказ создан успешно:", response);
  })
  .catch((error) => {
    console.error("# Ошибка при создании заказа:", error);
  });

//Тестирование Buyer
console.log("Тестирование Buyer");
const b1Data: Partial<IBuyer> = {
  payment: "cash",
  email: "123@mail.ru",
  phone: "",
  address: "",
};
const b2Data: Partial<IBuyer> = {
  payment: "online",
  email: "55555@mail.ru",
  phone: "+788932893893",
  address: "pppp",
};

buyerModel.setData(b1Data);
console.log("1. Данные покупателя:", buyerModel.getData());
buyerModel.setData({ email: "newemail@mail.ru" });
console.log("2. После обновления email:", buyerModel.getData());

buyerModel.setData(b2Data);
console.log("3. Данные покупателя:", buyerModel.getData());
buyerModel.clear();
console.log("4. После очистки:", buyerModel.getData());

console.log("5. Пустые данные:", buyerModel.getData());
console.log("6. Ошибки валидации:", buyerModel.validate());

buyerModel.setData({
  payment: "cash",
  email: "test@mail.ru",
  phone: "+1234567890",
  address: "ул. Пиковая, 123",
});
console.log("7. Заполненные данные:", buyerModel.getData());
console.log("8. Ошибки валидации:", buyerModel.validate());

//Тестирование Cart
const product1: IProduct = { id: "1", title: "Товар 1", price: 100 };
const product2: IProduct = { id: "2", title: "Товар 2", price: 200 };
const product3: IProduct = { id: "3", title: "Товар 3", price: 150 };

console.log("Тестирование Cart");

console.log("1. Начальный массив товаров:", cartModel.getItems());

cartModel.addItem(product1);
cartModel.addItem(product2);

console.log("2. После добавления 2 товаров:", cartModel.getItems());

console.log("3. Товар '1' в корзине?", cartModel.isProductInCart("1"));
console.log("4. Товар '3' в корзине?", cartModel.isProductInCart("3"));

console.log("5. Количество товаров:", cartModel.getItemsCount());
console.log("6. Общая стоимость:", cartModel.getTotalPrice());

cartModel.removeItem("1");
console.log("7. После удаления товара '1':", cartModel.getItems());

cartModel.addItem(product3);
console.log("8. После добавления третьего товара:", cartModel.getItems());
console.log("9. Количество товаров:", cartModel.getItemsCount());
console.log("10. Общая стоимость:", cartModel.getTotalPrice());

cartModel.clear();
console.log("11. После очистки:", cartModel.getItems());
console.log("12. Количество после очистки:", cartModel.getItemsCount());

// Тестирование ProductCatalog

console.log("ProductCatalog");

const testProducts: IProduct[] = [
  { id: "1", title: "Тестовый товар 1", price: 100 },
  { id: "2", title: "Тестовый товар 2", price: 200 },
  { id: "3", title: "Тестовый товар 3", price: 150 },
];

console.log("1. Массив товаров из модели:", productsModel.getProducts());

productsModel.setProducts(testProducts);
console.log(
  "2. После сохранения массива товаров:",
  productsModel.getProducts()
);

console.log("3. Товар с ID '2':", productsModel.getProductById("2"));

productsModel.setSelectedProduct(testProducts[0]);
console.log(
  "4. После сохранения товара для отображения:",
  productsModel.getSelectedProduct()
);

console.log(
  "5. Получение сохраненного товара:",
  productsModel.getSelectedProduct()
);
