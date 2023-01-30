// Выбираем кнопки
const editBtn = document.querySelector('.profile__button-edit')
const exitBtn = document.querySelectorAll('.popup__button-exit')
const addBtn = document.querySelector('.profile__button-add')
const delBtn = document.querySelector('.element__button-del')
// Выбираем модальное окно и input в нём
const popup = document.querySelector('.popup')
const popupAdd = document.querySelector('.popup-add')
const popupForm = document.querySelector('.popup__form')
const popupInputName = document.querySelector('#input-name')
const popupInputProf = document.querySelector('#input-prof')
// Выбираем поля из секции profile
const profileInfoName = document.querySelector('.profile__info-name')
const profileInfoProf = document.querySelector('.profile__info-profession')

// Функция и обработчик на открытие и закрытие модальных окон
function openPopup(e) {
  if (e.target.classList.contains('profile__button-edit')) {
    popup.classList.add('popup_opened')
    popupInputName.value = profileInfoName.textContent
    popupInputProf.value = profileInfoProf.textContent
  } else if (e.target.classList.contains('profile__button-add')) {
    popupAdd.classList.add('popup_opened')
  }
}

function closePopup() {
  popup.classList.remove('popup_opened')
  popupAdd.classList.remove('popup_opened')
}

editBtn.addEventListener('click', openPopup)
for (let i = 0; i < exitBtn.length; ++i) {
  exitBtn[i].addEventListener('click', closePopup)
}
addBtn.addEventListener('click', openPopup)
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

// --------------- element-template --------------------

// массив для elements
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elementTemplate = document.querySelector('#element-template').content.querySelector('.element')
const elementsContainer = document.querySelector('.elements')

// Функция отрисовывает каждый element
function renderElement() {
  initialCards.forEach((item) => {
    elementTemplate.querySelector('.element__picture').src = item.link
    elementTemplate.querySelector('.element__picture').alt = item.name
    elementTemplate.querySelector('.element__area-title').textContent = item.name
    const element = elementTemplate.cloneNode(true)
    elementsContainer.prepend(element)
  })
}

renderElement()
