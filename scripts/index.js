let popup = document.querySelector('.popup'),
    profileInfoButton = document.querySelector('.profile__info-button'), 
    popupInputTypeName = document.querySelector('.popup__input_type_name'),
    popupInputTypeSpecialty = document.querySelector('.popup__input_type_specialty'),
    profileInfoTitle = document.querySelector('.profile__info-title'), 
    profileInfoSubtitle = document.querySelector('.profile__info-subtitle');

profileInfoButton.addEventListener('click', function() {

  popup.classList.add('popup_opened');

  popupInputTypeName.value = profileInfoTitle.textContent;
  popupInputTypeSpecialty.value = profileInfoSubtitle.textContent;
});

function popupClose () {
  popup.classList.remove('popup_opened');
}

popup.addEventListener('mousedown', function() {

  if (event.target.closest('.popup__button-close') || !event.target.closest('.popup__container')) {

    popupClose();
  }
});

document.addEventListener('keydown', function(e) {

  if (e.which === 27) {

    popupClose();
  }
});

let popupForm = document.querySelector('.popup__form');

function handleFormSubmit (e) {
  e.preventDefault();

  profileInfoTitle.textContent = popupInputTypeName.value;
  profileInfoSubtitle.textContent = popupInputTypeSpecialty.value;

  popupClose();
}

popupForm.addEventListener('submit', handleFormSubmit);