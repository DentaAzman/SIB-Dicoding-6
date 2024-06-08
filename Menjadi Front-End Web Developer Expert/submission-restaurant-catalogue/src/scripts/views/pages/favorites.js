/* eslint-disable no-new */
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantSearchPresenter from './favorited-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantShowPresenter from './favorited-restaurant/favorite-restaurant-show-presenter';
import FavoriteRestaurantView from './favorited-restaurant/favorite-restaurant-view';

const view = new FavoriteRestaurantView();

const Favorites = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({
      view,
      favoriteRestaurants: FavoriteRestaurantIdb,
    });
    new FavoriteRestaurantSearchPresenter({
      view,
      favoriteRestaurants: FavoriteRestaurantIdb,
    });
  },
};

export default Favorites;
