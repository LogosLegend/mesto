import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  constructor(popup) {

  	super(popup);

  	this._imagePopupImg = popup.querySelector('.image-popup__img');
  	this._imagePopupTitle = popup.querySelector('.image-popup__title');
  }

  open({name, link}) {

  	this._name = name;
  	this._link = link;

  	this._imagePopupImg.src = this._link;
  	this._imagePopupImg.alt = this._name;

  	this._imagePopupTitle.textContent = this._name;
  	
  	super.open();
  }
}