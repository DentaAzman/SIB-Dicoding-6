/* eslint-disable no-unused-vars */
const assert = require('assert');

Feature('Customer Review');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('add a customer review', async ({ I }) => {
  I.wait(2);

  // Menggunakan executeScript untuk mengakses shadow DOM dan berinteraksi dengan elemen di dalamnya
  const lastRestaurantName = await I.executeScript(() => {
    const restaurantList = document.querySelector('restaurant-list').shadowRoot;
    const restaurantLinks = restaurantList.querySelectorAll(
      '.resto-item__name a'
    );
    if (restaurantLinks.length === 0) {
      throw new Error('restaurantLink element does not exist');
    }
    const lastRestaurantLink = restaurantLinks[restaurantLinks.length - 1];
    return lastRestaurantLink.innerText;
  });

  await I.executeScript(() => {
    const restaurantList = document.querySelector('restaurant-list').shadowRoot;
    const restaurantLinks = restaurantList.querySelectorAll(
      '.resto-item__name a'
    );
    if (restaurantLinks.length === 0) {
      throw new Error('restaurantLink element does not exist');
    }
    const lastRestaurantLink = restaurantLinks[restaurantLinks.length - 1];
    lastRestaurantLink.click();
  });

  I.waitForElement('.resto-detail', 5);
  I.seeElement('.resto-detail');

  I.see('Add Your Review');
  I.seeElement('form-input');

  const reviewerName = 'Name Test';
  const reviewerReviews = 'Test Reviews';
  I.fillField('form-input input[name="name"]', reviewerName);
  I.fillField('form-input textarea[name="review"]', reviewerReviews);

  I.click('form-input button');

  I.waitForElement('.resto-detail__reviewers-name', 5);
  const lastReviewersName = await I.grabTextFrom(
    locate('.resto-detail__reviewers-name').last()
  );
  const lastReviewersReviews = await I.grabTextFrom(
    locate('.resto-detail__reviewers-comment').last()
  );

  assert.strictEqual(lastReviewersName, reviewerName);
  assert.strictEqual(lastReviewersReviews, reviewerReviews);
});
