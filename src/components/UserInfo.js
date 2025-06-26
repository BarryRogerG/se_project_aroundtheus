export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (about) this._jobElement.textContent = about;
    if (avatar) this._avatarElement.src = avatar;
  }
}
