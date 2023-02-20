

// Функция добавляет класс с ошибкой
const showInputError = (form, formInput, errorMessage) => {
  const errorElement = form.querySelector(`.${formInput.id}-error`);
  formInput.classList.add('popup__input_type_error');
  errorElement.classList.add('popup__input-error_active'); // Показываем span-сообщение об ошибке
  errorElement.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
};

// Функция удаляет класс с ошибкой
const hideInputError = (form, formInput) => {
  const errorElement = form.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

// Функция проверяет валидность поля
const isValid = (form, formInput) => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(form, formInput, formInput.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(form, formInput);
  }
};

// Функция добавляет обработчики всем input формы
const setEventListeners = (form) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const buttonElement = form.querySelector('.popup__button-save');
  toggleButtonState(inputList, buttonElement);  //передадим массив полей и кнопку

  // Обойдём все элементы полученной коллекции
  inputList.forEach((formInput) => {
    // каждому полю добавим обработчик события input
    formInput.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(form, formInput)
      toggleButtonState(inputList, buttonElement);  //передадим массив полей и кнопку
    });
  });
};

// Функция добавляет слушатель всем формам
const enableValidation = () => { 
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  console.log(formList);
  // Переберём полученную коллекцию
  formList.forEach((form) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(form);
  });
};
  
// Функция проверяет наличие невалидного input
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

// Функция управляет состоянием кнопки
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add('popup__button-save_inactive');
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove('popup__button-save_inactive');
  }
};

// Вызовем функцию
enableValidation();








