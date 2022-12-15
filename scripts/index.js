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

  let galleryCardClone = galleryTemplate.querySelector('.gallery__card').cloneNode(true);

  galleryCardClone.querySelector('.gallery__img').src = initialCards[i].link;
  galleryCardClone.querySelector('.gallery__img').alt = initialCards[i].name;

  galleryCardClone.querySelector('.gallery__title').textContent = initialCards[i].name;
  
  gallery.prepend(galleryCardClone);
}

//Функция с прослушивателем для карт
function cardListener(e) {

  e.addEventListener('click', function(e) {

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
}

let galleryCards = document.querySelectorAll('.gallery__card');

galleryCards.forEach(function(e) {//Добавление прослушивателей к первым 6 карточкам из массива

  cardListener(e)
});

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

//Функция для сборки карточки из данных от пользователя
function collectCard() {

  const galleryCardClone = galleryTemplate.querySelector('.gallery__card').cloneNode(true);

  galleryCardClone.querySelector('.gallery__img').src = popupInputTypeLink.value;
  galleryCardClone.querySelector('.gallery__img').alt = popupInputTypeCardName.value;

  galleryCardClone.querySelector('.gallery__title').textContent = popupInputTypeCardName.value;
  
  return galleryCardClone;
}

//Функция для вывода новой карточки на страницу
function createCard() {

  gallery.prepend(collectCard());

  galleryCards = document.querySelectorAll('.gallery__card');

  cardListener(galleryCards[0]);
}

//Функция для изменения имени и специальности в профиле
function handleFormInfo (e) {

  profileInfoTitle.textContent = popupInputTypeName.value;
  profileInfoSubtitle.textContent = popupInputTypeSpecialty.value;

  closePopup(e.closest('.popup'));
}

//Функция для обработки данных от формы для создания карт
function handleFormCard (e) {

  createCard();

  closePopup(e.closest('.popup'));

  e.reset();
}

function deleteCard(e) {

  const galleryTrashButtons = document.querySelectorAll('.gallery__trash-button');

  e.target.closest('.gallery__card').remove();
}

function likeCard(e) {

  e.target.classList.toggle('gallery__like-button_type_active');
}

function fillPopup(e) {

  imagePopup.querySelector('.image-popup__img').src = e.target.src; 
  imagePopup.querySelector('.image-popup__img').alt = e.target.alt; 

  imagePopup.querySelector('.image-popup__title').textContent = e.target.alt;

  openPopup(imagePopup);
}