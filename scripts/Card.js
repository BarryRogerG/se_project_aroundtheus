export default class Card {
  constructor(cardData, cardSelector, cardImageEl) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._cardImageEl = cardImageEl;
  }

  _setEventListeners() {
    //"card__like-button_active"
    //".card__like-button"
    this._likeElement = this._cardElement.querySelector(".card__like-button");

    this._likeElement.addEventListener("click", () => this._handleLikeIcon());
    //".card__trash-button"
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => this._handleDeleteCard());
    this._cardImageElement.addEventListener("click", () => {
      this._cardImageEl(this);
    });
  }

  _handleLikeIcon() {
    this._likeElement.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._setEventListeners();
    return this._cardElement;
  }
}
