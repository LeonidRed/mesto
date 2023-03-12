export default class FormValidator {
    constructor(formConfig, elementForm) {
        this._formConfig = formConfig
        this._inputSelector = formConfig.inputSelector
        this._submitButtonSelector = formConfig.submitButtonSelector
        this._inactiveButtonClass = formConfig.inactiveButtonClass
        this._inputErrorClass = formConfig.inputErrorClass
        this._errorClass = formConfig.errorClass
        this._elementForm = elementForm
    }

    // Функция добавляет обработчики всем input формы
    _setEventListeners(form, { inputSelector, submitButtonSelector }) {
        const inputList = Array.from(form.querySelectorAll(inputSelector)); //находим все поля внутри формы
        const buttonElement = form.querySelector(submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement, this._formConfig);  // для сброса состояния кнопки, если input заполнены

        inputList.forEach((formInput) => {
            formInput.addEventListener('input', () => {
                this._isValid(form, formInput)
                this._toggleButtonState(inputList, buttonElement, this._formConfig);  //
            });
        });
    };

    // Функция проверяет валидность поля
    _isValid(form, formInput) {
        if (!formInput.validity.valid) {
            // Если поле не проходит валидацию, покажем ошибку
            this._showInputError(form, formInput, formInput.validationMessage, this._formConfig);
        } else {
            // Если проходит, скроем
            this.hideInputError(form, formInput, this._formConfig);
        }
    };

    // Функция управляет состоянием кнопки
    _toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
        if (this._hasInvalidInput(inputList)) { // Если есть хотя бы один невалидный инпут
            // сделай кнопку неактивной
            buttonElement.setAttribute('disabled', 'disabled')
            buttonElement.classList.add(inactiveButtonClass);
        } else {
            // иначе сделай кнопку активной
            buttonElement.removeAttribute('disabled')
            buttonElement.classList.remove(inactiveButtonClass);
        }
    };

    // Функция проверяет наличие невалидного input
    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            // Если поле не валидно, колбэк вернёт true
            // Обход массива прекратится и вся функция
            // hasInvalidInput вернёт true
            return !inputElement.validity.valid;
        })
    };

    // Функция добавляет класс с ошибкой
    _showInputError(form, formInput, errorMessage, { inputErrorClass, errorClass }) {
        const errorElement = form.querySelector(`.${formInput.id}-error`);
        formInput.classList.add(inputErrorClass);
        errorElement.classList.add(errorClass); // Показываем span-сообщение об ошибке
        errorElement.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
    };

    // Функция удаляет класс с ошибкой, метод не приватный для сброса ошибок при повторном открытии окна
    hideInputError(form, formInput, { inputErrorClass, errorClass }) {
        const errorElement = form.querySelector(`.${formInput.id}-error`);
        formInput.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
    };


    // Метод добавляет слушатель всем формам
    enableValidation(formConfig) {
        const form = document.querySelector(this._elementForm)

        this._setEventListeners(form, formConfig)
    }
}