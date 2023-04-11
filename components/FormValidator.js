export default class FormValidator {
    constructor(formConfig, elementForm) {
        this._formConfig = formConfig
        this._inputSelector = formConfig.inputSelector
        this._submitButtonSelector = formConfig.submitButtonSelector
        this._inactiveButtonClass = formConfig.inactiveButtonClass
        this._inputErrorClass = formConfig.inputErrorClass
        this._errorClass = formConfig.errorClass
        this._elementForm = elementForm
        this._form = document.querySelector(this._elementForm)
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector)); //находим все поля внутри формы
        this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    }

    // Метод добавляет обработчики всем input формы
    _setEventListeners() {

        this._toggleButtonState();  // для сброса состояния кнопки, если input заполнены

        this._inputList.forEach((formInput) => {
            formInput.addEventListener('input', () => {
                this._isValid(formInput)
                this._toggleButtonState()
            });
        });
    };

    // Метод проверяет валидность поля
    _isValid(formInput) {
        if (!formInput.validity.valid) {
            // Если поле не проходит валидацию, покажем ошибку
            this._showInputError(formInput)
        } else {
            // Если проходит, скроем
            this._hideInputError(formInput)
        }
    };

    // Метод управляет состоянием кнопки
    _toggleButtonState() {
        if (this._hasInvalidInput()) { // Если есть хотя бы один невалидный инпут
            // сделай кнопку неактивной
            this._buttonElement.setAttribute('disabled', 'disabled')
            this._buttonElement.classList.add(this._inactiveButtonClass)
        } else {
            // иначе сделай кнопку активной
            this._buttonElement.removeAttribute('disabled')
            this._buttonElement.classList.remove(this._inactiveButtonClass)
        }
    };

    // Метод проверяет наличие невалидного input
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            // Если поле не валидно, колбэк вернёт true
            // Обход массива прекратится и вся функция
            // hasInvalidInput вернёт true
            return !inputElement.validity.valid
        })
    };

    // Метод добавляет класс с ошибкой
    _showInputError(formInput) {
        const errorElement = this._form.querySelector(`.${formInput.id}-error`)
        formInput.classList.add(this._inputErrorClass)
        errorElement.classList.add(this._errorClass) // Показываем span-сообщение об ошибке
        errorElement.textContent = formInput.validationMessage // Заменим содержимое span с ошибкой на текст ошибки по умолчанию
    };

    // Метод удаляет класс с ошибкой, метод не приватный для сброса ошибок при повторном открытии окна
    _hideInputError(formInput) {
        const errorElement = this._form.querySelector(`.${formInput.id}-error`)
        formInput.classList.remove(this._inputErrorClass)
        errorElement.classList.remove(this._errorClass)
        errorElement.textContent = ''
    }

      // Метод для очистки ошибок и управления кнопкой
      resetValidation() {
        this._toggleButtonState()
  
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement)
        })
      }

    // Метод добавляет слушатель всем формам
    enableValidation() {
        this._setEventListeners()
    }
}