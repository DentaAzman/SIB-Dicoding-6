const assert = require('assert');

Feature('Unfavoriting Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario('unfavoriting one restaurant', async ({ I }) => {
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

  I.click('.resto-item__name a');

  I.waitForElement('#favoriteButton', 5);
  I.seeElement('#favoriteButton');
  I.click('#favoriteButton');

  I.amOnPage('/#/favorites');

  I.see('Tidak ada resto untuk ditampilkan', '.resto-item__not__found');
});
