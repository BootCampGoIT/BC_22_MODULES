import productsCard from '../components/productsCard/productsCard.js';
import api from '../api';
import { MyData } from '../userData.js';
import navigation from '../components/navigation/navigation.js';
import refs from '../refs';

const sidebar = ['All', 'Food', 'Toys', 'Weapon', 'Tools'];


const productPageMain = () => {
  const products = document.createElement('div');


  const sidebarNavigation = document.createElement('div');
  const productsContainer = document.createElement('div');

  products.classList.add('productsPageConteiner');
  sidebarNavigation.classList.add('sidebarNavigation');

  navigation.createLinks(sidebarNavigation, sidebar);

  products.append(sidebarNavigation);
  products.append(productsContainer);

  refs.main.append(products);

  productsCard.renderCards(productsContainer, api.getProducts);


  const getLink = async (e) => {
    const link = navigation.getActiveLink(e);
    
    if (e.target.closest('.sidebarNavigation')) {
      if (link === "All") {
        productsCard.renderCards(productsContainer, api.getProducts)
      } else {
        const data = await api.getProducts();
        productsCard.renderCards(productsContainer, data.filter(product => product.category.toLowerCase() === link.toLowerCase()))
      }
    }
  }

  productsContainer.addEventListener('click', (e) => productsCard.setFavorite(e));
  productsContainer.addEventListener('click', (e) => productsCard.addToCart(e));
  sidebarNavigation.addEventListener('click', getLink);


}

export default productPageMain;
