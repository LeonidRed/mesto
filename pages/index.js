import './index.css'

import { formConfig } from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js'
import Api from '../components/Api.js'
import PopupWithDeleteSubmit from '../components/PopupWithDeleteSubmit'


// Выбираем кнопки
const popupProfileOpenButton = document.querySelector('.profile__button-edit')
const popupAddCardOpenButton = document.querySelector('.profile__button-add')
const popupChangeAvatarButton = document.querySelector('.profile__avatar')

// Выбираем попапы
const popupProfile = document.querySelector('.popup-profile')
const popupAddCard = document.querySelector('.popup-add')
export const popupImg = document.querySelector('.popup-image')
const popupDelete = document.querySelector('.popup-delete')
const popupAvatar = document.querySelector('.popup-avatar')

// Inputs из popup profile-profile
const popupProfileInputName = document.querySelector('#input-name')
const popupProfileInputProf = document.querySelector('#input-prof')

// Элементы из popup-image
export const popupFigureImage = document.querySelector('.popup__figure-image')
export const popupFigureCaption = document.querySelector('.popup__figure-caption')

// Выбираем поля из секции profile
const profileInfoName = document.querySelector('.profile__info-name')
const profileInfoProf = document.querySelector('.profile__info-profession')
const profileAvatar = document.querySelector('.profile__avatar-image')

let userId = null

// Экземпляр класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63/',
  headers: {
    authorization: '7895de42-b3c1-48b3-b57e-768d9fcc51ad',
    'Content-Type': 'application/json'
  }
});

//GET userInfo, GET cards
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user.name, user.about)
    userInfo.setUserAvatar(user.avatar)
    userId = user._id
    renderCard.renderItems(cards)
  })
  .catch((err) => {
    console.log(err)
  })

// Экземляр класса UserInfo
const userInfo = new UserInfo(profileInfoName, profileInfoProf, profileAvatar)

// Экземпляр класса PopupWithForm для popupProfile
const popupWithProfileForm = new PopupWithForm(savePopupProfileInput, popupProfile)
popupWithProfileForm.setEventListeners()

// Экземпляр класса PopupWithForm для popupAddCard
const popupWithAddCardForm = new PopupWithForm(addNewCard, popupAddCard)
popupWithAddCardForm.setEventListeners()

// Экземпляр класса PopupWithForm для popupAvatar
const popupWithChangeAvatarForm = new PopupWithForm(changeAvatar, popupAvatar)
popupWithChangeAvatarForm.setEventListeners()

// Экземпляр класса PopupWithDeleteSubmit для popupDeleteButton
const popupWithDeleteBtn = new PopupWithDeleteSubmit(popupDelete, handleSubmit)
popupWithDeleteBtn.setEventListeners()

// Экземпляр класса PopupWithImage
const popupWithImage = new PopupWithImage(popupImg)
popupWithImage.setEventListeners()

// Экземпляр класса FormValidator для profileForm
const formProfileValidation = new FormValidator(formConfig, '.popup__form-profile')
formProfileValidation.enableValidation()

// Экземпляр класса FormValidator для addCardForm
const formNewCardValidation = new FormValidator(formConfig, '.popup__form_add')
formNewCardValidation.enableValidation()

// Экземпляр класса FormValidator для avatarForm
const formAvatarValidation = new FormValidator(formConfig, '.popup__form_avatar')
formAvatarValidation.enableValidation()

// Экземпляр класса Section на отрисовку каждой карточки
const renderCard = new Section({
  renderer: (item) => {
    renderCard.addItem(createCard(item))
  }
},
  '.elements'
)

// Функция создает экземпляр класса Card для создания карточки
function createCard(data) {
  const card = new Card({
    data: data,
    userId: userId
  },
    '#element-template',
    handleOnCardClick,
    {
      handleDeleteBtnClick: () => {
        popupWithDeleteBtn.open(card)
      },
      handleLike: () => {
        api.addLike(data._id)
          .then(value => card.setLikesCount(value))
        card.like()
      },
      handleDislike: () => {
        api.removeLike(data._id)
          .then(value => card.setLikesCount(value))
        card.dislike()
      }
    }
  )
  return card.createCard()
}

// Функция на создание и добавление новой карточки
function addNewCard(values) {
  popupWithAddCardForm.setButtonState(true, 'Создание...')
  api.addCard(values)
    .then((result) => {
      renderCard.addItemPrepend(createCard(result))
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithAddCardForm.setButtonState(false)
    })
}

// Функция на кнопку сохранение профиля
function savePopupProfileInput(values) {
  popupWithProfileForm.setButtonState(true, 'Сохранение...')
  api.editProfile(values)
    .then(data => {
      userInfo.setUserInfo(data.name, data.about)
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupWithProfileForm.setButtonState(false)
    })
}

// Функция на изменение аватара
function changeAvatar() {
  popupWithChangeAvatarForm.setButtonState(true, 'Сохранение...')
  api.changeAvatar(this._values)
    .then((data) => {
      userInfo.setUserAvatar(data.avatar)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithChangeAvatarForm.setButtonState(false)
    })
}

// Функция на попап с увеличенной картинкой
function handleOnCardClick() {
  const name = this._name
  const link = this._link
  popupWithImage.open(name, link)
}

// Функция на удаление карточки
function handleSubmit(card) {
  api.deleteCard(card._cardId)
  card.deleteCard()
  popupWithDeleteBtn.close()
}

// Обработчик на кнопку открытия редактирования профиля
popupProfileOpenButton.addEventListener('click', function () {
  const { name, prof } = userInfo.getUserInfo()
  popupProfileInputName.value = name
  popupProfileInputProf.value = prof
  popupWithProfileForm.open()
  formProfileValidation.resetValidation()
})

// Обработчик на кнопку открытия попапа добавления новой карточки
popupAddCardOpenButton.addEventListener('click', function () {
  popupWithAddCardForm.open()
  formNewCardValidation.resetValidation()
})

// Обработчик на обновление аватара
popupChangeAvatarButton.addEventListener('click', () => {
  popupWithChangeAvatarForm.open()
  formAvatarValidation.resetValidation()
})

