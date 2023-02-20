export default class Api {

  constructor(token) {

    this._token = token;
  }

  _checkResult(res) {
  
    if (res.ok) {
      return res.json();
    } 
      return Promise.reject(res.status)
  }

  load() {

    return Promise.all([
      fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me', {
        headers: {
          authorization: this._token
        }
      }).then((res) => this._checkResult(res)),

      fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
      headers: {
        authorization: this._token
      }
    }).then((res) => this._checkResult(res))
    ])
  }

  editProfile({fullName, specialty}) {

    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: fullName,
        about: specialty
      })
    })
      .then((res) => this._checkResult(res))
  }

  addCard({name, link}) {

    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => this._checkResult(res))
  }

  deleteCard(cardId) {

    return fetch(`https://mesto.nomoreparties.co/v1/cohort-59/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      },
    })
      .then((res) => this._checkResult(res))
  }

  likeCard(cardId) {

    return fetch(`https://mesto.nomoreparties.co/v1/cohort-59/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      },
    })
      .then((res) => this._checkResult(res))
  }

  unLikeCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-59/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      },
    })
      .then((res) => this._checkResult(res))
  }

  updateAvatar({avatar}) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => this._checkResult(res))
  }
}