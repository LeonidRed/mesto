import { initialCards, formConfig } from './constants.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'

// Выбираем все попапы
const popups = document.querySelectorAll('.popup')
// Выбираем кнопки
const popupProfileOpenButton = document.querySelector('.profile__button-edit')
const popupAddCardOpenButton = document.querySelector('.profile__button-add')
const popupAddCardSaveButton = document.querySelector('.popup__button-create')

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

// Выбираем шаблон и контейнер для вставки шаблона element-template
const elementsContainer = document.querySelector('.elements')

// для проверки нажатой клавиши Escape
const escape = 'Escape'

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
  const popupButtonExit = 'popup__button-exit'
  if (event.target === event.currentTarget || event.target.className === popupButtonExit) {
    closePopup(event.currentTarget)
  }
}

// Функция закрывает попап по нажатию на Escape
function closePopupOnEsc(event) {
  if (event.key === escape) {
    checkActivePopup()
  }
}

// Функция находит попап, который сейчас открыт
function checkActivePopup() {
  const activePopup = document.querySelector('.popup_opened')
  closePopup(activePopup)
}


//Функция на кнопку сохранение профиля
function savePopupProfileInput(event) {
  event.preventDefault()
  profileInfoName.textContent = popupProfileInputName.value
  profileInfoProf.textContent = popupProfileInputProf.value
  closePopup(popupProfile)
}

// --------------- element-template (functions) --------------------

// Функция возвращает экземпляр класса Card
function instanceClassCard(name, link, elementTemplate) {
  return new Card(name, link, elementTemplate)
}

// Функция отрисовывает каждую карточку из массива
function renderElement(arr) {
  arr.forEach((item) => {
    // Создадим экземпляр карточки
    const cardElement = instanceClassCard(item.name, item.link, '#element-template').createCard()

    // Добавляем в DOM
    elementsContainer.prepend(cardElement)
  })
}

// Функция на добавление новой карточки
function addNewCard(event) {
  event.preventDefault()

  const link = popupAddCardInputLink.value
  const title = popupAddCardInputTitle.value

  const cardElement = instanceClassCard(title, link, '#element-template').createCard()
  elementsContainer.prepend(cardElement)

  closePopup(popupAddCard)
  popupAddCardForm.reset()
}

// --------------- element-template end (functions) --------------------


// Обработчик на все попапы
popups.forEach(popup => popup.addEventListener('click', closePopupOnButtonOrOverlay))

// Обработчик на кнопку открытия редактирования профиля
popupProfileOpenButton.addEventListener('click', function () {
  openPopup(popupProfile)
  popupProfileInputName.value = profileInfoName.textContent
  popupProfileInputProf.value = profileInfoProf.textContent
  formProfileValidation.hideInputError(popupProfile, popupProfileInputName, formConfig)
  formProfileValidation.hideInputError(popupProfile, popupProfileInputProf, formConfig)
  formProfileValidation.enableValidation(formConfig) // проверяем input на заполненность
})

// Обработчик на кнопку сохранения профиля
popupProfileForm.addEventListener('submit', savePopupProfileInput)

// Обработчик на кнопку добавления новой карточки
popupAddCardOpenButton.addEventListener('click', function () {
  openPopup(popupAddCard)
  formNewCardValidation.enableValidation(formConfig) // проверяем input на заполненность
})

// обработчик на добавление новой карточки
popupAddCardForm.addEventListener('submit', addNewCard)

// --------------------------------------------------------------------

// создаем экземпляр класса 
const formProfileValidation = new FormValidator(formConfig, '.popup__form-profile')
formProfileValidation.enableValidation(formConfig)

const formNewCardValidation = new FormValidator(formConfig, '.popup__form_add')
formNewCardValidation.enableValidation(formConfig)

// ---------------------------------------------------------------------

// запускаем отрисовку карточек их массива
renderElement(initialCards)