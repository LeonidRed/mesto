const editBtn = document.querySelector('.profile__button_edit')
const addBtn = document.querySelector('.profile__button_add')
const saveBtn = document.querySelector('.popup__button_save')
const exitBtn = document.querySelector('.popup__button_exit')

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

saveBtn.addEventListener('click', saveInputPopup)
