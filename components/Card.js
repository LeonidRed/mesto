import { popupImg, popupFigureCaption, popupFigureImage, openPopup } from "../scripts/index.js"
import PopupWithImage from "./PopupWithImage.js"

export default class Card {
  constructor(name, link, templateSelector) {
    this._name = name
    this._link = link
    this._templateSelector = templateSelector
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)
  }

  _setEventListeners() {
    this._element.querySelector('.element__area-like').addEventListener('click', () => {
      this._handleLikeBtnClick() // слушатель на like-кнопку
    })
    this._element.querySelector('.element__button-del').addEventListener('click', () => {
      this._handleDeleteBtnClick() // слушатель на корзину-кнопку
    })
    this._element.querySelector('.element__picture').addEventListener('click', () => {
      this._handleOnCardClick() // слушатель на клик по картинке карточки
    })
  }

  // обработчик на like-кнопку
  _handleLikeBtnClick() {
    this._element.querySelector('.element__area-like').classList.toggle('element__area-like_active')
  }

  // обработчик на корзину-кнопку
  _handleDeleteBtnClick() {
    this._element.remove()
  }

  // обработчик на попап с увеличенной картинкой
  _handleOnCardClick() {
    const img = new PopupWithImage(popupImg)
    const name = this._name
    const link = this._link
    img.open(name, link)
  }


  // Метод создает Card
  createCard() {
    // Запишем разметку в приватное поле _element, для доступа к ней других элементов
    this._element = this._getTemplate()

    this._setEventListeners(); // добавим обработчики

    // Добавим данные
    this._element.querySelector('.element__area-title').textContent = this._name
    this._element.querySelector('.element__picture').src = this._link
    this._element.querySelector('.element__picture').alt = this._name

    return this._element
  }

}