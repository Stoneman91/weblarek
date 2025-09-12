import './scss/styles.scss';
import { ProductCatalog } from './components/Models/ProductCatalog';
import { Cart } from './components/Models/Cart';
import { apiProducts } from './utils/data';

const productsModel = new ProductCatalog();
productsModel.setProducts(apiProducts.items);
const allProducts = productsModel.getProducts();
console.log('Массив данных с товарами', productsModel.getProducts());


 // 2. Тестируем получение товара по ID
    console.log('\n2. Поиск товара по ID...');
    if (allProducts.length > 0) {
        const firstProductId = allProducts[0].id;
        const productById = productsModel.getProductById(firstProductId);
        console.log('Товар найден по ID:', productById);
        
        // Пробуем найти несуществующий товар
        const nonExistentProduct = productsModel.getProductById('non-existent-id');
        console.log('Несуществующий товар:', nonExistentProduct);
    }
    
    // 3. Тестируем установку и получение выбранного товара
    console.log('\n3. Работа с выбранным товаром...');
    if (allProducts.length > 0) {
        productsModel.setSelectedProduct(allProducts[0]);
        const selectedProduct = productsModel.getSelectedProduct();
        console.log('Выбранный товар:', selectedProduct);
        
        // Очищаем выбранный товар
        productsModel.setSelectedProduct(null);
        console.log('Выбранный товар после очистки:', productsModel.getSelectedProduct());
    }