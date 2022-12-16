const body = document.querySelector('.body');

body.classList.remove('preload');//Включение анимации после загрузки попапов

const gallery = document.querySelector('.gallery'),
      galleryTemplate = document.querySelector('#gallery-template').content,
      popups = document.querySelectorAll('.popup'),
      popupInputTypeName = document.querySelector('.form-popup__input_type_profile-name'),
      popupInputTypeSpecialty = document.querySelector('.form-popup__input_type_specialty'),
      profileInfoTitle = document.querySelector('.profile__info-title'), 
      profileInfoSubtitle = document.querySelector('.profile__info-subtitle'),
      profileButtons = document.querySelectorAll('.profile__button'),
      imagePopup = document.querySelector('.image-popup'),
      imagePopupImg = imagePopup.querySelector('.image-popup__img'),
      imagePopupTitle = imagePopup.querySelector('.image-popup__title'),
      editProfilePopup = document.querySelector('.edit-profile-popup'),
      editCardPopup = document.querySelector('.edit-card-popup'),
      profileButtonResponsibleEditInfo = document.querySelector('.profile__button_responsible_edit-info'),
      profileButtonResponsibleAddCard = document.querySelector('.profile__button_responsible_add-card'),
      popupForms = document.querySelectorAll('.form-popup__form'),
      popupInputTypeCardName = document.querySelector('.form-popup__input_type_card-name'),
      popupInputTypeLink = document.querySelector('.form-popup__input_type_link');

//Добавление карт с картинками из массива
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

for (let i = 0; i < initialCards.length; i++) {

  gallery.prepend(createCard(initialCards[i].link, initialCards[i].name));
}

//Открытие попапов Профиля
function openPopup(popup) {

  popup.classList.add('popup_opened');
}

profileButtonResponsibleEditInfo.addEventListener('click', function(){

  popupInputTypeName.value = profileInfoTitle.textContent;
  popupInputTypeSpecialty.value = profileInfoSubtitle.textContent;

  openPopup(editProfilePopup);
});

profileButtonResponsibleAddCard.addEventListener('click', function(){

  openPopup(editCardPopup);
});

//Закрытие попапов
function closePopup(popup) {

  popup.classList.remove('popup_opened');
}

popups.forEach(function(e) {

  e.addEventListener('mousedown', function() {
  
    if (event.target.closest('.button-close') || !event.target.closest('[class*="container"]')) closePopup(e);
  });

  document.addEventListener('keydown', function(k) {

    if (k.key == 'Escape' && e.classList.contains('popup_opened')) closePopup(e);

  });
});

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

//Функция для создания карточки из данных от пользователя
function createCard(link, name) {

  const galleryCardClone = galleryTemplate.querySelector('.gallery__card').cloneNode(true);

  galleryCardClone.querySelector('.gallery__img').src = link;
  galleryCardClone.querySelector('.gallery__img').alt = name;

  galleryCardClone.querySelector('.gallery__title').textContent = name;

  galleryCardClone.addEventListener('click', function(e) {

    switch(true) {

      case e.target.classList.contains('gallery__trash-button'):

        deleteCard(e);//Удаление карточки
        break;

      case e.target.classList.contains('gallery__like-button'):

        likeCard(e);//Лайк карточки
        break;

      case e.target.classList.contains('gallery__img'):

        fillPopup(e);//Открытие попапа карточки
    }
  });
  
  return galleryCardClone;
}

//Функция для изменения имени и специальности в профиле
function handleFormInfo(e) {

  profileInfoTitle.textContent = popupInputTypeName.value;
  profileInfoSubtitle.textContent = popupInputTypeSpecialty.value;

  closePopup(e.closest('.popup'));
}

//Функция для обработки данных от формы для создания карт
function handleFormCard(e) {

  gallery.prepend(createCard(popupInputTypeLink.value, popupInputTypeCardName.value));

  closePopup(e.closest('.popup'));

  e.reset();
}

function deleteCard(e) {

  e.target.closest('.gallery__card').remove();
}

function likeCard(e) {

  e.target.classList.toggle('gallery__like-button_type_active');
}

function fillPopup(e) {

  imagePopupImg.src = e.target.src; 
  imagePopupImg.alt = e.target.alt; 

  imagePopupTitle.textContent = e.target.alt;

  openPopup(imagePopup);
}