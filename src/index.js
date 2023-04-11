import '../pages/index.css';

import { initialCards, formConfig } from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js'

// Выбираем кнопки
const popupProfileOpenButton = document.querySelector('.profile__button-edit')
const popupAddCardOpenButton = document.querySelector('.profile__button-add')

// Выбираем модальные окна и input в них
const popupProfile = document.querySelector('.popup-profile')
const popupAddCard = document.querySelector('.popup-add')
export const popupImg = document.querySelector('.popup-image')

//popup profile-edit
const popupProfileInputName = document.querySelector('#input-name')
const popupProfileInputProf = document.querySelector('#input-prof')

//popup with image
export const popupFigureImage = document.querySelector('.popup__figure-image')
export const popupFigureCaption = document.querySelector('.popup__figure-caption')

// Выбираем поля из секции profile
const profileInfoName = document.querySelector('.profile__info-name')
const profileInfoProf = document.querySelector('.profile__info-profession')


// Экземляр класса UserInfo
const userInfo = new UserInfo(profileInfoName, profileInfoProf)

// Экземпляр класса PopupWithForm для popupProfile
const popupWithProfileForm = new PopupWithForm(savePopupProfileInput, popupProfile)
popupWithProfileForm.setEventListeners()

// Экземпляр класса PopupWithForm для popupAddCard
const popupWithAddCardForm = new PopupWithForm(addNewCard, popupAddCard)
popupWithAddCardForm.setEventListeners()

// Экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage(popupImg)
popupWithImage.setEventListeners()

// Функция возвращает экземпляр класса Card
function instanceClassCard(name, link, elementTemplate) {
  return new Card(name, link, elementTemplate, handleOnCardClick)
}

// Отрисовка каждой карточки
const renderCard = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = instanceClassCard(item.name, item.link, '#element-template')
    const cardElement = card.createCard() // возвращает элемент (карточку)
    renderCard.addItem(cardElement)
    }
  },
  '.elements'
)

// Функция на создание и добавление новой карточки
function addNewCard(values) {
  const card = instanceClassCard(values.title, values.link, '#element-template')
  const cardElement = card.createCard()
  renderCard.addItem(cardElement)
}

// Функция на попап с увеличенной картинкой
function handleOnCardClick() {
  const name = this._name
  const link = this._link
  popupWithImage.open(name, link)
}

// Функция на кнопку сохранение профиля
function savePopupProfileInput(values) {
  userInfo.setUserInfo(values.name, values.prof)
}

// Обработчик на кнопку открытия редактирования профиля
popupProfileOpenButton.addEventListener('click', function () {
  const { name, prof } = userInfo.getUserInfo()
  popupProfileInputName.value = name
  popupProfileInputProf.value = prof
  popupWithProfileForm.open()
  formProfileValidation.resetValidation()
})

// Обработчик на кнопку добавления новой карточки
popupAddCardOpenButton.addEventListener('click', function () {
  popupWithAddCardForm.open()
  formNewCardValidation.resetValidation()
})

// Экземпляр класса FormValidator для profileForm
const formProfileValidation = new FormValidator(formConfig, '.popup__form-profile')
formProfileValidation.enableValidation()


// Экземпляр класса FormValidator для addCardForm
const formNewCardValidation = new FormValidator(formConfig, '.popup__form_add')
formNewCardValidation.enableValidation()

// запускаем отрисовку карточек их массива
renderCard.renderItems()