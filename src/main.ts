import "./scss/styles.scss";
import { API_URL } from "./utils/constants";
import { ApiClient } from "./components/Models/ApiClient";
import { ProductCatalog } from "./components/Models/ProductCatalog";
import { CardCatalog } from "./components/view/cardCatalog";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { Gallery } from "./components/view/gallery";
import { EventEmitter } from "./components/base/Events";

const events = new EventEmitter();
const apiClient = new ApiClient(API_URL);
const productsModel = new ProductCatalog(events);
const gallery = new Gallery(events, ensureElement<HTMLElement>(".page"));

events.on("products:changed", () => {
  const products = productsModel.getProducts();
  const itemCards = products.map((item) => {
    const card = new CardCatalog(cloneTemplate<HTMLElement>("#card-catalog"), {
      onClick: () => events.emit("card:select", item),
    });
    return card.render(item);
  });

  gallery.render({ items: itemCards });
});

apiClient
  .getProducts()
  .then((products) => {
    console.log("📥 Received products from API:", products);
    
    // Проверьте первый товар
    if (products.length > 0) {
      const firstProduct = products[0];
      console.log("🔍 First product details:", {
        title: firstProduct.title,
        image: firstProduct.image,
        category: firstProduct.category,
        price: firstProduct.price
      });
      
      // Проверьте доступность изображения
      if (firstProduct.image) {
        fetch(firstProduct.image, { method: 'HEAD' })
          .then(() => console.log('✅ First product image is accessible'))
          .catch(() => console.error('❌ First product image is not accessible'));
      }
    }
    
    productsModel.setProducts(products);
    events.emit("products:changed");
  })
  .catch((error) => {
    console.error("💥 Error loading products:", error);
  });