const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

// Функция добавляет слушатель всем формам
const enableValidation = ({ formSelector }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));  //ищем все формы
  formList.forEach((form) => {
    setEventListeners(form, formConfig); //для каждой формы вызовем функцию setEventListeners
  });
};

// Функция добавляет обработчики всем input формы
const setEventListeners = (form, { inputSelector, submitButtonSelector }) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector)); //находим все поля внутри формы
  const buttonElement = form.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, formConfig);  //передадим массив полей и кнопку

  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(form, formInput)
      toggleButtonState(inputList, buttonElement, formConfig);  //
    });
  });
};

// Функция проверяет валидность поля
const isValid = (form, formInput) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(form, formInput, formInput.validationMessage, formConfig);
  } else {
    // Если проходит, скроем
    hideInputError(form, formInput, formConfig);
  }
};

// Функция управляет состоянием кнопки
const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  if (hasInvalidInput(inputList)) { // Если есть хотя бы один невалидный инпут
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
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

// Функция добавляет класс с ошибкой
const showInputError = (form, formInput, errorMessage, {inputErrorClass, errorClass}) => {
  const errorElement = form.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass); // Показываем span-сообщение об ошибке
  errorElement.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
};

// Функция удаляет класс с ошибкой
const hideInputError = (form, formInput, {inputErrorClass, errorClass}) => {
  const errorElement = form.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};


// Вызовем функцию
enableValidation(formConfig);







