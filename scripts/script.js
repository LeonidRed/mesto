// Выбираем кнопки
const editBtn = document.querySelector('.profile__button-edit')
const exitBtn = document.querySelector('.popup__button-exit')
// Выбираем модальное окно и input в нём
const popup = document.querySelector('.popup')
const popupForm = document.querySelector('.popup__form')
const popupInputName = document.querySelector('#input-name')
const popupInputProf = document.querySelector('#input-prof')
// Выбираем поля из секции profile
const profileInfoName = document.querySelector('.profile__info-name')
const profileInfoProf = document.querySelector('.profile__info-profession')

// Функция и обработчик на открытие и закрытие модального окна
function openPopup() {
  popup.classList.add('popup_opened')
  popupInputName.value = profileInfoName.textContent
  popupInputProf.value = profileInfoProf.textContent
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

editBtn.addEventListener('click', openPopup)
exitBtn.addEventListener('click', closePopup)
// Закрываем модальное окно по клику на любом месте
// popup.addEventListener('click', function (event) {
//   if (event.target === event.currentTarget) {
//     closePopup();
//   }
// })

//Функция и обработчик на сохранение профиля

function saveInputPopup(event) {
  event.preventDefault()

  profileInfoName.textContent = popupInputName.value
  profileInfoProf.textContent = popupInputProf.value
  closePopup()
}

popupForm.addEventListener('submit', saveInputPopup)
