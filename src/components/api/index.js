import axios from 'axios'

export const BurgerBuilderAPI = axios.create({
  baseURL: 'https://chemsb0rgsber-app.firebaseio.com/'
});
