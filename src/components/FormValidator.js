export default class FormValidator {

  constructor(form, param) {

    this.form = form;
    this.inputSelector = param.inputSelector;
    this.submitButtonSelector = param.submitButtonSelector;
    this.inactiveButtonClass = param.inactiveButtonClass;
    this.inputErrorClass = param.inputErrorClass;
    this.errorClass = param.errorClass;

    this.inputList = Array.from(this.form.querySelectorAll(this.inputSelector));
    this.buttonElement = this.form.querySelector(this.submitButtonSelector);
  }

  enableValidation() {
  
    this.form.addEventListener('submit', (e) => {

      e.preventDefault();
    });

    this._setEventListeners();
  }

  resetValidation() {
  
    this._toggleButtonState();
  
    this.inputList.forEach((input) => {
  
      this._hideInputError(input);
    });
  }

  disabledButton() {
  
    this.submitButtonSelector.submitter.disabled = true;
    this.submitButtonSelector.submitter.classList.add(this.inactiveButtonClass);
  }

  _setEventListeners() {
  
    this._toggleButtonState();
  
    this.inputList.forEach((input) => {
  
      input.addEventListener('input', () => {
  
        this._checkInputValidity(input);
  
        this._toggleButtonState();
      });
    });
  };

  _toggleButtonState() {
  
    if (this._hasInvalidInput()) {
      
      this.buttonElement.classList.add(this.inactiveButtonClass);
      this.buttonElement.disabled = true;
  
    } else {
  
      this.buttonElement.classList.remove(this.inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  }

  _hasInvalidInput() {
    
    return this.inputList.some((input) => {
  
      return !input.validity.valid;
    }); 
  }

  _checkInputValidity(input) {
  
    if (!input.validity.valid) {
  
      this._showInputError(input, input.validationMessage);
  
    } else {
  
      this._hideInputError(input);
    }
  };

  _hideInputError(input) {
  
    this.errorElement = this.form.querySelector(`.${input.id}-error`);
  
    input.classList.remove(this.inputErrorClass);
    this.errorElement.classList.remove(this.errorClass);
    this.errorElement.textContent = '';
  };

  _showInputError(input, errorMessage) { 
  
    this.errorElement = this.form.querySelector(`.${input.id}-error`); 
  
    input.classList.add(this.inputErrorClass); 
    this.errorElement.textContent = errorMessage; 
    this.errorElement.classList.add(this.errorClass); 
  };
}