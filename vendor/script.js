const editBtn = document.querySelector('.profile__button-edit')
const addBtn = document.querySelector('.profile__button-add')
const saveBtn = document.querySelector('.popup__button-save')
const exitBtn = document.querySelector('.popup__button-exit')

const popup = document.querySelector('.popup')
const popupInputName = document.querySelector('.popup__input-name')
const popupInputProf = document.querySelector('.popup__input-prof')

const profileInfoName = document.querySelector('.profile__info-name')
const profileInfoProf = document.querySelector('.profile__info-profession')

popupInputName.value = profileInfoName.textContent
popupInputProf.value = profileInfoProf.textContent

editBtn.addEventListener('click', openPopup)
exitBtn.addEventListener('click', closePopup)
popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
})

function openPopup() {
  popup.classList.add('popup_opened')
}

function closePopup() {
  popup.classList.remove('popup_opened')
}


function saveInputPopup(event) {
  event.preventDefault()

  profileInfoName.textContent = popupInputName.value
  profileInfoProf.textContent = popupInputProf.value
  closePopup()
}

popup.addEventListener('submit', saveInputPopup)
