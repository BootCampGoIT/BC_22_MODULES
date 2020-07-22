
import './cart.css';

export const createCartListMarkup = (products) => {
  return `
  <ul class="cartList">
    ${products.reduce((acc, product) => {
    acc += createCartListItemMarkup(product)
      return acc;
  })}
  </ul>
  `
}

const createCartListItemMarkup = (product) => {
  return `
  <li class="cartListItem">
    <img class="cartListItemImage" src=${product.productImage} alt="image" width="30" height="30"/>
    <p class="cartListItemName">${product.productName}</p>
    <div class="orderCounter">
      <button type="button" name="decrement">-</button>
        <input type="number" name="inputNumber"/>
      <button type="button" name="increment">+</button>
    </div>
    <p class="cartListItemName">${product.productPrice}</p>
  </li>
  `
}


const cart = () => {



}
