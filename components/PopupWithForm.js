import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor(submitForm, popup) {
    super(popup)
    this._submitForm = submitForm
    this._popupForm = this._popup.querySelector('.popup__form')
    this._popupFormInputs = this._popup.querySelectorAll('.popup__input')
    this._submitButton = this._popup.querySelector('.popup__button-save')
    this._btnIscription = this._submitButton.textContent
  }

  // собирает данные всех полей формы
  _getInputValues() {
    this._values = {}
    this._popupFormInputs.forEach(item => {
      this._values[item.name] = item.value
    })
    return this._values
  }

  //добавляет обработчик клика иконке закрытия и обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault()
      this._submitForm(this._getInputValues())
      this.close()
    })
  }

  close() {
    super.close()
    this._popupForm.reset()
  }

  setButtonState(isLoading, text) {
    if (isLoading) {
      this._submitButton.textContent = text
    } else {
      this._submitButton.textContent = this._btnIscription
    }
  }

} 