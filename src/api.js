import axios from 'axios';


const BASE_URL = 'https://bc22-72ac2.firebaseio.com'


const transformData = (response) => {
  const data = [];
  const keys = Object.keys(response.data);
  for (const key of keys) {
    data.push({ id: key, ...response.data[key] })
  }
  return data
}


export default {

  async getProducts() {
    try {
      const response = await axios.get(`${BASE_URL}/shop/products.json`);
      return transformData(response);
    } catch (error) {
      console.log(error);
      throw new Error(error)
    }
  }

};


