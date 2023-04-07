import { initialCards, formConfig } from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import Popup from '../components/Popup.js'
import PopupWithForm from '../components/PopupWithForm.js'


// Выбираем кнопки
const popupProfileOpenButton = document.querySelector('.profile__button-edit')
const popupAddCardOpenButton = document.querySelector('.profile__button-add')

// Выбираем модальные окна и input в них
const popupProfile = document.querySelector('.popup-profile')
const popupAddCard = document.querySelector('.popup-add')
export const popupImg = document.querySelector('.popup-image')
//popup-edit
const popupProfileInputName = document.querySelector('#input-name')
const popupProfileInputProf = document.querySelector('#input-prof')

//popup-image
export const popupFigureImage = document.querySelector('.popup__figure-image')
export const popupFigureCaption = document.querySelector('.popup__figure-caption')

// Выбираем поля из секции profile
const profileInfoName = document.querySelector('.profile__info-name')
const profileInfoProf = document.querySelector('.profile__info-profession')

export function openPopup(popup) {
  return new Popup(popup).open()
}

// function closePopup(popup) {
//   return new Popup(popup).close()
// }

//Экземпляр класса PopupWithForm для Profile
const popupWithProfileForm = new PopupWithForm(savePopupProfileInput, popupProfile)
popupWithProfileForm.setEventListeners()

//Экземпляр класса PopupWithForm для AddNewCard
const popupWithAddCardForm = new PopupWithForm(addNewCard, popupAddCard)
popupWithAddCardForm.setEventListeners()

//Функция на кнопку сохранение профиля
function savePopupProfileInput(values) {
  profileInfoName.textContent = values.name
  profileInfoProf.textContent = values.prof
}

// Функция на создание и добавление новой карточки
function addNewCard(values) {

  const link = values.link
  const name = values.title

  const renderNewCard = new Section({
    data: [{ name, link }],
    renderer: (item) => {
      const card = instanceClassCard(item.name, item.link, '#element-template')

      const cardElement = card.createCard();

      renderNewCard.addItem(cardElement)
    }
  },
    '.elements')

  renderNewCard.renderItems()
}


// Функция возвращает экземпляр класса Card
function instanceClassCard(name, link, elementTemplate) {
  return new Card(name, link, elementTemplate)
}

// --------------- element-template (functions) --------------------

// Экземпляр отрисовывает каждую карточку из массива
const renderCardsFromArr = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = instanceClassCard(item.name, item.link, '#element-template')

    const cardElement = card.createCard();

    renderCardsFromArr.addItem(cardElement)
  }
},
  '.elements')


// --------------- element-template end (functions) --------------------


// Обработчик на кнопку открытия редактирования профиля
popupProfileOpenButton.addEventListener('click', function () {
  popupProfileInputName.value = profileInfoName.textContent
  popupProfileInputProf.value = profileInfoProf.textContent
  formProfileValidation.hideInputError(popupProfile, popupProfileInputName, formConfig)
  formProfileValidation.hideInputError(popupProfile, popupProfileInputProf, formConfig)
  formProfileValidation.enableValidation(formConfig) // проверяем input на заполненность
  openPopup(popupProfile)
})

// Обработчик на кнопку добавления новой карточки
popupAddCardOpenButton.addEventListener('click', function () {
  formNewCardValidation.enableValidation(formConfig) // проверяем input на заполненность
  openPopup(popupAddCard)
})


// --------------------------------------------------------------------

// создаем экземпляр класса FormValidator
const formProfileValidation = new FormValidator(formConfig, '.popup__form-profile')
formProfileValidation.enableValidation(formConfig)

const formNewCardValidation = new FormValidator(formConfig, '.popup__form_add')
formNewCardValidation.enableValidation(formConfig)

// ---------------------------------------------------------------------

// запускаем отрисовку карточек их массива
renderCardsFromArr.renderItems()