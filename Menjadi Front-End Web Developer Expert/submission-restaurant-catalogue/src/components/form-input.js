class FormInput extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = null;
    this._style = null;
    this._nameValidation = null;
    this._reviewValidation = null;

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this._shadowRoot.appendChild(this._style);
    this.render();
  }

  connectedCallback() {
    const unfilledForm = this._shadowRoot.querySelector('form');
    const nameInput = unfilledForm.elements.name;
    const reviewInput = unfilledForm.elements.review;

    const customValidationInputHandler = (event) => {
      event.target.setCustomValidity('');

      if (event.target.validity.valueMissing) {
        event.target.setCustomValidity('Harus diisi.');
      }
    };

    nameInput.addEventListener('input', customValidationInputHandler);
    nameInput.addEventListener('invalid', customValidationInputHandler);

    reviewInput.addEventListener('input', customValidationInputHandler);
    reviewInput.addEventListener('invalid', customValidationInputHandler);

    nameInput.addEventListener('blur', () =>
      this.updateValidationMessage(nameInput, this._nameValidation)
    );
    reviewInput.addEventListener('blur', () =>
      this.updateValidationMessage(reviewInput, this._reviewValidation)
    );

    unfilledForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = nameInput.value;
      const review = reviewInput.value;

      this.dispatchEvent(
        new CustomEvent('submit', { detail: { name, review } })
      );

      unfilledForm.reset();
    });
  }

  updateValidationMessage(input, validationMessageElement) {
    const isValid = input.validity.valid;
    const errorMessage = input.validationMessage;

    if (errorMessage && !isValid) {
      validationMessageElement.innerText = errorMessage;
    } else {
      validationMessageElement.innerText = '';
    }
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }
      
      label {
        display: inline-block;
        margin-block-end: 0.5rem;
      }
      
      input,
      textarea {
        display: block;
      
        padding: 0.8rem 0.3rem;
        border: 1px solid black;
        border-radius: 10px;
      
        width: 100%;
      }
      
      textarea {
        resize: vertical;
      }
      
      button {
        appearance: none;
        -webkit-appearance: none;
      
        margin: 0;
        padding: 0;
        border: none;
      
        display: inline-block;
        background: transparent;
      
        line-height: 1;
      
        cursor: pointer;
      }
      
      label,
      input,
      button {
        font-size: 1.1rem;
      
        transition: all 150ms linear;
      }
      
      .form-group {
        margin-block-end: 1rem;
      }
      
      input:focus-visible,
      textarea:focus-visible {
        appearance: none;
        outline: none;
      
        box-shadow: 0 0 0 6px rgb(30, 144, 255, 0.65);
      }
      
      .btn-container {
        display: flex;
        justify-content: center;
      }
      
      .btn {
        background-color: rgb(0, 141, 218);
      
        border-radius: 0.3rem;
        padding: 0.8rem 3rem;
      
        color: beige;
      }
      
      .btn:hover {
        background-color: rgb(0, 157, 241);
      }
      
      .btn:active {
        background-color: rgb(65, 201, 226);
      }
      
      .validation-message {
        margin-block-start: 0.5rem;
        color: red;
      }
    `;
  }

  render() {
    this._updateStyle();

    this._shadowRoot.innerHTML += `
      <form id="formReview">
        <div class="form-group">
          <label for="name">Nama</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            required 
            aria-describedby="nameValidation">
          <p id="nameValidation" class="validation-message" aria-live="polite"></p>
        </div>

        <div class="form-group">
          <label for="review">Review</label>
          <textarea 
            name="review" 
            id="review" 
            rows="3" 
            required 
            aria-describedby="reviewValidation"></textarea>
          <p id="reviewValidation" class="validation-message" aria-live="polite"></p>
        </div>

        <div class="form-group btn-container">
          <button class="btn">Add Review</button>
        </div>
      </form>
    `;

    this._nameValidation = this._shadowRoot.getElementById('nameValidation');
    this._reviewValidation =
      this._shadowRoot.getElementById('reviewValidation');
  }
}

customElements.define('form-input', FormInput);
