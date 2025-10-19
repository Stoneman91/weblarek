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
import { CardBasket } from "./components/view/cardBasket";
import { OrderForm } from "./components/view/orderForm";
import { Buyer } from "./components/Models/Buyer";
import { ContactsForm } from "./components/view/contactsForm";
import { OrderModalSuccess } from "./components/view/modalOrderSuccess";

const events = new EventEmitter();
const apiClient = new ApiClient(API_URL);
const productsModel = new ProductCatalog(events);
const gallery = new Gallery(events, ensureElement(".page"));
const modal = new Modal(events, ensureElement("#modal-container"));
const header = new Header(events, ensureElement(".header"));
const cart = new Cart(events);
const buyer = new Buyer(events);

events.on("cart:changed", () => {
  header.counter = cart.getItemsCount();
});

events.on('basket:open', () => {
  const basket = new Basket(events, cloneTemplate(ensureElement<HTMLTemplateElement>('#basket')));
  const items = cart.getItems();
  
  if (items.length === 0) {
    basket.items = [];
    basket.total = 0;
    basket.disabled = true;
  } else {
    basket.items = items.map((item, index) => {
      const cardBasket = new CardBasket(cloneTemplate(ensureElement<HTMLTemplateElement>('#card-basket')), {
        onClick: () => {
          cart.removeItem(item.id);
          events.emit('basket:open');
        }
      });
      
      cardBasket.title = item.title;
      cardBasket.price = item.price || 0;
      cardBasket.index = index + 1;
      
      return cardBasket.render();
    });
    
    basket.total = cart.getTotalPrice();
    basket.disabled = false;
  }
  
  modal.content = basket.render();;
  modal.isOpen = true;
});
events.on("modal:close", () => {
  modal.isOpen = false;
});

events.on("products:changed", () => {
  gallery.render({ 
    items: productsModel.getProducts().map(item =>
      new CardCatalog(cloneTemplate(ensureElement<HTMLTemplateElement>("#card-catalog")), {
        onClick: () => events.emit("card:select", item)
      }).render(item)
    )
  });
});

events.on("card:select", (item: IProduct) => {
  productsModel.setSelectedProduct(item);
});

events.on("selectedProduct:changed", () => {
  const selectedProduct = productsModel.getSelectedProduct();

  if (selectedProduct) {
    const cardPreview = new CardPreview(
      cloneTemplate(ensureElement<HTMLTemplateElement>("#card-preview")),
      {
        onClick: () => {
          if (cart.isProductInCart(selectedProduct.id)) {
            cart.removeItem(selectedProduct.id);
             modal.isOpen = false;
          } else {
            events.emit("product:addToCart", selectedProduct);
          }
        }
      }
    );

  modal.content = cardPreview.render({
      title: selectedProduct.title ,
      price: selectedProduct.price || 0,
      category: selectedProduct.category || '',
      image: selectedProduct.image || '',
      description: selectedProduct.description || '',
      buttonText: cart.isProductInCart(selectedProduct.id) 
        ? "Удалить из корзины" 
        : "В корзину"
    });

    modal.isOpen = true;
  }
});

events.on("product:addToCart", (item: IProduct) => {
  cart.addItem(item);
  modal.isOpen = false;
});

events.on("basket:order", () => {
  const orderForm = new OrderForm(events, cloneTemplate(ensureElement<HTMLTemplateElement>('#order')), buyer);
  modal.content = orderForm.render();
  modal.isOpen = true;
});

events.on("order:submit", () => {
  const contactsForm = new ContactsForm(events, cloneTemplate(ensureElement<HTMLTemplateElement>('#contacts')), buyer);
  modal.content = contactsForm.render();
  modal.isOpen = true;
});

events.on("contacts:submit", () => {

  const orderData = {
    ...buyer.getData(),
    items: cart.getItems().map(item => item.id),
    total: cart.getTotalPrice()
  };

  apiClient.createOrder(orderData)
    .then(() => {
      const successTemplate = ensureElement<HTMLTemplateElement>('#success');
      const successElement = cloneTemplate<HTMLElement>(successTemplate);
      const success = new OrderModalSuccess(events, successElement);
      
      success.total = cart.getTotalPrice();
      modal.content = successElement;
      
      cart.clear();
      buyer.clear();
    })
    .catch((error) => {
      console.error("Ошибка оформления заказа:", error);
    });
});

events.on("orderSuccess:close", () => {
  modal.isOpen = false;
  header.counter = 0;
});

apiClient.getProducts()
  .then(products => productsModel.setProducts(products))
  .catch(error => console.error("Ошибка загрузки:", error));