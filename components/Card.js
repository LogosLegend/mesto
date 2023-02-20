export default class Card {

  constructor({likes, _id, name, link, owner}, galleryTemplate, _myid, fillPopup, openDeletePopup, like, unLike) {

    this._id = _id;
    this._name = name;
    this._link = link;
    this._myid = _myid;
    this._owid = owner._id;
    this._likes = likes;

    likes.forEach((e) => {if (e._id === this._myid) {this._likes = true}});

    this._likesAmount = Object.keys(likes).length;

    this._galleryCardClone = galleryTemplate.querySelector('.gallery__card').cloneNode(true);
    this._fillPopup = fillPopup;
    this._openDeletePopup = openDeletePopup;
    this._like = like;
    this._unLike = unLike;

    this._galleryImgClone = this._galleryCardClone.querySelector('.gallery__img');
    this._galleryTitleClone = this._galleryCardClone.querySelector('.gallery__title');
    this._galleryTrashButtonClone = this._galleryCardClone.querySelector('.gallery__trash-button');

    this._galleryLikeButtonClone = this._galleryCardClone.querySelector('.gallery__like-button');
    this._galleryLikeAmount = this._galleryCardClone.querySelector('.gallery__like-amount');
  }

  createCard() {

    this._galleryTitleClone.textContent = this._name;
    this._galleryImgClone.src = this._link;
    this._galleryImgClone.alt = this._name;
    this._galleryLikeAmount.textContent = this._likesAmount;

    this._assigningHandlers();

    return this._galleryCardClone;
  }

  _assigningHandlers() {

    this._owid === this._myid
    ? this._galleryTrashButtonClone.addEventListener('click', (e) => {

      this._openDeletePopup(this._id, e.target.closest('.gallery__card'));
    })

    : this._galleryCardClone.querySelector('.gallery__trash-button').remove();


    if (this._likes === true) {this._galleryLikeButtonClone.classList.add('gallery__like-button_type_active')};
    this._galleryLikeButtonClone.addEventListener('click', (e) => {

      e.target.closest('.gallery__like-button_type_active')
      ? this._unLike(this._id, this._galleryLikeAmount, e.target)
      : this._like(this._id, this._galleryLikeAmount, e.target);
    });

    this._galleryImgClone.addEventListener('click', (e) => {

      this._fillPopup({name: this._name, link: this._link});
    });
  }
}