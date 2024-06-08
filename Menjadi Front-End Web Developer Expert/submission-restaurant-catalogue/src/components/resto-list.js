import { createSkeletonRestaurantTemplate } from '../scripts/views/templates/template-creator';

class RestaurantList extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = null;
    this._style = null;

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      .content {
        padding: 32px;
      }
      
      .explore {
        width: 100%;
        margin: 40px auto;
        text-align: center;
      }
      
      .explore__label {
        font-size: 32px;
        font-weight: 400;
      }
      
      .explore__label::after {
        content: '';
        margin-top: 16px;
        display: block;
        border-bottom: 1px solid #aecbff;
    }

      .resto-list {
        display: grid;
        grid-row-gap: 20px;
      
        margin: 32px auto auto;
        text-align: left;
      }
      
      .resto-item {
        margin: 16px 0;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
        background-color: rgb(213, 238, 255);
      }
      
      .resto-item__thumbnail {
        position: relative;
      }
      
      .resto-item__city-container {
        position: absolute;
        top: 10%;
        background-color: rgb(68, 159, 219);
        border-radius: 0 5px 5px 0;
      }
      
      .resto-item__city {
        padding: 10px 14px;
        margin: 0;
        font-weight: 700;
      }
      
      .resto-item__img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        object-position: center;
      }

      .resto-item__name {
        margin: 0;
        font-size: 1.5em; 
      }
      
      .resto-item__name a {
        display: block;
        text-decoration: none;
        color: rgb(27, 38, 44);

        text-align: center;
        line-height: 45px;
      }
      
      .resto-item__info {
        padding: 16px;
      }
      
      .resto-item__rating {
        font-weight: 700;
        margin: 0;
        text-align: center;
      }

      .resto-item__description {
        margin-top: 0;
        text-align: justify;
      }

      .skeleton {
        user-select: none;
        background-color: #eeeeee;
        color: #eeeeee;
      }

      @media screen and (max-width: 400px) {
        .explore__label {
          font-size: 28px;
        }
      
        .resto-item__description {
          font-size: 16px;
        }
      }

      @media screen and (min-width: 700px) {
        .resto-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 24px;
          grid-row-gap: 16px;
        }
      }

      @media screen and (min-width: 950px) {
        .resto-list {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
        }
      }
    `;
  }

  render() {
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <section class="content">
      <div class="explore">
        <h2 class="explore__label" tabindex="0">Explore Restaurant</h2>

        <div id="restoList" class="resto-list">
        ${createSkeletonRestaurantTemplate(20)}
        </div>
      </div>
    </section>
    `;
  }
}

customElements.define('restaurant-list', RestaurantList);
