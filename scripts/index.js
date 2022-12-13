const body = document.querySelector('.body');
const gallery = document.querySelector('.gallery');

//Создание попапов в Профиле из массива
const popupsArr = [
  {
    title: 'Редактировать профиль',
    formName: 'editProfileForm',
    popupInput1: {
      class: 'form-popup__input_type_profile-name',
      name: 'fullName',
      placeholder: 'Имя'
    },

    popupInput2: {
      class: 'form-popup__input_type_specialty',
      name: 'specialty',
      placeholder: 'О себе'
    },

    buttonSubmit: 'Сохранить'
  },

  {
    title: 'Новое место',
    formName: 'editCardForm',
    popupInput1: {
      class: 'form-popup__input_type_card-name',
      name: 'cardName',
      placeholder: 'Название'
    },

    popupInput2: {
      class: 'form-popup__input_type_link',
      name: 'link',
      placeholder: 'Ссылка на картинку'
    },

    buttonSubmit: 'Создать'
  }
];

addPopup();

function addPopup() {

  for (let i = 0; i < popupsArr.length; i++) {

    const popupTemplate = document.querySelector('#form-popup-template').content;
    const formPopupClone = popupTemplate.querySelector('.form-popup').cloneNode(true);

    formPopupClone.querySelector('.form-popup__title').textContent = popupsArr[i].title;
    formPopupClone.querySelector('.form-popup__form').name = popupsArr[i].formName;

    formPopupClone.querySelectorAll('.form-popup__input')[0].classList.add(popupsArr[i].popupInput1.class);
    formPopupClone.querySelectorAll('.form-popup__input')[0].name = popupsArr[i].popupInput1.name;
    formPopupClone.querySelectorAll('.form-popup__input')[0].placeholder = popupsArr[i].popupInput1.placeholder;

    formPopupClone.querySelectorAll('.form-popup__input')[1].classList.add(popupsArr[i].popupInput2.class);
    formPopupClone.querySelectorAll('.form-popup__input')[1].name = popupsArr[i].popupInput2.name;
    formPopupClone.querySelectorAll('.form-popup__input')[1].placeholder = popupsArr[i].popupInput2.placeholder;

    formPopupClone.querySelector('.form-popup__button-submit').textContent = popupsArr[i].buttonSubmit;

    body.append(formPopupClone);
  }
}

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
//Закрытие попапов в Профиле
popups.forEach(function(e) {

  e.addEventListener('mousedown', function() {
  
    if (event.target.closest('.button-close') || !event.target.closest('.form-popup__container')) closePopup(e);
  });

  document.addEventListener('keydown', function(k) {

    if (k.which === 27 && e.classList.contains('popup_opened')) closePopup(e);//Закрытие Попапов в профиле через кнопку

    if (k.which === 27 && document.querySelector('.image-popup')) closeImagePopup();//Закрытие Попапов картинки через кнопку
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

      openImagePopup(e);//Создание попапа картинки
  }
});

function DeleteCard(e) {

  const galleryTrashButtons = document.querySelectorAll('.gallery__trash-button');
      indexCardToDelete = Array.prototype.indexOf.call(galleryTrashButtons, e.target);

  e.target.closest('.gallery__card').remove();

  const indexReverse = galleryTrashButtons.length - 1 - indexCardToDelete;//После удаления карточки, удаляется соответствующая запись из массива карт
                                                                       //Так как карточки выводятся вначало, а в массив данные поступают в конец,
                                                                       //то для поиска необходимых записей в массиве индексы нужно "перевернуть".
                                                                       //Если серверная часть будет хранить массивы, то в будущем не придётся делать
                                                                       //функционал для удаления записей из массива.

  initialCards.splice(indexReverse, 1);
}

function LikeCard(e) {

  e.target.classList.toggle('gallery__like-button_type_active');
}

function openImagePopup(e) {//Попап создаётся когда на картинку нажимают и удаляется после срабатывания событий на закрытие.
                            //Это сделанно для того, чтобы при большой количестве картинок не создавалось такое же огромное
                            //количество попапов для них.

  if (document.querySelector('.image-popup') !== null) document.querySelector('.image-popup').remove();
  //Проверка на существование уже созданого попапа картинки
  //Проверка нужна для того, чтобы при многочисленных открытиях и закрытиях попапа в функции closeImagePopup не оставался скрытый попап
  //и в дальнейшем не нарушал работу кода.
  
  const imagePopupTemplate = document.querySelector('#image-popup-template').content;
  const imagePopupClone = imagePopupTemplate.querySelector('.image-popup').cloneNode(true);
  
  imagePopupClone.querySelector('.image-popup__img').src = e.target.src;
  imagePopupClone.querySelector('.image-popup__img').alt = e.target.alt;
  
  imagePopupClone.querySelector('.image-popup__title').textContent = e.target.alt;
  
  body.append(imagePopupClone);

  const imagePopup = document.querySelector('.image-popup');

  imagePopup.addEventListener('click', function(e) {//Условия закрытия попапа такие же, как у попапов в Профиле

   if (e.target.classList.contains('button-close') || !event.target.closest('.image-popup__container')) closeImagePopup();
  });

  setTimeout(() => imagePopup.classList.add('popup_opened'));
  //Для работы анимации при создающихся из-за кликов пользователя блоков, класс добавляется через setTimeout.
  //Это заставляет браузер форсированно применить изменения, иначе анимация бы не проигрывалась из-за единовременном выполнении браузером нескольких действий.
}

function closeImagePopup() {

  const imagePopup = document.querySelector('.image-popup');

  imagePopup.classList.remove('popup_opened');

  setTimeout(() => imagePopup.remove(), 300);
  //Анимация в css имеет задержку 300 мс, чтобы анимация успела полностью проиграться блок удаляется спустя 300 мс.
  //Если пользователь будет многократно открывать и закрывать попап, то он останется на странице, чтобы этого не допустить нужна проверка на невидимый попап
  //вначале функции openImagePopup
  //P.S. Добавление карточкам класса с "pointer-events: none" не решает эту проблему.
}