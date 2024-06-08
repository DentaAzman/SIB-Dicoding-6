class ImageFigure extends HTMLElement {
  static get observedAttributes() {
    return ['img', 'altImg'];
  }

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  set img(value) {
    const hasChange = this.img != value;
    if (hasChange) {
      this.removeAttribute('img');
    }

    this.setAttribute('img', value);
  }

  get img() {
    const value = this.getAttribute('img');
    return value;
  }

  set altImg(value) {
    const hasChange = this.altImg != value;
    if (hasChange) {
      this.removeAttribute('altImg');
    }

    this.setAttribute('altImg', value);
  }

  get altImg() {
    const value = this.getAttribute('altImg');
    return value;
  }

  updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }

      figure {
        max-width: 220px;
        margin: 0;
        padding: 5px;
        border: 1px solid #c0c0c0;

        display: flex;
        flex-flow: column;
      }

      figure > img {
        max-width: 100%;
        width: 220px;
      }

      figure > figcaption {
        padding: 3px;
        background-color: black;

        text-align: center;

        color: white;
        font-family: sans-serif;
        font-size: smaller;
        font-style: italic;
      }
    `;
  }

  render() {
    this.emptyContent();
    this.updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <figure>
        <img src="${this.img}" alt="${this.altImg}" width="200">
        <figcaption>
          <slot></slot>
        </figcaption>
      </figure>
      `;
  }

  emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
}

customElements.define('image-figure', ImageFigure);