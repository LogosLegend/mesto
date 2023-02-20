import Popup from './Popup.js';

export default class DeletePopup extends Popup {

  constructor(popup, deleteForm, deleteCard) {

    super(popup);
    this._deleteForm = deleteForm;
    this._deleteCard = deleteCard;
  }

  open(id, e) {
    super.open()
    this._id = id;
    this._e = e;
  }

  setEventListeners() {
  
    this._deleteForm.addEventListener('submit', (e) => {
    
      e.preventDefault();
      e.submitter.textContent = 'Удаление...'
      this._deleteCard(this._id, e.submitter)
    });

    super.setEventListeners();
  }

  deleteCard() { //В ревью говорилось реализоать этот метод в классе Card, я думаю, что имелся ввиду класс DeletePopup

    this._e.remove();
  }
}