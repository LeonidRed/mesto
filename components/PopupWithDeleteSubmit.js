import Popup from "./Popup.js"

export default class PopupWithDeleteSubmit extends Popup {
  constructor(popup, handleSubmit) {
    super(popup)
    this._handleSubmit = handleSubmit
    this._form = this._popup.querySelector(".popup__form-delete")
  }

  open(card) {
    this._card = card
    super.open()
  }

  setEventListeners() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault()
      this._handleSubmit(this._card)
    })
    super.setEventListeners()
  }
}