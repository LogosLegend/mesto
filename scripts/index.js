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
      popupInputTypeLink = document.querySelector('.form-popup__input_type_link'),
      editProfileForm = document.forms.editProfileForm,
      editCardForm = document.forms.editCardForm;

//Добавление карт с картинками из массива
for (let i = 0; i < initialCards.length; i++) {

  gallery.prepend(createCard(initialCards[i].link, initialCards[i].name));
}

//Открытие попапов Профиля
function openPopup(popup) {

  popup.classList.add('popup_opened');

  document.addEventListener('keydown', listenerEscButton);

  listenerEscButton.popup = popup;
}

function listenerEscButton(e) {

  if (e.key === 'Escape') {
    closePopup(listenerEscButton.popup);
  }
}

profileButtonResponsibleEditInfo.addEventListener('click', () => {

  popupInputTypeName.value = profileInfoTitle.textContent;
  popupInputTypeSpecialty.value = profileInfoSubtitle.textContent;

  resetValidation(editProfilePopup.querySelector('.form-popup__form'), param);

  openPopup(editProfilePopup);
});

profileButtonResponsibleAddCard.addEventListener('click', () => {

  openPopup(editCardPopup);
});

//Закрытие попапов
function closePopup(popup) {

  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', listenerEscButton);
}

popups.forEach((e) => {

  e.addEventListener('mousedown', () => {
  
    if (event.target.closest('.button-close') || !event.target.closest('[class*="container"]')) closePopup(e);
  });
});

//Обработка форм при нажатии кнопок в попапах Профиля
editProfileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  handleFormInfo(editProfileForm);
  disabledButton(e);
});

editCardForm.addEventListener('submit', (e) => {
  e.preventDefault();
  handleFormCard(editCardForm);
  disabledButton(e);
});

//Функция для создания карточки из данных от пользователя
function createCard(link, name) {

  const galleryCardClone = galleryTemplate.querySelector('.gallery__card').cloneNode(true);

  const galleryImgClone = galleryCardClone.querySelector('.gallery__img'),
        galleryTitleClone = galleryCardClone.querySelector('.gallery__title'),
        galleryTrashButtonClone = galleryCardClone.querySelector('.gallery__trash-button'),
        galleryLikeButtonClone = galleryCardClone.querySelector('.gallery__like-button');

  galleryImgClone.src = link;
  galleryImgClone.alt = name;

  galleryTitleClone.textContent = name;

  galleryTrashButtonClone.addEventListener('click', (e) => {

    deleteCard(e);
  });

  galleryLikeButtonClone.addEventListener('click', (e) => {

    likeCard(e);
  });

  galleryImgClone.addEventListener('click', (e) => {

    fillPopup(e);
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

function disabledButton(e) {

  e.submitter.disabled = true;
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