// Выбираем кнопки
const editBtn = document.querySelector('.profile__button-edit')
const exitBtn = document.querySelectorAll('.popup__button-exit')
const addBtn = document.querySelector('.profile__button-add')
const delBtn = document.querySelector('.element__button-del')

// Выбираем модальные окна и input в них
const popup = document.querySelector('.popup')
const popupForm = document.querySelector('.popup__form')
const popupAdd = document.querySelector('.popup-add')
const popupFormAdd = document.querySelector('.popup__form_add')
const popupImg = document.querySelector('.popup-image')
//popup-edit
const popupInputName = document.querySelector('#input-name')
const popupInputProf = document.querySelector('#input-prof')
//popup-add
const popupInputTitle = document.querySelector('#input-title')
const popupInputLink = document.querySelector('#input-link')
//popup-image
const popupFigureImage = document.querySelector('.popup__figure-image')
const popupFigureCaption = document.querySelector('.popup__figure-caption')

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
  popupImg.classList.remove('popup_opened')
}

// Обработчик на кнопки: редактировать, добавить и закрыть
// редактировать
editBtn.addEventListener('click', openPopup)
// добавить
addBtn.addEventListener('click', openPopup)
// закрыть
for (let i = 0; i < exitBtn.length; ++i) {
  exitBtn[i].addEventListener('click', closePopup)
}

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

// Выбираем шаблон и контейнер для вставки шаблона
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element')
const elementsContainer = document.querySelector('.elements')

// Функция отрисовывает каждый element из массива
function renderElement(arr) {
  const elements = arr.map((item) => { //проходим по каждому элементу массива и возвращаем новый массив HTMLElement
    return createElement(item)
  })
  // Добавляем элементы в DOM
  elementsContainer.prepend(...elements)
}

renderElement(initialCards)

// Функция, которая создает element
function createElement(el) {
    elementTemplate.querySelector('.element__picture').src = el.link
    elementTemplate.querySelector('.element__picture').alt = el.name
    elementTemplate.querySelector('.element__area-title').textContent = el.name
    const element = elementTemplate.cloneNode(true)

    // добавление лайк-кнопки
    const likeBtn = element.querySelector('.element__area-like')
    likeBtn.addEventListener('click', function () {
      likeBtn.classList.toggle('element__area-like_active')
    })

    // добавление удаления-кнопки
    const delBtn = element.querySelector('.element__button-del')
    delBtn.addEventListener('click', function () {
      element.remove()
    })

    // добавление попапа с картинкой
    const elementPic = element.querySelector('.element__picture')
    elementPic.addEventListener('click', function () {
      popupImg.classList.add('popup_opened')
      popupFigureImage.src = el.link
      popupFigureImage.alt = el.name
      popupFigureCaption.textContent = el.name
    })
    return element
}

// Функция и обработчик на сохранение нового element
function addNewElement(event) {
  event.preventDefault()

  const link = popupInputLink.value
  const title = popupInputTitle.value

  const element = createElement({link: link, name: title})
  elementsContainer.prepend(element)

  closePopup()
  popupInputLink.value = ''
  popupInputTitle.value = ''
}

popupFormAdd.addEventListener('submit', addNewElement)
