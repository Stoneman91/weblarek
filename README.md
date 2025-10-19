# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install

```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.
### Данные

#### Интерфейс товара
interface IProduct {
id: string; - номер 
title: string; - название
image: string; - изображение
category: string; - категория
price: number | null; - цена
description: string; - описание
}

#### Интерфейс Покупателя
interface IBuyer {
  payment: TPayment; - метод оплаты
  email: string; - почта
  phone: string; - номер телефона
  address: string; - адресс
}

#### Интерфейс заказа

interface IOrderResult {
    id: string;
    total: number;
}


#### Модели данных

##### Класс ProductCatalog 
  Управление каталогом товаров магазина. Отвечает за хранение всех товаров, получение информации о товарах и управление выбранным товаром для детального просмотра.

Конструктор класса не принимает параметров.

Поля класса:

private products: IProduct[] - массив всех товаров.

private selectedProduct: IProduct | null - товар, выбранный для подробного отображения.

Методы класса:

setProducts(products: IProduct[]): void - сохранение массива товаров полученного в параметрах метода.

getProducts(): IProduct[] - получение массива товаров из модели.

getProductById(id: string): IProduct | undefined - получение одного товара по его id.

setSelectedProduct(product: IProduct): void - сохранение товара для подробного отображения.

getSelectedProduct(): IProduct | null - получение товара для подробного отображения.

##### Класс Cart 
 Управление корзиной покупок. Отвечает за хранение товаров, добавленных пользователем, расчет общей стоимости, проверку наличия товаров и операции с корзиной.

Конструктор:

Конструктор класса не принимает параметров.

Поля класса:

private items: IProduct[] - хранит массив товаров, выбранных покупателем для покупки.

Методы класса:

getItems(): IProduct[] - получение массива товаров, которые находятся в корзине.

addItem(product: IProduct): void - добавление товара, который был получен в параметре в массив корзины.

removeItem(productId: string): void - удаление товара, полученного в параметре из массива корзины.

clear(): void - очистка корзины.

getTotalPrice(): number - получение стоимости всех товаров в корзине.

getItemsCount(): number - получение количества товаров в корзине.

isProductInCart(productId: string): boolean - проверка наличия товара в корзине по его id, полученному в параметр метода.

##### Класс Buyer 
Управление данными покупателя. Отвечает за хранение и валидацию информации о покупателе, включая контактные данные и способ оплаты.

Конструктор класса не принимает параметров.

Поля класса:

 payment: TPayment - способ оплаты. Может принимать значения 'cash' (наличными) или 'card' (картой).

 email: string - электронная почта.

 phone: string - телефон.

 address: string - адрес доставки.

Методы класса:

setData() -сохранение данных в модели. Один общий метод или отдельные методы для каждого поля.

getData() - получение всех данных покупателя.

clear()- очистка данных покупателя.

validate() - валидация данных.





##### Класс ApiClient
 Класс использует композицию, чтобы выполнять запрос на сервер.
Конструктор:

constructor(api: IApi) - принимает экземпляр объекта, реализующего интерфейс IApi (например, экземпляр класса Api), который будет использоваться для выполнения HTTP-запросов.

Поля класса:

 api -  поле для хранения экземпляра API, через который выполняются все запросы.

Методы класса:

getProducts() - делает get запрос на эндпоинт /product/ и возвращает массив товаров.

createOrder() - делает post запрос на эндпоинт /order/ и передаёт в него данные, полученные в параметрах метода

### View
Классы представления (описанные ниже) отвечают за отображение данных и обработку пользовательского ввода
#### Card
Назначение: Базовый класс для всех карточек товаров, содержащий общие свойства и методы.

Конструктор:

constructor(protected container: HTMLElement, actions?: ICardActions)
Поля:

protected _title: HTMLElement - элемент заголовка

protected _price: HTMLElement - элемент цены

protected container: HTMLElement - контейнер карточки

Методы:

set title(value: string): void - установка заголовка

set price(value: string | number | null): void - установка цены

Интерфейс ICardActions:

export interface ICardActions {
  onClick?: (event: MouseEvent) => void;
}

#### Basket 
Назначение: Отображает корзину покупок с списком товаров, общей стоимостью и кнопкой оформления заказа.

Конструктор:

constructor(protected events: IEvents, container: HTMLElement)
Поля:

protected basketList: HTMLElement - список товаров в корзине

protected basketPrice: HTMLElement - элемент отображения общей стоимости

protected basketButton: HTMLButtonElement - кнопка оформления заказа

Методы:

set items(items: HTMLElement[]): void - установка списка товаров

set total(value: number): void - установка общей стоимости

set disabled(value: boolean): void - активация/деактивация кнопки оформления

Интерфейс IBasket:

interface IBasket {
  items: HTMLElement[];
  total: number;
}

#### CardBasket
Назначение: Отображает отдельный товар в корзине с возможностью удаления.

Конструктор:

constructor(protected container: HTMLElement, actions?: ICardActions)
Поля:

protected _index: HTMLElement - элемент отображения порядкового номера

protected _deleteButton: HTMLButtonElement - кнопка удаления товара

Методы:

set index(value: number): void - установка порядкового номера

Интерфейс ICardBusket:

interface ICardBusket {
    index: HTMLElement;
}

#### CardCatalog
Назначение: Отображает товар в основном каталоге с изображением, категорией и ценой.

Конструктор:

constructor(container: HTMLElement, actions: ICardActions)
Поля:

protected imgElement: HTMLImageElement - элемент изображения товара

protected categoryElement: HTMLElement - элемент категории товара

Методы:

set category(value: string): void - установка категории с применением стилей

set image(value: string): void - установка изображения товара

Тип TCardCatalog:

export type TCardCatalog = Pick<IProduct, "image" | "category">;

#### CardPreview 
Назначение: Отображает детальную информацию о товаре в модальном окне при нажатии на карточку в галерее.

Конструктор:

constructor(protected container: HTMLElement, protected actions?: ICardActions)

Поля:
protected _cardImage: HTMLImageElement - элемент изображения

protected _cardText: HTMLElement - элемент описания

protected _cardButton: HTMLButtonElement - кнопка действия

protected _category: HTMLElement - элемент категории

Методы:

set image(value: string): void - установка изображения

set description(value: string): void - установка описания

set buttonText(value: string): void - установка текста кнопки

set category(value: string): void - установка категории

Интерфейс ICardPreview:

interface ICardPreview {
    image: string;
    description: string;
    buttonText: string;
    category: string;
    title: string;
    price: string | number | null;
}

#### Form
Назначение: Базовый класс для всех форм с общей логикой валидации и отправки.

Конструктор:

constructor(protected events: IEvents, container: HTMLElement, protected formEventName: string)
Поля:

protected submitButton: HTMLButtonElement - кнопка отправки формы

protected errorsElement: HTMLElement - элемент отображения ошибок

Методы:

set valid(value: boolean): void - активация/деактивация кнопки отправки

set errors(value: string): void - установка текста ошибок

Интерфейс IForm:

interface IForm {
    valid: boolean;
    errors: string;
}

#### OrderForm
Назначение: Форма для ввода способа оплаты и адреса доставки.

Конструктор:

constructor(events: IEvents, container: HTMLElement, private buyer: Buyer)
Поля:

protected cardButton: HTMLButtonElement - кнопка выбора карточной оплаты

protected cashButton: HTMLButtonElement - кнопка выбора наличной оплаты

protected addressInput: HTMLInputElement - поле ввода адреса

private _payment: string - выбранный способ оплаты

private _address: string - введенный адрес

#### ContactsForm
Назначение: Форма для ввода контактных данных (email и телефон).

Конструктор:

constructor(events: IEvents, container: HTMLElement, private buyer: Buyer)
Поля:

protected _emailInput: HTMLInputElement - поле ввода email

protected _phoneInput: HTMLInputElement - поле ввода телефона

private _email: string - введенный email

private _phone: string - введенный телефон

Методы:

set email(value: string): void - установка email

set phone(value: string): void - установка номера телефона

#### Gallery 
Назначение: Контейнер для отображения каталога товаров.

Конструктор:

constructor(protected events: IEvents, protected container: HTMLElement)
Поля:

protected catalogElement: HTMLElement - элемент каталога

Методы:

set items(items: HTMLElement[]): void - установка списка товаров

Интерфейс IGallery:

interface IGallery {
    items: HTMLElement[];
}

#### Header 
Назначение: Отображает шапку приложения с кнопкой корзины и счетчиком товаров.

Конструктор:

constructor(protected events: IEvents, container: HTMLElement)
Поля:

protected counterElement: HTMLElement - элемент счетчика товаров

protected basketButton: HTMLButtonElement - кнопка открытия корзины

Методы:

set counter(value: number): void - установка значения счетчика

Интерфейс IHeader:

interface IHeader {
    counter: number;
}
#### Modal
Назначение: Управляет отображением модальных окон.

Конструктор:

constructor(protected events: IEvents, protected container: HTMLElement)
Поля:

protected _content: HTMLElement - контейнер содержимого

protected modalCloseButton: HTMLButtonElement - кнопка закрытия

protected _isOpen: boolean - флаг открытия/закрытия

Методы:

set content(value: HTMLElement): void - установка содержимого

set isOpen(value: boolean): void - открытие/закрытие модального окна

Интерфейс IModal:

interface IModal {
  content: HTMLElement;
}

#### OrderModalSuccess 
Назначение: Отображает сообщение об успешном оформлении заказа.

Конструктор:

constructor(protected events: IEvents, container: HTMLElement)
Поля:

protected titleElement: HTMLElement - элемент заголовка

protected descriptionElement: HTMLElement - элемент описания

protected closeButton: HTMLButtonElement - кнопка закрытия

Методы:

set total(value: number): void - установка общей суммы заказа

Интерфейс IOrderSuccess:

interface IOrderSuccess {
    total: number;
}