let modal_area = document.querySelector('.modal-area'),
    profile__info_button = document.querySelector('.profile__info-button'), 
    modal__input_name = document.querySelector('.modal__input-name'),
    modal__input_specialty = document.querySelector('.modal__input-specialty'),
    profile__info_title = document.querySelector('.profile__info-title'), 
    profile__info_subtitle = document.querySelector('.profile__info-subtitle');

profile__info_button.addEventListener('click', function() {

  modal_area.classList.add('modal_opened');

  modal__input_name.value = profile__info_title.textContent;
  modal__input_specialty.value = profile__info_subtitle.textContent;
});


modal_area.addEventListener('mousedown', function() {

  if (event.target.closest('.modal__button-close') || !event.target.closest('.modal')) {

    modal_area.classList.remove('modal_opened');
  }
});

document.addEventListener('keydown', function(e) {

  if (e.which === 27) {

    modal_area.classList.remove('modal_opened');
  }
});

let modal__form = document.querySelector('.modal__form');
let modal__button = document.querySelector('.modal__button');


function handleFormSubmit (e) {
  e.preventDefault();

  profile__info_title.textContent = modal__input_name.value;
  profile__info_subtitle.textContent = modal__input_specialty.value;

  modal_area.classList.remove('modal_opened');
}

modal__form.addEventListener('submit', handleFormSubmit);