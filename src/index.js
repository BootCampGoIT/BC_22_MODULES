import navigation from './components/navigation/navigation';
import productsCard from './components/productsCard/productsCard';
import productPageMain from './pages/ProductsPage';
import cart from './components/cart/cart';
import { MyData } from './userData';
import refs from './refs';
import './styles.css';

// =========== settings =======================

productsCard.settings(MyData, "myProducts", "myFavorites", "myCart");
cart.settings(MyData, "myCart", "myOrders");

// ================================================
const elements = ['Home', 'About', 'Contacts', 'Products', 'Cart'];

const getPage = (e) => {
  refs.main.innerHTML = '';
  const link = navigation.getActiveLink(e);
  switch (link) {
    case "Cart":
      cart.openCart(refs.main, MyData.myCart);
      refs.main.addEventListener('click', cart.getOrder.bind(cart))
      break;
    case "Products":
      productPageMain();
      break;
    default:
      refs.main.innerHTML = ''
      break;
  }
}

navigation.createLinks(refs.headerNavigation, elements);
refs.headerNavigation.addEventListener('click', getPage);








// productsCard.renderCards(productsPage, api.getProducts)

// productsPage.addEventListener('click', (e) => productsCard.setFavorite(e));
// productsPage.addEventListener('click', (e) => {
//   productsCard.addToCart(e);
//   console.log('cart', cart)
// });



// Description: productsCard.settings(Object, "first", "second")
// Object - typeObject with keys:
// first: how called your favorites || null,  your favorites key name
// second: how called your cart || null,  your cart key name

























// const product = {

// }


// const getInfo = (e) => {
//   console.log('product before', product)
//   product[e.target.name] = e.target.value;
//   console.log('product after', product)

// }

// const form = document.forms.productListForm;
// form.addEventListener('input', getInfo)







