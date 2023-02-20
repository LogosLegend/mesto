export default class Avatar {

  constructor(element) {

  	this._element = element;
  }

  updateAvatar(data) {

    this._element.src = data.avatar;
  }
}