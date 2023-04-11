const escape = 'Escape'
const popupButtonExit = 'popup__button-exit'

export default class Popup {
  constructor(popup) {
    this._popup = popup
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  // закрывает попап по клавише Escape
  _handleEscClose(event) {
    if (event.key === escape) {
      this.close()
    }
  }

  // закрывает попап по крестику или клике на overlay
  _hadleButtonOrOverlayClose(event) {
    if (event.target === event.currentTarget || event.target.className === popupButtonExit) {
      this.close()
    }
  }

  _setEventListeners() {
    this._popup.addEventListener('click', this._hadleButtonOrOverlayClose.bind(this))
    //window.addEventListener('keydown', this._handleEscClose)
  }

  open() {
    this._popup.classList.add('popup_opened');
    // this._setEventListeners()
    window.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose)
  }

}