import cartImage from './assets/cart.png';
import star from './assets/star.png';
import starFill from './assets/starFill.png';
import './productsCard.css';

const isFavorite = (id, favorites) => {
  return favorites.some(favorite => favorite === id);
}

const createProductListMarkup = (products, favorites) => {
  return `
    <ul class="productList">
      ${products.reduce((acc, product) => {
    acc += createProductListItemMarkup(product, favorites)
    return acc;
  }, '')}
    </ul>
  `
}

const createProductListItemMarkup = (product, favorites) => {
  return `
  <li class="productListItem" data-id=${product.id}>
    <div class="favoriteBlock">
      <img src=${isFavorite(product.id, favorites) ? starFill : star} data-favorite="favorite" alt="star" class="favoriteStar" width="25" height="25"/>
    </div>
    <img src=${product.productImage} alt=${product.productName} class="productListItemImage" width="200" height="200"/>
    <p class="productListItemName">${product.productName}</p>
    <div class="productListItemOrder">
      <p class="productListItemPrice">${product.productPrice} $</p>
      <div class="productListItemCartBlock">
        <img src=${cartImage} alt="cart image" class="productListItemCartImage" width="50" height="50"/>
      </div>
    </div>
  </li>
  `
}




export default {
  productsItems: [],
  destination: '',
  productItem: {
    name: '',
    price: 0,
    images: [],
    category: '',
    description: '',
    author: '',
    comments: [{ name: '', avatar: '', comment: '', date: '', mark: '' }],
    views: 0,
    available: true,
  },

  async renderCards(destination, dataGetter, favorites = []) {
    this.destination = destination;
    if (dataGetter.constructor.name === "Array") {
      this.productsItems = [...dataGetter];
      destination.innerHTML = createProductListMarkup(dataGetter, favorites);
      return dataGetter;
    }

    if (dataGetter.constructor.name === "Function") {
      const data = await dataGetter();
      this.productsItems = [...data];
      destination.innerHTML = createProductListMarkup(data, favorites);
    }
    return this.productsItems
  },

  addCard(product) {
    this.productsItems = [...this.productsItems, product];
    this.destination.children[0].insertAdjacentHTML('afterbegin', createProductListItemMarkup(product))
  },

  deleteCard(id) {
    this.productsItems = this.productsItems.filter(product => product.id !== id);
    this.destination.innerHTML = createProductListMarkup(this.productsItems);
  },

  editCard(id, editedProduct) {
    this.productsItems = this.productsItems.map(product => {
      if (product.id === id) {
        product = { ...product, ...editedProduct }
        return product
      }
      return product
    })
    this.destination.innerHTML = createProductListMarkup(this.productsItems);
  },

  setFavorite(e, favorites) {
    if (e.target.dataset.favorite) {
      const id = e.target.closest('[data-id]').dataset.id;
      if (favorites.some(favorite => favorite === id)) {
        const result = favorites.filter(favorite => favorite !== id)
        this.renderCards(this.destination, this.productsItems, result)
        return result
      } else {
        const result = [...favorites, id]
        this.renderCards(this.destination, this.productsItems, result)
        return result
      }
    }
  },


  addToCart(e) {




  },

  // getProduct(id) {

  // }









  // renderOne(element, position = 'end') {
  // destination.insertAdjacentHTML(((position === 'end') ? 'beforeend' : "afterbegin", createProductListItemMarkup(element)))

}








// };
