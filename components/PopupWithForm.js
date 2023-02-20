import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

  constructor(popup, form, handleForm) {

  	super(popup);

  	this._form = form;

    this._handleForm = handleForm;

  	this._allInput = Array.from(form.querySelectorAll('.form-popup__input'));
  }

  _getInputValues() {

  	const valueInput = {};

  	this._allInput.forEach((e) => {valueInput[e.name] = e.value});

  	return valueInput;
  }

  setEventListeners() {

    super.setEventListeners();

    this._form.addEventListener('submit', (e) => {

	    e.preventDefault();
      e.submitter.textContent === 'Создать'
      ? e.submitter.textContent = 'Создание...'
      : e.submitter.textContent = 'Сохранение...'

	    this._handleForm(this._getInputValues(), e.submitter);
	  });
  }

  close() {

  	super.close();

  	this._form.reset();
  }
}