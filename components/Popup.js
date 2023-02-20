export default class Popup {

  constructor(popup) {

    this._popup = popup;

      this.handleEscClose = this._handleEscClose.bind(this);
  }

  open() {

    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', this.handleEscClose);
  }

  close() {

    this._popup.classList.remove('popup_opened');

    document.removeEventListener('keydown', this.handleEscClose);
  }

  setEventListeners() {
  
    this._popup.addEventListener('mousedown', (event) => {
    
      if (event.target.closest('.button-close') || !event.target.closest('[class*="container"]')) this.close();
    });
  }

  _handleEscClose(e) {

    if (e.key === 'Escape') {
  
      this.close();
    }
  }
}