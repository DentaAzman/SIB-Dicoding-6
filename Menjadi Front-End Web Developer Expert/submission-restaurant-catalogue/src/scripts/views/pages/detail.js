import RestaurantSource from '../../data/restaurant-resource';
import UrlParser from '../../routes/url-parser';
import FavoriteButtonPresenter from '../../utils/favorite-button-presenter.js';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import '../../../components/form-input.js';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb.js';

const Detail = {
  async render() {
    return `
      <div id="restoDetail" class="resto-detail"></div>
      <div id="favoriteButtonContainer"></div>
      <div class="resto-detail">
      <h3>Add Your Review</h3>
      <form-input></form-input>
      </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restoDetail');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    FavoriteButtonPresenter.init({
      favoriteButtonContainer: document.querySelector(
        '#favoriteButtonContainer'
      ),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        rating: restaurant.restaurant.rating,
        pictureId: restaurant.restaurant.pictureId,
        city: restaurant.restaurant.city,
        description: restaurant.restaurant.description,
      },
    });

    const addReviewForm = document.querySelector('form-input');
    const formElement = addReviewForm._shadowRoot.querySelector('#formReview');

    addReviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(formElement);
      const reviewData = {
        id: url.id,
        name: formData.get('name'),
        review: formData.get('review'),
      };
      await this.addReview(reviewData);
    });
  },

  async addReview(reviewData) {
    try {
      const response = await fetch(
        'https://restaurant-api.dicoding.dev/review',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewData),
        }
      );
      if (response.ok) {
        this.afterRender();
        alert('Review has been added');
      } else {
        alert('Failed to add review');
      }
      return this.afterRender();
    } catch (error) {
      console.error('Error: ', error);
      alert('Failed to add review');
    }
  },
};

export default Detail;
