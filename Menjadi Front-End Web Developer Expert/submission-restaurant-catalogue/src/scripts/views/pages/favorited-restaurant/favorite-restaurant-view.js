import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  getTemplate() {
    return `
    <section class="content">
      <div class ="query-container">
      <p>Search</p>
      <input id="query" type="text" class="query">
      </div>

      <h2 class="page-title"><i class="fa fa-star" aria-hidden="true"></i>Your Favorite Resto<i class="fa fa-star" aria-hidden="true"></i></h2>
      
        <div id="restoList" class="resto-list">
        </div>
    </section>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    if (!restaurants) return;
    let html;
    if (restaurants.length) {
      html = restaurants.reduce(
        (carry, restaurant) =>
          carry.concat(createRestaurantItemTemplate(restaurant)),
        ''
      );
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('restoList').innerHTML = html;

    document
      .getElementById('restoList')
      .dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
    <div class="resto-item__not__found">
      Tidak ada resto untuk ditampilkan
    </div>
    `;
  }
}

export default FavoriteRestaurantView;
