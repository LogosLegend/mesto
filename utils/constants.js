export const body = document.querySelector('.body'),
             gallery = document.querySelector('.gallery'),
             galleryTemplate = document.querySelector('#gallery-template').content,
             popupInputTypeName = document.querySelector('.form-popup__input_type_profile-name'),
             popupInputTypeSpecialty = document.querySelector('.form-popup__input_type_specialty'),
             profileAvatarImage = document.querySelector('.profile__avatar-image'),
             profileInfoTitle = document.querySelector('.profile__info-title'),
             profileInfoSubtitle = document.querySelector('.profile__info-subtitle'),
             profileAvatarButton = document.querySelector('.profile__avatar-button'),
             imagePopup = document.querySelector('.image-popup'),
             editProfilePopup = document.querySelector('.edit-profile-popup'),
             editCardPopup = document.querySelector('.edit-card-popup'),
             editAvatarPopup = document.querySelector('.edit-avatar-popup'),
             profileButtonResponsibleEditInfo = document.querySelector('.profile__button_responsible_edit-info'),
             profileButtonResponsibleAddCard = document.querySelector('.profile__button_responsible_add-card'),
             popupInputTypeCardName = document.querySelector('.form-popup__input_type_card-name'),
             popupInputTypeLink = document.querySelector('.form-popup__input_type_link'),
             editProfileForm = document.forms.editProfileForm,
             editCardForm = document.forms.editCardForm,
             deleteForm = document.forms.deleteForm,
             popupDelete = document.querySelector('.popup-delete'),
             buttonPopupDelete = document.querySelector('.form-popup__button-submit-delete'),
             trashButtons = document.querySelectorAll('.gallery__trash-button'),
             _id = '6e7ae393808bf230213d7e32';

export const param = {
  formSelector: '.form-popup__form',
  inputSelector: '.form-popup__input',
  submitButtonSelector: '.form-popup__button-submit',
  inactiveButtonClass: 'form-popup__button-submit_disable',
  inputErrorClass: 'form-popup__input_type_error',
  errorClass: 'form-popup__error_visible'
};

export const formValidators = {};