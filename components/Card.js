export default class Card {
  constructor(name, link, templateSelector, handleOnCardClick) {
    this._name = name
    this._link = link
    this._templateSelector = templateSelector
    this._handleOnCardClick = handleOnCardClick
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
    this._cardImage.addEventListener('click', () => {
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


  // Метод создает Card
  createCard() {
    // Запишем разметку в приватное поле _element, для доступа к ней других элементов
    this._element = this._getTemplate()
    this._cardImage = this._element.querySelector('.element__picture')

    this._setEventListeners() // добавим обработчики

    // Добавим данные
    this._element.querySelector('.element__area-title').textContent = this._name
    this._cardImage.src = this._link
    this._cardImage.alt = this._name

    return this._element
  }

}