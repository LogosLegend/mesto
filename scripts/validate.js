const param = {
  formSelector: '.form-popup__form',
  inputSelector: '.form-popup__input',
  submitButtonSelector: '.form-popup__button-submit',
  inactiveButtonClass: 'form-popup__button-submit_disable',
  inputErrorClass: 'form-popup__input_type_error',
  errorClass: 'form-popup__error_visible'
};


function showInputError(form, input, errorMessage) {

  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.add(param.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(param.errorClass);
};

function hideInputError(form, input) {

  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.remove(param.inputErrorClass);
  errorElement.classList.remove(param.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(form, input) {

  if (!input.validity.valid) {

    showInputError(form, input, input.validationMessage);

  } else {

    hideInputError(form, input);
  }
};

function hasInvalidInput(inputList) {
  
  return inputList.some((input) => {

    return !input.validity.valid;
  }); 
}

function toggleButtonState(inputList, buttonElement) {
  
  if (hasInvalidInput(inputList)) {
    
    buttonElement.classList.add(param.inactiveButtonClass);

  } else {
    
    buttonElement.classList.remove(param.inactiveButtonClass);
  }
}

function setEventListeners(form) {

  const inputList = Array.from(form.querySelectorAll(param.inputSelector));
  const buttonElement = form.querySelector(param.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((input) => {

    input.addEventListener('input', () => {

      checkInputValidity(form, input);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

function resetValidation(form) {

  const inputList = Array.from(editProfilePopup.querySelectorAll(param.inputSelector));
  const buttonElement = editProfilePopup.querySelector(param.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((input) => {

      hideInputError(form, input);
  });
}

function enableValidation() {

  const formList = Array.from(document.querySelectorAll(param.formSelector));
  
  formList.forEach((form) => {

    form.addEventListener('submit', (e) => {

      e.preventDefault();
    });

    setEventListeners(form);
  });
}

enableValidation();