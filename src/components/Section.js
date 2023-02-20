export default class Section {

  constructor(renderer, container) {

    this._renderer = renderer;

    this._container = container;
  } 

  renderItems(initialCards) {

      initialCards.forEach((e) => {this.addItem(e)});
  }

  addItem(popupInputType) {

    this._container.prepend(this._renderer(popupInputType));
  }
}