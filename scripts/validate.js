const param = {
  formSelector: '.form-popup__form',
  inputSelector: '.form-popup__input',
  submitButtonSelector: '.form-popup__button-submit',
  inactiveButtonClass: 'form-popup__button-submit_disable',
  inputErrorClass: 'form-popup__input_type_error',
  errorClass: 'form-popup__error_visible'
};


function showInputError(form, input, errorMessage, param) {

  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.add(param.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(param.errorClass);
};

function hideInputError(form, input, param) {

  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.remove(param.inputErrorClass);
  errorElement.classList.remove(param.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(form, input, params) {

  if (!input.validity.valid) {

    showInputError(form, input, input.validationMessage, param);

  } else {

    hideInputError(form, input, param);
  }
};

function hasInvalidInput(inputList) {
  
  return inputList.some((input) => {

    return !input.validity.valid;
  }); 
}

function toggleButtonState(inputList, buttonElement, param) {

  if (hasInvalidInput(inputList)) {
    
    buttonElement.classList.add(param.inactiveButtonClass);
    buttonElement.disabled = true;

  } else {

    buttonElement.classList.remove(param.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(form, param) {

  const inputList = Array.from(form.querySelectorAll(param.inputSelector));
  const buttonElement = form.querySelector(param.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, param);

  inputList.forEach((input) => {

    input.addEventListener('input', () => {

      checkInputValidity(form, input, param);

      toggleButtonState(inputList, buttonElement, param);
    });
  });
};

function resetValidation(form, param) {

  const inputList = Array.from(editProfilePopup.querySelectorAll(param.inputSelector));
  const buttonElement = editProfilePopup.querySelector(param.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, param);

  inputList.forEach((input) => {

      hideInputError(form, input, param);
  });
}

function enableValidation(param) {

  const formList = Array.from(document.querySelectorAll(param.formSelector));
  
  formList.forEach((form) => {

    form.addEventListener('submit', (e) => {

      e.preventDefault();
    });

    setEventListeners(form, param);
  });
}

enableValidation(param);