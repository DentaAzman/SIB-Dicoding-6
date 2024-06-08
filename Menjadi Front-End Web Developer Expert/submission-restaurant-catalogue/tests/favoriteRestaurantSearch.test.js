/* eslint-disable no-unused-vars */
import { spyOn } from 'jest-mock';
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/favorited-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/favorited-restaurant/favorite-restaurant-view';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllRestaurants: jest.fn(),
      searchRestaurants: jest.fn(),
    };

    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('resto a');

      expect(presenter.latestQuery).toEqual('resto a');
    });

    it('should ask the model to search for favorited restaurants', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('resto a');

      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith(
        'resto a'
      );
    });

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restoList')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.resto-item').length).toEqual(3);

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, name: 'resto abc' },
            { id: 222, name: 'resto def' },
            { id: 333, name: 'resto ghi' },
          ];
        }
        return [];
      });

      searchRestaurants('resto a');
    });

    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restoList')
        .addEventListener('restaurants:updated', () => {
          const restaurantNames =
            document.querySelectorAll('.resto-item__name');
          expect(restaurantNames.item(0).textContent).toEqual('resto abc');
          expect(restaurantNames.item(1).textContent).toEqual('resto def');
          expect(restaurantNames.item(2).textContent).toEqual('resto ghi');
          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'resto a') {
          return [
            { id: 111, name: 'resto abc' },
            { id: 222, name: 'resto def' },
            { id: 333, name: 'resto ghi' },
          ];
        }
        return [];
      });

      searchRestaurants('resto a');
    });

    it('should show - when the restaurant returned does not contain a name', (done) => {
      document
        .getElementById('restoList')
        .addEventListener('restaurants:updated', () => {
          const restaurantNames =
            document.querySelectorAll('.resto-item__name');
          expect(restaurantNames.item(0).textContent).toEqual('-');

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'resto a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchRestaurants('resto a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants('    ');

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('restoList')
        .addEventListener('restaurants:updated', () => {
          expect(
            document.querySelectorAll('.resto-item__not__found').length
          ).toEqual(1);
          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);

      searchRestaurants('resto a');
    });

    it('should not show any restaurant', (done) => {
      document
        .getElementById('restoList')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.resto-item').length).toEqual(0);

          done();
        });
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);

      searchRestaurants('resto a');
    });
  });
});
