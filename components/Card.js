export default class Card {
  constructor({ data, userId }, templateSelector, handleOnCardClick, { handleDeleteBtnClick, handleLike, handleDislike }) {
    this._name = data.name
    this._link = data.link
    this._likes = data.likes
    this._ownerId = data.owner._id
    this._cardId = data._id
    this._userId = userId
    this._templateSelector = templateSelector
    this._handleOnCardClick = handleOnCardClick
    this._handleDeleteBtnClick = handleDeleteBtnClick
    this._handleLike = handleLike
    this._handleDislike = handleDislike
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('element__area-like_active')) {
        this._handleDislike()
      } else {
        this._handleLike()
      }
    })
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteBtnClick(this._cardId) // слушатель на корзину-кнопку
    })
    this._cardImage.addEventListener('click', () => {
      this._handleOnCardClick() // слушатель на клик по картинке карточки
    })
  }

  deleteCard() {
    this._element.remove()
  }

  // Проверка карточки на владельца (для отображения корзины)
  _isOwner() {
    if (this._ownerId === this._userId) {
      this._buttonDelete.style.display = 'block'
    }
  }

  // Проверка на поставленный лайк
  _isLiked() {
    this._likes.forEach((user) => {
      if (user._id === this._userId) {
        this.like()
      } else {
        this.dislike()
      }
    })
  }

  like() {
    this._likeButton.classList.add("element__area-like_active")
  }

  dislike() {
    this._likeButton.classList.remove("element__area-like_active")
  }

  setLikesCount(res) {
    this._likeCounter.textContent = `${res.likes.length}`
  }

  // Метод создает Card
  createCard() {
    // Запишем разметку в приватное поле _element, для доступа к ней других элементов
    this._element = this._getTemplate()
    this._cardImage = this._element.querySelector('.element__picture')
    this._buttonDelete = this._element.querySelector('.element__button-del')
    this._likeButton = this._element.querySelector('.element__area-like')
    this._cardTitle = this._element.querySelector('.element__area-title')
    this._likeCounter = this._element.querySelector('.element__area-like-counter')

    this._setEventListeners() // добавим обработчики

    // Добавим данные
    this._cardTitle.textContent = this._name
    this._likeCounter.textContent = this._likes.length
    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._isOwner()
    this._isLiked()

    return this._element
  }

}