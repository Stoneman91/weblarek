import "./scss/styles.scss";
import { API_URL } from "./utils/constants";
import { ApiClient } from "./components/Models/ApiClient";
import { ProductCatalog } from "./components/Models/ProductCatalog";
import { CardCatalog } from "./components/view/cardCatalog";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { Gallery } from "./components/view/gallery";
import { EventEmitter } from "./components/base/Events";
import { Modal } from "./components/view/modal";
import { IProduct } from "./types";
import { CardPreview } from "./components/view/cardPreview";
import { Basket } from "./components/view/basket";
import { Cart } from "./components/Models/Cart";
import { Header } from "./components/view/header";

const events = new EventEmitter();
const apiClient = new ApiClient(API_URL);
const productsModel = new ProductCatalog(events);
const gallery = new Gallery(events, ensureElement<HTMLElement>(".page"));
const modal = new Modal(events, ensureElement<HTMLElement>("#modal-container"));
const header = new Header(events, ensureElement<HTMLElement>(".header"));

events.on('basket:open', () => {
  const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
  const basketElement = cloneTemplate<HTMLElement>(basketTemplate);
  const basket = new Basket(events, basketElement);
  
  modal.content = basketElement;
  modal.isOpen = true;
});

events.on("modal:close", () => {
  modal.isOpen = false;
});

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

events.on("card:select", (item: IProduct) => {
  productsModel.setSelectedProduct(item);
});

events.on("selectedProduct:changed", () => {
  const selectedProduct = productsModel.getSelectedProduct();

  if (selectedProduct) {
    const previewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
    const cardPreview = new CardPreview(
      cloneTemplate<HTMLElement>(previewTemplate),
      {
        onClick: () => events.emit("product:addToCart", selectedProduct),
      }
    );

    const previewContent = cardPreview.render(selectedProduct);
    modal.content = previewContent;
    modal.isOpen = true;
  }
});

apiClient
  .getProducts()
  .then((products) => {
    console.log("# Массив данных с товарами", products);

    productsModel.setProducts(products);

    console.log("# Товары сохранены в каталоге:", productsModel.getProducts());
    events.emit("products:changed");
  })
  .catch((error) => {
    console.error("# Ошибка загрузки товаров:", error);
  });
