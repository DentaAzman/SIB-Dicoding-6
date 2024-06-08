import anime from 'animejs';

class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        width: 100%;
      }

      div {
        padding: 2px 2px;
      }

      .ml5 {
        position: relative;
        
        font-size: 3em;
        color: rgb(247, 238, 221);

        display: flex;
        
        justify-content: center;
      }
      
      .ml5 .text-wrapper {
        position: relative;
        display: inline-block;
        padding-top: 0.1em;
        padding-right: 0.05em;
        padding-bottom: 0.15em;
        line-height: 1em;
        
      }
      
      .ml5 .line {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        height: 5px;
        width: 100%;
        background-color: rgb(247, 238, 221);
        transform-origin: 0.5 0;
      }
      
      .ml5 .letters {
        display: inline-block;
        opacity: 0;
        font-family: Baskerville, serif;
        text-align: center;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
    this.animateText();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div>
        <h1 class="ml5">
          <span class="text-wrapper">
            <span class="line line1"></span>
            <span class="letters letters-left">-Notes</span>
            <span class="letters letters-right">App-</span>
            <span class="line line2"></span>
          </span>
        </h1>
      </div>  
    `;
  }

  animateText() {
    anime
      .timeline({ loop: false })
      .add({
        targets: this._shadowRoot.querySelector('.line'),
        opacity: [0.5, 1],
        scaleX: [0, 1],
        easing: 'easeInExpo',
        duration: 400,
      })
      .add({
        targets: this._shadowRoot.querySelectorAll('.line'),
        duration: 500,
        easing: 'easeInExpo',
        translateY: (el, i) => -0.625 + 0.625 * 2 * i + 'em',
      })
      .add({
        targets: this._shadowRoot.querySelector('.letters-left'),
        opacity: [0, 1],
        translateX: ['0.5em', 0],
        easing: 'easeInExpo',
        duration: 600,
        offset: '-=300',
      })
      .add({
        targets: this._shadowRoot.querySelector('.letters-right'),
        opacity: [0, 1],
        translateX: ['-0.5em', 0],
        easing: 'easeInExpo',
        duration: 600,
        offset: '-=600',
      });
  }
}

customElements.define('app-bar', AppBar);
