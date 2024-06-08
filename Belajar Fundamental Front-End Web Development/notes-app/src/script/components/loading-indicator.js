class LoadingIndicator extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this._shadowRoot.appendChild(this._style);
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
    this._shadowRoot.appendChild(link);
    this.render();
  }

  connectedCallback() {}

  _updateStyle() {
    this._style.textContent = `
      .loading-overlay {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }
      
      .loading-indicator {
        font-size: 4rem;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
      }
      
      .loading-indicator p {
        font-size: 1.5rem;
      }
    `;
  }

  render() {
    this._updateStyle();

    this._shadowRoot.innerHTML += `
    <div class="loading-overlay" id="loadingOverlay">
      <div class="loading-indicator" id="loadingIndicator">
        <i class="fas fa-circle-notch fa-spin"></i>
        <p>Loading</p>
      </div>
    </div>
    `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);
