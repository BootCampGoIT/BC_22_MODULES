import navigation from './components/navigation/navigation';
import api from './api';
import productsCard from './components/productsCard/productsCard';
import { createCartListMarkup } from './components/cart/cart';
import './styles.css';


export const MyData = {
  products: [],
  myFavorites: ['-MCSPrDcNr8ZqA5HrGd_', '-MCSeIvv3xD3ecQc13y9', '-MCSiwOfFnBG5dTukQ96', '-MCSunpAuTod5JykM1C_'],
  myCart: []
};

const elements = ['Home', 'About', 'Contacts', 'Products', 'Cart'];
const sidebar = ['All', 'Food', 'Toys', 'Weapon', 'Tools'];

const headerNavigation = document.querySelector('.headerNavigation');
const main = document.querySelector('.main')
const sidebarNavigation = document.querySelector('.sidebarNavigation');
const products = document.querySelector('.products');


(async function () {
  MyData.products = [... await api.getProducts()]
})();




const getPage = (e) => {



  const link = navigation.getActiveLink(e);
  if (link === "Cart") {
    main.innerHTML = createCartListMarkup(MyData.products);
  }


  if (e.currentTarget.classList.contains('sidebarNavigation')) {
    if (link === "All") {
      productsCard.renderCards(products, MyData.products)
      return
    }
    productsCard.renderCards(products, MyData.products.filter(product => product.category.toLowerCase() === link.toLowerCase()))
  }

  // switch (link) {
  //   case "All":
  //     productsCard.renderCards(products, products)
  //     break;
  //   case "Toys":
  //     productsCard.renderCards(products, products.filter(product=> product.category === "Toys"))
  //     break;
  //   case "Tools":
  //     productsCard.renderCards(products, products.filter(product=> product.category === "Tools"))
  //     break;
  //   case "Food":

  //     break;
  //   case "Weapon":

  //     break;


  //   default:
  //     break;
  // }

}

navigation.createLinks(headerNavigation, elements);
headerNavigation.addEventListener('click', getPage);

navigation.createLinks(sidebarNavigation, sidebar);
sidebarNavigation.addEventListener('click', getPage);




// Description: productsCard.settings(Object, "first", "second")
// Object - typeObject with keys:
// first: how called your favorites || null,  your favorites key name
// second: how called your cart || null,  your cart key name

productsCard.settings(MyData, "myFavorites", "myCart")

productsCard.renderCards(products, api.getProducts)
  .then(data => console.log(data))
// .then(()=> )
// .then(() => productsCard.editCard( '-MCRDcLiYq6oFh_bMRoX', { productName: "TEST", productPrice: "5467435" }));

products.addEventListener('click', (e) => productsCard.setFavorite(e));
products.addEventListener('click', (e) => productsCard.addToCart(e));




























// const product = {

// }


// const getInfo = (e) => {
//   console.log('product before', product)
//   product[e.target.name] = e.target.value;
//   console.log('product after', product)

// }

// const form = document.forms.productListForm;
// form.addEventListener('input', getInfo)







