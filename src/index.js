import axios from 'axios';
import navigation from './components/navigation/navigation';
import productCard from './components/productsCard/productsCard';
import api from './api';

import './styles.css';
import productsCard from './components/productsCard/productsCard';


const elements = ['Home', 'About', 'Contacts', 'Products', 'Cart'];
const sidebar = ['TV', 'Toys', 'Weapon', 'Tools'];

const headerNavigation = document.querySelector('.headerNavigation');
const sidebarNavigation = document.querySelector('.sidebarNavigation');
const products = document.querySelector('.products');



const getPage = (e) => {
  const link = navigation.getActiveLink(e);
  console.log(link);
}


// api.getProducts();





navigation.createLinks(headerNavigation, elements);
headerNavigation.addEventListener('click', getPage);

navigation.createLinks(sidebarNavigation, sidebar);
sidebarNavigation.addEventListener('click', getPage);


// api.getProducts().then(data=> productsCard.renderCards(products, data)).catch(error=> {
//   fdgdsh.innerText = "error"
// });


const userData = {
  favorites: ['-MCSPrDcNr8ZqA5HrGd_', '-MCSeIvv3xD3ecQc13y9', '-MCSiwOfFnBG5dTukQ96', '-MCSunpAuTod5JykM1C_']
}


const setFavorite = (e) => {
  const result = productsCard.setFavorite(e, userData.favorites);
  console.log(result);
  userData.favorites = [...result]
}



// const addToCart = (e) => {
// const product = productsCard.addToCart(e);
// }




productsCard.renderCards(products, api.getProducts, userData.favorites)
  .then(data => console.log(data))
// .then(()=> )
// .then(() => productsCard.editCard( '-MCRDcLiYq6oFh_bMRoX', { productName: "TEST", productPrice: "5467435" }));
products.addEventListener('click', setFavorite)
// products.addEventListener('click', addToCart)



























// const product = {

// }


// const getInfo = (e) => {
//   console.log('product before', product)
//   product[e.target.name] = e.target.value;
//   console.log('product after', product)

// }

// const form = document.forms.productListForm;
// form.addEventListener('input', getInfo)







