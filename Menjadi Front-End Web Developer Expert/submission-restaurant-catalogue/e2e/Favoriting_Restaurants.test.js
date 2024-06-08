/* eslint-disable arrow-body-style */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
const assert = require('assert');

Feature('Favoriting Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario('showing empty favorited restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
});

Scenario('favoriting one restaurant', async ({ I }) => {
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');

  I.amOnPage('/');

  I.wait(1);

  // Menggunakan executeScript untuk mengakses shadow DOM dan berinteraksi dengan elemen di dalamnya
  const firstRestaurantName = await I.executeScript(() => {
    const restaurantList = document.querySelector('restaurant-list').shadowRoot;
    const firstRestaurantLink = restaurantList.querySelector(
      '.resto-item__name a'
    );
    if (!firstRestaurantLink) {
      throw new Error('firstRestaurantLink element does not exist');
    }
    return firstRestaurantLink.innerText;
  });

  await I.executeScript(() => {
    const restaurantList = document.querySelector('restaurant-list').shadowRoot;
    const firstRestaurantLink = restaurantList.querySelector(
      '.resto-item__name a'
    );
    if (firstRestaurantLink) {
      firstRestaurantLink.click();
    } else {
      throw new Error(
        'firstRestaurantLink element does not exist for clicking'
      );
    }
  });

  I.waitForElement('#favoriteButton', 5);
  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorites');

  I.waitForElement('.resto-item', 5);
  I.seeElement('.resto-item');

  const favoritedRestaurantName = await I.grabTextFrom('.resto-item__name');

  assert.strictEqual(firstRestaurantName, favoritedRestaurantName);
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');

  I.amOnPage('/');

  I.wait(2);

  await I.executeScript(() => {
    const restaurantList = document.querySelector('restaurant-list').shadowRoot;
    const firstRestaurantLink = restaurantList.querySelector(
      '.resto-item__name a'
    );
    if (!firstRestaurantLink) {
      throw new Error('firstRestaurantLink element does not exist');
    }
    return firstRestaurantLink.innerText;
  });

  const names = [];
  for (let i = 1; i <= 3; i++) {
    await I.executeScript((index) => {
      const restaurantList =
        document.querySelector('restaurant-list').shadowRoot;
      const restaurantLinks = restaurantList.querySelectorAll(
        '.resto-item__name a'
      );
      const selectedRestaurantLink = restaurantLinks[index - 1];
      if (selectedRestaurantLink) {
        selectedRestaurantLink.click();
      } else {
        throw new Error(
          `Restaurant link at index ${index} does not exist for clicking`
        );
      }
    }, i);

    await I.waitForElement('#favoriteButton', 5);
    await I.click('#favoriteButton');

    names.push(await I.grabTextFrom('.resto-detail__name'));

    I.amOnPage('/');
  }

  I.amOnPage('/#/favorites');

  I.seeElement('#query');

  const visibleFavoritedRestaurants = await I.grabNumberOfVisibleElements(
    '.resto-item'
  );
  assert.strictEqual(names.length, visibleFavoritedRestaurants);

  const searchQuery = names[1].substring(1, 3);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const matchingRestaurants = names.filter(
    (name) => name.indexOf(searchQuery) !== -1
  );
  const visibleSearchedFavoritedRestaurants =
    await I.grabNumberOfVisibleElements('.resto-item');

  assert.strictEqual(
    matchingRestaurants.length,
    visibleSearchedFavoritedRestaurants
  );

  for (let i = 0; i < matchingRestaurants.length; i++) {
    const visibleName = await I.grabTextFrom(
      locate('.resto-item__name').at(i + 1)
    );

    assert.strictEqual(matchingRestaurants[i], visibleName);
  }
});
