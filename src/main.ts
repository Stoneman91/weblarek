import './scss/styles.scss';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { ApiClient } from './components/Models/ApiClient';
import { ProductCatalog } from './components/Models/ProductCatalog';




const api = new Api(API_URL);
const apiClient = new ApiClient(api);
const productsModel = new ProductCatalog();

apiClient.getProducts()
    .then(products => {
        console.log('Массив данных с товарами', products);
        
        productsModel.setProducts(products);
        
        const savedProducts = productsModel.getProducts();
        console.log('Товары сохранены в каталоге:', savedProducts);
    })
    .catch(error => {
        console.error('Ошибка загрузки товаров:', error);
    });

apiClient.createOrder()
    .then(response => {
        console.log('Заказ создан успешно:', response);
    })
    .catch(error => {
        console.error('Ошибка при создании заказа:', error);
    });