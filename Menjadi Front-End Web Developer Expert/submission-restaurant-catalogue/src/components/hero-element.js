class HeroElement extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = null;
    this._style = null;

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
      .hero {
        display: flex;
        align-items: center;
        min-height: 380px;
        width: 100%;
        text-align: center;
        background-image: url('./images/sharped/hero-image_4-small.jpg');
        background-position: bottom;
        background-color: green;
      }
      
      .hero__inner {
        margin: 0 auto;
        max-width: 800px;
      }
      
      .hero__title {
        color: #ffffff;
        font-weight: 500;
        font-size: 36px;
      }
      
      .hero__tagline {
        color: #ffffff;
        margin-top: 16px;
        font-size: 18px;
        font-weight: 400;
      }
      
      .hero__image {
        width: 100%;
      }
      
      .hero__image img {
        width: 100%;
      }
      
      @media screen and (min-width: 700px) {
        .hero {
          background-image: url('./images/sharped/hero-image_4-large.jpg');
        }
      }

      @media screen and (min-width: 1200px) {
        .hero {
          min-width: 1000px;
        }
      }
    `;
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <div class="hero">
      <div class="hero__inner">
        <h2 class="hero__title" tabindex="0">
          Temukan Restoran Yang Cocok Untukmu!
        </h2>
        <br />
        <p class="hero__tagline" tabindex="0">
          Sudahkah Anda punya tujuan untuk makan bersama keluarga atau teman
          Anda? Tahukah Anda bahwa banyak restoran di Indonesia yang memiliki
          rating tinggi? Temukan restoran populer yang beragam nuansa dan cocok
          bagi Anda!
        </p>
      </div>
    </div>
    `;
  }
}

customElements.define('hero-element', HeroElement);
