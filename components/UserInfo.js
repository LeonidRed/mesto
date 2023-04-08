export default class UserInfo {
  constructor(userName, userProf) {
    this._userName = userName
    this._userProf = userProf
  }

  // метод подставляет данные пользователя в форму при открытии
  getUserInfo() {
    this._values = {
      name: this._userName.textContent,
      prof: this._userProf.textContent
    }
    return this._values
  }

  // метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(name, prof) {
    this._userName.textContent = name
    this._userProf.textContent = prof
  }

} 