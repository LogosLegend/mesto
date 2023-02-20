export default class UserInfo {

  constructor(title, subtitle) {

  	this._title = title;
  	this._subtitle = subtitle;
  }

  getUserInfo() {

  	return [this._title.textContent, this._subtitle.textContent];
  }

  setUserInfo(data) {

    this._title.textContent = data.name;
    this._subtitle.textContent = data.about;
  }
}