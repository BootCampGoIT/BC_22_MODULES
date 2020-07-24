
import './cart.css';


export const createCartListMarkup = (products, getTotalPrice) => {
  return `
  <div class="cartWrapper">
    ${(products.length === 0) ? '<p class="cartNotification"> No products in cart </p>' : ""}
    <ul class="cartList">
      ${products.reduce((acc, product) => {
    acc += createCartListItemMarkup(product)
    return acc;
  }, '')}
    </ul>

   <p class="cartTotal">Total: <span class="cartTotalPrice">${getTotalPrice(products)}</span></p>

    <div class="cartButtonsWrapper">
      <button type="button" class="cartButtonBack button" data-button="backToProducts">Back to reality</button>
      <button type="button" class="cartButtonConfirm button" data-button="confirmOrder">Confirm order</button>
    </div>
  </div>
  `
}

const createCartListItemMarkup = (product) => {
  return `
  <li class="cartListItem" data-id=${product.id}>
    <img class="cartListItemImage" src=${product.productImage} alt="image" width="30" height="30"/>
    <p class="cartListItemName">${product.productName}</p>
    <div class="orderCounter">
      <button type="button" data-button="decrement" ${(product.quantity === 1) ? 'disabled' : ''}>-</button>
        <input type="number" data-input="inputNumber" value="${product.quantity}"/>
      <button type="button" data-button="increment">+</button>
    </div>
    <p class="cartListItemName">${product.productPrice}</p>
    <button class="deleteButton" data-button="delete">Delete</button>
  </li>
  `
}


export default {
  userData: {},
  keys: {
    cart: '',
    orders: ''
  },
  destination: '',
  totalPrice: 0,


  settings(data, cartKey, orderKey) {
    this.userData = data;
    this.keys.cart = cartKey;
    this.keys.orders = orderKey;
  },

  openCart(destination, products) {
    this.destination = destination;
    this.userData[this.keys.cart] = [...products.map(({ id, productPrice, productImage, productName, quantity }) => {
      return { productPrice, productImage, productName, quantity, id }
    })]
    this.getTotalPrice.bind(this);
    this.destination.innerHTML = createCartListMarkup(this.userData[this.keys.cart], this.getTotalPrice);
    const cartList = document.querySelector('.cartList');
    cartList.addEventListener('click', this.getQuantity.bind(this))
    cartList.addEventListener('click', this.removeCartItem.bind(this))
  },

  getQuantity(e) {
    const listItem = e.target.closest('[data-id]');
    const id = listItem.dataset.id;
    const element = this.userData[this.keys.cart].find(product => product.id === id);
    const buttonDecrement = listItem.querySelector('[data-button="decrement"]');
    const cartTotalPrice = this.destination.querySelector('.cartTotalPrice');


    if (e.target.dataset.button === "decrement") {
      if (element.quantity <= 1) {
        element.quantity = 1;
      } else element.quantity -= 1;

      if (element.quantity === 1) {
        buttonDecrement.disabled = true;
      }

    }
    if (e.target.dataset.button === "increment") {
      element.quantity += 1;
      buttonDecrement.disabled = false;

    }
    const inputNumber = listItem.querySelector('[data-input="inputNumber"]')
    inputNumber.value = element.quantity;
    cartTotalPrice.textContent = this.getTotalPrice(this.userData[this.keys.cart]);
  },

  removeCartItem(e) {

    if (e.target.dataset.button === 'delete') {
      const listItem = e.target.closest('[data-id]');
      const id = listItem.dataset.id;
      this.userData[this.keys.cart] = [...this.userData[this.keys.cart].filter(product => product.id !== id)];
      this.destination.innerHTML = createCartListMarkup(this.userData[this.keys.cart], this.getTotalPrice);
      const cartList = document.querySelector('.cartList');
      cartList.addEventListener('click', this.getQuantity.bind(this))
      cartList.addEventListener('click', this.removeCartItem.bind(this));
      const cartTotalPrice = this.destination.querySelector('.cartTotalPrice');
      cartTotalPrice.textContent = this.getTotalPrice(this.userData[this.keys.cart]);
    } else return

  },

  getTotalPrice(products) {
    const total = products.reduce((acc, product) => {
      acc += product.productPrice * product.quantity
      return acc;
    }, 0);
    return total
  },

  getOrder(e) {
    if (e.target.dataset.button === "confirmOrder") {
      if (this.userData[this.keys.cart].length !== 0) {
        const order = {
          orderID: '12h3f1hg2f312',
          date: new Date(),
          authorID: '23h4gj4y2j3yg23',
          address: {
            place: "Brovary",
            street: "Hrushevskogo",
            building: 25
          },
          telephone: '098-256-5236',
          orderProducts: [...this.userData[this.keys.cart].map(item => {
            return { id: item.id, quantity: item.quantity }
          })]
        }
        this.userData[this.keys.orders] = [...this.userData[this.keys.orders], order];
        this.userData[this.keys.cart] = [];

        // dabl
        this.getTotalPrice.bind(this);
        this.destination.innerHTML = createCartListMarkup(this.userData[this.keys.cart], this.getTotalPrice);
        const cartList = document.querySelector('.cartList');
        cartList.addEventListener('click', this.getQuantity.bind(this))
        cartList.addEventListener('click', this.removeCartItem.bind(this))
      } else console.log("No products in cart")
    } else return
  }












}
