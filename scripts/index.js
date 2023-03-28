import { initialCards, formConfig } from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import Popup from '../components/Popup.js'

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

export function openPopup(popup) {
  return new Popup(popup).open()
}

function closePopup(popup) {
  return new Popup(popup).close()
}


//Функция на кнопку сохранение профиля
function savePopupProfileInput(event) {
  event.preventDefault()
  profileInfoName.textContent = popupProfileInputName.value
  profileInfoProf.textContent = popupProfileInputProf.value
  closePopup(popupProfile)
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

// Функция на создание и добавление новой карточки
function addNewCard(event) {
  event.preventDefault()

  const link = popupAddCardInputLink.value
  const name = popupAddCardInputTitle.value

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
  popupAddCardForm.reset()
  closePopup(popupAddCard)
}

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

// Обработчик на кнопку сохранения профиля
popupProfileForm.addEventListener('submit', savePopupProfileInput)

// Обработчик на кнопку добавления новой карточки
popupAddCardOpenButton.addEventListener('click', function () {
  //openPopup(popupAddCard)
  formNewCardValidation.enableValidation(formConfig) // проверяем input на заполненность
  openPopup(popupAddCard)
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
renderCardsFromArr.renderItems()