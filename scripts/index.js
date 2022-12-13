const body = document.querySelector('.body');

body.classList.remove('preload');//Включение анимации после загрузки попапов

const gallery = document.querySelector('.gallery');

//Добавление карт с картинками
const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
    {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
];

function addGalleryCard() {

  const galleryCards = document.querySelectorAll('.gallery__card');

  for (let i = galleryCards.length; i < initialCards.length; i++) {
  
    const galleryTemplate = document.querySelector('#gallery-template').content;
    const galleryCardClone = galleryTemplate.querySelector('.gallery__card').cloneNode(true);
  
    galleryCardClone.querySelector('.gallery__img').src = initialCards[i].link;
    galleryCardClone.querySelector('.gallery__img').alt = initialCards[i].name;
  
    galleryCardClone.querySelector('.gallery__title').textContent = initialCards[i].name;
    
    gallery.prepend(galleryCardClone);
  }
}

addGalleryCard();

const popups = document.querySelectorAll('.popup'),
    popupInputTypeName = document.querySelector('.form-popup__input_type_profile-name'),
    popupInputTypeSpecialty = document.querySelector('.form-popup__input_type_specialty'),
    profileInfoTitle = document.querySelector('.profile__info-title'), 
    profileInfoSubtitle = document.querySelector('.profile__info-subtitle'),
    profileButtons = document.querySelectorAll('.profile__button');

    popupInputTypeName.value = profileInfoTitle.textContent;
    popupInputTypeSpecialty.value = profileInfoSubtitle.textContent;

//Открытие попапов в Профиле
profileButtons.forEach(function(e, i) {

  e.addEventListener('click', function() {

    popups[i].classList.add('popup_opened');
  });
});

//Закрытие попапов
popups.forEach(function(e) {

  e.addEventListener('mousedown', function() {
  
    if (event.target.closest('.button-close') || !event.target.closest('[class*="container"]')) closePopup(e);
  });

  document.addEventListener('keydown', function(k) {

    if (k.which === 27 && e.classList.contains('popup_opened')) closePopup(e);

  });
});

function closePopup(popup) {

  popup.classList.remove('popup_opened');
}

const popupForms = document.querySelectorAll('.form-popup__form');

//Обработка форм при нажатии кнопок в попапах Профиля
popupForms.forEach(function(e) {

  e.addEventListener('submit', function(button) {
    button.preventDefault();

    switch (e.name) {

      case 'editProfileForm':

        handleFormInfo(e);
        break;

      case 'editCardForm':

        handleFormCard(e);
    }
  });
});

function handleFormInfo (e) {//Изменение имени и специальности в профиле

  profileInfoTitle.textContent = popupInputTypeName.value;
  profileInfoSubtitle.textContent = popupInputTypeSpecialty.value;

  closePopup(e.closest('.popup'));
}

const popupInputTypeCardName = document.querySelector('.form-popup__input_type_card-name'),
    popupInputTypeLink = document.querySelector('.form-popup__input_type_link');

function handleFormCard (e) {//Добавленине названия и ссылки на картинку в массив с последующим вызовом функции добавления карточки из массива

  initialCards.push({name: `${popupInputTypeCardName.value}`, link: `${popupInputTypeLink.value}`});

  addGalleryCard();

  closePopup(e.closest('.popup'));

  popupInputTypeCardName.value = '';
  popupInputTypeLink.value = '';
}

//Обработка событий в галерее
gallery.addEventListener('click', function(e) {

    switch (true) {

      case e.target.classList.contains('gallery__trash-button'):

        DeleteCard(e);//Удаление карточки
        break;

      case e.target.classList.contains('gallery__like-button'):

        LikeCard(e);//Лайк карточки
        break;

      case e.target.classList.contains('gallery__img'):

        openImagePopup(e);//Открытие попапа карточки
  }
});

function DeleteCard(e) {

  const galleryTrashButtons = document.querySelectorAll('.gallery__trash-button');
      indexCardToDelete = Array.prototype.indexOf.call(galleryTrashButtons, e.target);

  e.target.closest('.gallery__card').remove();

  const indexReverse = galleryTrashButtons.length - 1 - indexCardToDelete;
  //После удаления карточки, удаляется соответствующая запись из массива карт
  //Так как карточки выводятся вначало, а в массив данные поступают в конец,
  //то для поиска необходимых записей в массиве индексы нужно "перевернуть".
  //Если серверная часть будет хранить массивы, то в будущем не придётся делать
  //функционал для удаления записей из массива.

  initialCards.splice(indexReverse, 1);
}

function LikeCard(e) {

  e.target.classList.toggle('gallery__like-button_type_active');
}

function openImagePopup(e) {

  const imagePopup = document.querySelector('.image-popup'); 

  imagePopup.querySelector('.image-popup__img').src = e.target.src; 
  imagePopup.querySelector('.image-popup__img').alt = e.target.alt; 

  imagePopup.querySelector('.image-popup__title').textContent = e.target.alt;

  imagePopup.classList.add('popup_opened');
}