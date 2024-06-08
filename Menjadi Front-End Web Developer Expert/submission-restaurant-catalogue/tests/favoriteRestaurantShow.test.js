/* eslint-disable no-new */
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/favorited-restaurant/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/favorited-restaurant/favorite-restaurant-show-presenter';

describe('Showing all favorite restaurants', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been favorited', () => {
    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurants have been favorited', (done) => {
      document
        .getElementById('restoList')
        .addEventListener('restaurants:updated', () => {
          expect(
            document.querySelectorAll('.resto-item__not__found').length
          ).toEqual(1);

          done();
        });

      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });

    describe('When favorite restaurants exist', () => {
      it('should show the restaurants', (done) => {
        document
          .getElementById('restoList')
          .addEventListener('restaurants:updated', () => {
            expect(document.querySelectorAll('.resto-item').length).toEqual(2);

            done();
          });

        const favoriteRestaurants = {
          getAllRestaurants: jest.fn().mockImplementation(() => [
            {
              id: 11,
              name: 'A',
              city: 'ab',
              rating: 3,
              description: 'Sebuah resto A',
            },
            {
              id: 2,
              name: 'B',
              city: 'cd',
              rating: 4,
              description: 'Sebuah resto B',
            },
          ]),
        };

        new FavoriteRestaurantShowPresenter({
          view,
          favoriteRestaurants,
        });
      });
    });
  });
});
