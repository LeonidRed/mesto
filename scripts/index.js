import Card from './Card.js'
import FormValidator from './FormValidator.js'

// массив для elements
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

// Выбираем все попапы
const popup = document.querySelectorAll('.popup')
// Выбираем кнопки
const popupProfileOpenButton = document.querySelector('.profile__button-edit')
const popupCloseButton = document.querySelectorAll('.popup__button-exit')
const popupAddCardOpenButton = document.querySelector('.profile__button-add')
const popupAddCardSaveButton = document.querySelector('.popup__button-create')
const cardDeleteButton = document.querySelector('.element__button-del')

// Выбираем модальные окна и input в них
const popupProfile = document.querySelector('.popup-profile')
const popupProfileForm = document.querySelector('.popup__form-profile')
const popupAddCard = document.querySelector('.popup-add')
const popupAddCardForm = document.querySelector('.popup__form_add')
export const popupImg = document.querySelector('.popup-image')
//popup-edit
const popupProfileInputName = document.querySelector('#input-name')
const popupProfileInputProf = document.querySelector('#input-prof')
//popup-add
const popupAddCardInputTitle = document.querySelector('#input-title')
const popupAddCardInputLink = document.querySelector('#input-link')
//popup-image
export const popupFigureImage = document.querySelector('.popup__figure-image')
export const popupFigureCaption = document.querySelector('.popup__figure-caption')

// Выбираем поля из секции profile
const profileInfoName = document.querySelector('.profile__info-name')
const profileInfoProf = document.querySelector('.profile__info-profession')

// Для открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', closePopupOnEsc)  // слушатель на Escape
}

// Для закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closePopupOnEsc)  // убираем слушатель на Escape
}

// Функция закрывает попап по клику на кнопку-крестик или overlay
function closePopupOnButtonOrOverlay(event) {
  if (event.target === event.currentTarget || event.target.className === 'popup__button-exit') {
    closePopup(event.currentTarget)
  }
}

// Функция находит попап, который сейчас открыт
function checkActivePopup() {
  const activePopup = document.querySelector('.popup_opened')
  closePopup(activePopup)
}

// Функция закрывает попап по нажатию на Escape
function closePopupOnEsc(event) {
  if (event.key === 'Escape') {
    checkActivePopup()
  }
}

// Обработчик на все попапы
for (let i = 0; i < popup.length; ++i) {
  popup[i].addEventListener('click', closePopupOnButtonOrOverlay)
}

// Обработчик на кнопку редактирования профиля
popupProfileOpenButton.addEventListener('click', function () {
  openPopup(popupProfile)
  popupProfileInputName.value = profileInfoName.textContent
  popupProfileInputProf.value = profileInfoProf.textContent
  formProfileValidation.hideInputError(popupProfile, popupProfileInputName, formConfig)
  formProfileValidation.hideInputError(popupProfile, popupProfileInputProf, formConfig)
  formProfileValidation.enableValidation(formConfig)
})

// Обработчик на кнопку добавления новой карточки
popupAddCardOpenButton.addEventListener('click', function () {
  openPopup(popupAddCard)
  popupAddCardSaveButton.setAttribute('disabled', 'disabled')
  popupAddCardSaveButton.classList.add('popup__button-save_inactive')
})

//Функция и обработчик на кнопку сохранение профиля
function savePopupProfileInput(event) {
  event.preventDefault()
  if (popupProfileInputName.value && popupProfileInputProf.value) {
    profileInfoName.textContent = popupProfileInputName.value
    profileInfoProf.textContent = popupProfileInputProf.value
    closePopup(popupProfile)
  }
}

popupProfileForm.addEventListener('submit', savePopupProfileInput)

// --------------- element-template --------------------

// Выбираем шаблон и контейнер для вставки шаблона
//const elementTemplate = document.querySelector('#element-template').content.querySelector('.element')
const elementsContainer = document.querySelector('.elements')

// Функция отрисовывает каждую карточку из массива
function renderElement(arr) {
  arr.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item.name, item.link, '#element-template')
    // Создаём карточку и возвращаем наружу
    const cardElement = card.createCard()

    // Добавляем в DOM
    elementsContainer.prepend(cardElement)
  })
}

renderElement(initialCards)

// Функция и обработчик на добавление новой карточки
function addNewCard(event) {
  event.preventDefault()

  const link = popupAddCardInputLink.value
  const title = popupAddCardInputTitle.value

  const card = new Card(title, link, '#element-template')
  const cardElement = card.createCard()
  elementsContainer.prepend(cardElement)

  closePopup(popupAddCard)
  popupAddCardInputLink.value = ''
  popupAddCardInputTitle.value = ''
}

popupAddCardForm.addEventListener('submit', addNewCard)

// --------------- element-template end --------------------

const formProfileValidation = new FormValidator(formConfig, '.popup__form-profile')
formProfileValidation.enableValidation(formConfig)

const formNewCardValidation = new FormValidator(formConfig, '.popup__form_add')
formNewCardValidation.enableValidation(formConfig)