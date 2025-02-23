export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    //"card__like-button_active"
    //".card__like-button"
    const likeButton = this._cardElement.querySelector(".card__like-button");
    console.log(likeButton);
    //".card__trash-button"
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._setEventListeners();
  }
}
