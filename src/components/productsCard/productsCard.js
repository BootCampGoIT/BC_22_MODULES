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
    acc += `<li class="productListItem" data-id=${product.id}>
       ${createProductListItemMarkup(product, favorites)}
      </li>`
    return acc;
  }, '')}
    </ul>
  `
}

const createProductListItemMarkup = (product, favorites) => {
  return `
    <div class="favoriteBlock">
      <img src=${isFavorite(product.id, favorites) ? starFill : star} data-favorite="favorite" alt="star" class="favoriteStar" width="25" height="25"/>
    </div>
    <img src=${product.productImage} alt=${product.productName} class="productListItemImage" width="200" />
    <p class="productListItemName">${product.productName}</p>
    <div class="productListItemOrder">
      <p class="productListItemPrice">${product.productPrice} $</p>
      <div class="productListItemCartBlock">
        <img src=${cartImage} alt="cart image" class="productListItemCartImage" width="50" height="50"/>
      </div>
    </div>
  `
}

export default {
  // productsItems: [],
  destination: '',
  userData: {},
  keys: {
    favorites: '',
    cart: '',
    products: ''
  },
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


  settings(data, products, favorites, cart) { //["myFavorites", "myCart"]
    this.userData = data;
    this.keys.favorites = favorites;
    this.keys.cart = cart;
    this.keys.products = products
  },

  async renderCards(destination, dataGetter) {
    this.destination = destination;
    if (dataGetter.constructor.name === "Array") {

        // this.userData[this.keys.products] = [...dataGetter];

      destination.innerHTML = createProductListMarkup(dataGetter, this.userData[this.keys.favorites]);
      return dataGetter;
    }

    if (dataGetter.constructor.name === "Function") {
      try {
        const data = await dataGetter();

          this.userData[this.keys.products] = [...data];

        destination.innerHTML = createProductListMarkup(data, this.userData[this.keys.favorites]);
      }
      catch (error) {
        throw new Error(error)
      }
    }

    return this.userData[this.keys.products]
  },

  addCard(product) {
    this.userData[this.keys.products] = [...this.userData[this.keys.products], product];
    this.destination.children[0].insertAdjacentHTML('afterbegin', createProductListItemMarkup(product))
  },

  deleteCard(id) {
    this.userData[this.keys.products] = this.userData[this.keys.products].filter(product => product.id !== id);
    this.destination.innerHTML = createProductListMarkup(this.userData[this.keys.products]);
  },

  editCard(id, editedProduct) {
    this.userData[this.keys.products] = this.userData[this.keys.products].map(product => {
      if (product.id === id) {
        product = { ...product, ...editedProduct }
        return product
      }
      return product
    })
    // this.destination.innerHTML = createProductListMarkup(this.productsItems);
  },

  setFavorite(e) {
    if (e.target.dataset.favorite) {
      const element = e.target.closest('[data-id]');
      const favoriteStar = element.querySelector('.favoriteStar')
      const id = element.dataset.id;
      // const product = this.productsItems.find(product => product.id === id);

      if (this.userData[this.keys.favorites].some(favorite => favorite === id)) {
        const result = this.userData[this.keys.favorites].filter(favorite => favorite !== id);
        this.userData[this.keys.favorites] = [...result];
        favoriteStar.src = star;
        // element.innerHTML = createProductListItemMarkup(product, this.favorites)
        // this.renderCards(this.destination, this.productsItems, result)
        // return result
      } else {
        this.userData[this.keys.favorites] = [...this.userData[this.keys.favorites], id];
        // favorites = [...result];
        favoriteStar.src = starFill;
        // element.innerHTML = createProductListItemMarkup(product, this.favorites)
        // this.renderCards(this.destination, this.productsItems, result)
        // return result
      }
    } else return
  },

  addToCart(e) {
    if (e.target.classList.contains('productListItemCartImage')) {
      const element = e.target.closest('[data-id]');
      const id = element.dataset.id;
      const product = this.userData[this.keys.products].find(product => product.id === id);

      const existProduct = this.userData[this.keys.cart].find(product => product.id === id);
      if (existProduct) {
        existProduct.quantity += 1;
      }
      else {
        const modifiedProduct = {
          id: product.id,
          productPrice: product.productPrice,
          productImage: product.productImage,
          productName: product.productName,
          quantity: 1
        }
        this.userData[this.keys.cart] = [modifiedProduct, ...this.userData[this.keys.cart]];
      }
    } else return
  },
}
