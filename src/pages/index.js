import './index.css';

import {
        body,
        gallery,
        galleryTemplate,
        popupInputTypeName,
        popupInputTypeSpecialty,
        profileAvatarImage,
        profileInfoTitle,
        profileInfoSubtitle,
        imagePopup,
        editProfilePopup,
        editCardPopup,
        editAvatarPopup,
        profileButtonResponsibleEditInfo,
        profileButtonResponsibleAddCard,
        popupInputTypeCardName,
        popupInputTypeLink,
        profileAvatarButton,
        editProfileForm,
        editCardForm,
        deleteForm,
        param,
        formValidators,
        popupDelete,
        buttonPopupDelete,
        trashButtons

} from '../utils/constants.js';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import DeletePopup from '../components/DeletePopup.js';
import Avatar from '../components/Avatar.js';

const api = new Api('cbc3de56-4380-42ae-a1cd-7e660229af4d'),
      popupWithFormEditProfile = new PopupWithForm(editProfilePopup, editProfileForm, handleFormInfo),
      popupWithFormEditCard = new PopupWithForm(editCardPopup, editCardForm, handleFormCard),
      popupWithFormEditAvatar = new PopupWithForm(editAvatarPopup, editAvatarForm, handleFormAvatar),
      userInfoProfile = new UserInfo(profileInfoTitle, profileInfoSubtitle),
      sectionCreate = new Section(createCard, gallery),
      popupWithImageOpen = new PopupWithImage(imagePopup),
      deleteCardPopup = new DeletePopup(popupDelete, deleteForm, deleteCard),
      avatar = new Avatar(profileAvatarImage);

body.classList.remove('preload');//Включение анимации после загрузки попапов

popupWithFormEditProfile.setEventListeners();
popupWithFormEditCard.setEventListeners();
popupWithFormEditAvatar.setEventListeners();
popupWithImageOpen.setEventListeners();
deleteCardPopup.setEventListeners();

//Получение информации пользователя
function showError(err) {
  console.log('Error: ' + err);
}

api.load()
  .then(({0: {name, about, avatar}, 1: cards}) => {
    profileInfoTitle.textContent = name;
    profileInfoSubtitle.textContent = about;
    profileAvatarImage.src = avatar;
    sectionCreate.renderItems(cards.reverse())
  })
  .catch((err) => showError(err));

function createCard(item) {
  const cardElement = new Card(item, galleryTemplate, '6e7ae393808bf230213d7e32', fillPopup, openDeletePopup, like, unLike).createCard();
  return cardElement;
}

//Функция для изменения имени и специальности в профиле
function handleFormInfo(inputValues, button) {

  api.editProfile(inputValues)
    .then((data) => {
      userInfoProfile.setUserInfo(data);
      popupWithFormEditProfile.close();
    })
    .catch((err) => showError(err))
    .finally(() => {
      button.textContent = 'Сохранить';
    });

  formValidators['editProfileForm'].resetValidation();
}

//Функция для обработки данных от формы для создания карт
function handleFormCard(inputValues, button) {

  api.addCard(inputValues)
  .then((data) => {
    sectionCreate.addItem(data);
    popupWithFormEditCard.close();
  })
  .catch((err) => showError(err))
  .finally(() => {
    button.textContent = 'Создать';
  });

  formValidators['editCardForm'].resetValidation();
}

function handleFormAvatar(inputValues, button) {

  api.updateAvatar(inputValues)
    .then((data) => {
      avatar.updateAvatar(data);
      popupWithFormEditAvatar.close();
    })
    .catch((err) => showError(err))
    .finally(() => {
      button.textContent = 'Сохранить';
    });

  formValidators['editAvatarForm'].resetValidation();
}

profileButtonResponsibleEditInfo.addEventListener('click', () => {

  const [profileInfoTitleText, profileInfoSubtitleText] = userInfoProfile.getUserInfo();

  popupInputTypeName.value = profileInfoTitleText;
  popupInputTypeSpecialty.value = profileInfoSubtitleText;

  formValidators['editProfileForm'].resetValidation();

  popupWithFormEditProfile.open();
});

profileButtonResponsibleAddCard.addEventListener('click', () => {

  formValidators['editCardForm'].resetValidation();

  popupWithFormEditCard.open();
});

profileAvatarButton.addEventListener('click', () => {

  formValidators['editAvatarForm'].resetValidation();

  popupWithFormEditAvatar.open();
});

//Открытие попапа картинки
function fillPopup(data) {

  popupWithImageOpen.open(data);
}

//Удаление карт
function openDeletePopup(id, e) {

  deleteCardPopup.open(id, e);
}

function deleteCard(id, e, button) {
  
  api.deleteCard(id)
    .then((data) => {
      e.remove();
      deleteCardPopup.close();
    })
    .catch((err) => showError(err))
    .finally(() => {
      button.textContent = 'Да';
    });
}

//Like
function like(cardId, likes, evt) {

  api.likeCard(cardId)
  .then((data) => {likes.textContent = data.likes.length;
                   evt.classList.add('gallery__like-button_type_active')})
  .catch((err) => showError(err));
}

function unLike(cardId, likes, evt) {

  api.unLikeCard(cardId)
  .then((data) => {likes.textContent = data.likes.length;
                   evt.classList.remove('gallery__like-button_type_active')})
  .catch((err) => showError(err));
}

//Включение валидации
function enableValidation(param) {

  const formList = Array.from(document.querySelectorAll(param.formSelector));

  formList.forEach((form) => {

    const validator = new FormValidator(form, param);
    const formName = form.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(param);