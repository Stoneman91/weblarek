import "./scss/styles.scss";
import { API_URL } from "./utils/constants";
import { ApiClient } from "./components/Models/ApiClient";
import { ProductCatalog } from "./components/Models/ProductCatalog";
import { Buyer } from "./components/Models/Buyer";
import { IProduct }from "./types";
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

apiClient
.createOrder({
      items: [],
      buyer: {
      payment: "cash",
      email: "min@test.ru",
      phone: "+70000000000",
      address: "Msk 1"
    },
    total: 0
  })
  .then((response) => {
    console.log("# Пустой заказ создан:", response);
  })
  .catch((error) => {
    console.error("# Ошибка при создании пустого заказа:", error);
  });

//Тестирование Buyer
console.log("Тестирование Buyer");
console.log("Начальные данные покупателя:", buyerModel.getData());
buyerModel.setData({
  payment: "cash",
  email: "123@mail.ru",
  phone: "",
  address: "",
});
console.log("Данные после частичного заполнения:", buyerModel.getData());

buyerModel.setData({ email: "newemail@mail.ru" });
console.log("После обновления email:", buyerModel.getData());

buyerModel.setData({
  payment: "card",
  email: "test@mail.ru",
  phone: "+1234567890",
  address: "ул. Пиковая, 123",
});
console.log("Полностью заполненные данные:", buyerModel.getData());
console.log("Ошибки валидации полных данных:", buyerModel.validate());

buyerModel.clear();
console.log("После очистки:", buyerModel.getData());
console.log("Ошибки валидации после очистки:", buyerModel.validate());

buyerModel.setData({
  payment: "cash",
  email: "final@test.ru",
  phone: "+79998887766",
  address: "ул. Новая, 456",
});
console.log("Данные после повторного заполнения:", buyerModel.getData());
console.log("Финальные ошибки валидации:", buyerModel.validate());

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
console.log("1. Массив товаров из модели:", productsModel.getProducts()); 
const currentProducts = productsModel.getProducts();
console.log("2. После сохранения массива товаров:", productsModel.getProducts()); 
 
console.log("3. Товар с ID '2':", productsModel.getProductById("2")); 
console.log("4. Товар с ID '999' (несуществующий):", 
  productsModel.getProductById("999") 
); 
productsModel.setSelectedProduct(currentProducts[0]); 
console.log( 
  "5. После сохранения товара для отображения:", 
  productsModel.getSelectedProduct() 
); 
 
console.log("6. Получение сохраненного товара:", productsModel.getSelectedProduct());