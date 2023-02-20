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
]

// Выбираем кнопки
const popupProfileOpenButton = document.querySelector('.profile__button-edit')
//const popupCloseButton = document.querySelectorAll('.popup__button-exit')
const popupAddCardOpenButton = document.querySelector('.profile__button-add')
const cardDeleteButton = document.querySelector('.element__button-del')

// Выбираем модальные окна и input в них
const popupProfile = document.querySelector('.popup-profile')
const popupProfileForm = document.querySelector('.popup__form-profile')
const popupAddCard = document.querySelector('.popup-add')
const popupAddCardForm = document.querySelector('.popup__form_add')
const popupImg = document.querySelector('.popup-image')
//popup-edit
const popupProfileInputName = document.querySelector('#input-name')
const popupProfileInputProf = document.querySelector('#input-prof')
//popup-add
const popupAddCardInputTitle = document.querySelector('#input-title')
const popupAddCardInputLink = document.querySelector('#input-link')
//popup-image
const popupFigureImage = document.querySelector('.popup__figure-image')
const popupFigureCaption = document.querySelector('.popup__figure-caption')

// Выбираем поля из секции profile
const profileInfoName = document.querySelector('.profile__info-name')
const profileInfoProf = document.querySelector('.profile__info-profession')

// Для открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupOnOverlayClick) // слушатель на overlay
  popup.addEventListener('click', closePopupOnCrossButton)  // слушатель на кнопку
  window.addEventListener('keydown', closePopupOnEsc)  // слушатель на Escape
  popup.addEventListener('keydown', closePopupOnEsc)
}

// Для закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', closePopupOnOverlayClick) // убираем слушатель на overlay
  popup.removeEventListener('click', closePopupOnCrossButton) // убираем слушатель на кнопку-крестик
  window.removeEventListener('keydown', closePopupOnEsc)  // убираем слушатель на Escape
  popup.removeEventListener('keydown', closePopupOnEsc)
}

// Функция закрывает попап по клику на overlay
function closePopupOnOverlayClick(event) {
  if(event.target === event.currentTarget) {
    closePopup(event.target)
  }
}

// Функция закрывает попап по клику на кнопку-крестик
function closePopupOnCrossButton(event) {
  closePopup(event.target.parentNode)
}

// Функция закрывает попап по нажатию на Escape
function closePopupOnEsc(event) {
  if(event.key === 'Escape' || event.key === 'Esc'){
    const activePopup = document.querySelector('.popup_opened')
    closePopup(activePopup)
  }
}

// Обработчик на кнопку редактирования профиля
popupProfileOpenButton.addEventListener('click', function() {
  openPopup(popupProfile)
  popupProfileInputName.value = profileInfoName.textContent
  popupProfileInputProf.value = profileInfoProf.textContent
  hideInputError(popupProfile, popupProfileInputName, formConfig)
  hideInputError(popupProfile, popupProfileInputProf, formConfig)
  enableValidation(formConfig)
})

// Обработчик на кнопку добавления новой карточки
popupAddCardOpenButton.addEventListener('click', function() {
  openPopup(popupAddCard)
})

//Функция и обработчик на кнопку сохранение профиля
function savePopupProfileInput(event) {
  event.preventDefault()
  if (popupProfileInputName.value && popupProfileInputProf.value) {
    profileInfoName.textContent = popupProfileInputName.value
    profileInfoProf.textContent = popupProfileInputProf.value
    closePopup(event.target.parentNode.parentNode)
  }
}

popupProfileForm.addEventListener('submit', savePopupProfileInput)

// --------------- element-template --------------------

// Выбираем шаблон и контейнер для вставки шаблона
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element')
const elementsContainer = document.querySelector('.elements')

// Функция отрисовывает каждый карточку из массива
function renderElement(arr) {
  const elements = arr.map((item) => { //проходим по каждому элементу массива и возвращаем новый массив HTMLElement
    return createCard(item)
  })
  // Добавляем элементы в DOM
  elementsContainer.prepend(...elements)
}

renderElement(initialCards)

// Функция, которая создает карточку
function createCard(el) {
  const elementTemplateImg = elementTemplate.querySelector('.element__picture')
  elementTemplateImg.src = el.link
  elementTemplateImg.alt = el.name
  elementTemplate.querySelector('.element__area-title').textContent = el.name
  const element = elementTemplate.cloneNode(true)

  // добавление лайк-кнопки
  const likeBtn = element.querySelector('.element__area-like')
  likeBtn.addEventListener('click', function () {
    likeBtn.classList.toggle('element__area-like_active')
  })

  // добавление удаления-кнопки
  const cardDeleteButton = element.querySelector('.element__button-del')
  cardDeleteButton.addEventListener('click', function () {
    element.remove()
  })

  // добавление попапа с картинкой
  const elementPicture = element.querySelector('.element__picture')
  elementPicture.addEventListener('click', function () {
    openPopup(popupImg)
    popupFigureImage.src = el.link
    popupFigureImage.alt = el.name
    popupFigureCaption.textContent = el.name
  })

  return element
}

// Функция и обработчик на добавление новой карточки
function addNewCard(event) {
  event.preventDefault()

  const link = popupAddCardInputLink.value
  const title = popupAddCardInputTitle.value

  const element = createCard({link: link, name: title})
  elementsContainer.prepend(element)

  closePopup(event.target.parentNode.parentNode)
  popupAddCardInputLink.value = ''
  popupAddCardInputTitle.value = ''
}

popupAddCardForm.addEventListener('submit', addNewCard)

// --------------- element-template end --------------------
