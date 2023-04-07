import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._image = this._popup.querySelector('.popup__figure-image')
    this._imageCaption = this._popup.querySelector('.popup__figure-caption')
  }

  open(name, link) {
    this._image.src = link
    this._image.alt = `${name}`
    this._imageCaption.textContent = name
    super.open()
  }

}