let popup = document.querySelector('.popup'),
    profileInfoButton = document.querySelector('.profile__info-button'), 
    popupInputName = document.querySelector('.popup__input_name'),
    popupInputSpecialty = document.querySelector('.popup__input_specialty'),
    profileInfoTitle = document.querySelector('.profile__info-title'), 
    profileInfoSubtitle = document.querySelector('.profile__info-subtitle');

profileInfoButton.addEventListener('click', function() {

  popup.classList.add('popup_opened');

  popupInputName.value = profileInfoTitle.textContent;
  popupInputSpecialty.value = profileInfoSubtitle.textContent;
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

  profileInfoTitle.textContent = popupInputName.value;
  profileInfoSubtitle.textContent = popupInputSpecialty.value;

  popupClose();
}

popupForm.addEventListener('submit', handleFormSubmit);