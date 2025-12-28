export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    userId
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id; // Store the card ID
    this._likes = cardData.likes || [];
    this._ownerId = cardData.owner._id; // Store the owner ID
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick; // New handler for trash button
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    //"card__like-button_active"
    //".card__like-button"

    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this)
    );
    //".card__trash-button"
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this._id, this)
    ); // Call the new handler
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  setLikeStatus(isLiked) {
    const currentlyLiked = this.isLiked();
    if (isLiked && !currentlyLiked) {
      this._likes.push({ _id: this._userId });
    } else if (!isLiked && currentlyLiked) {
      this._likes = this._likes.filter((like) => like._id !== this._userId);
    }
    this._updateLikeView();
  }

  _updateLikeView() {s
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  getId() {
    return this._id;
  }

  removeCardElement() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__trash-button"); // Get the delete button

    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;

    this._updateLikeView();

    // TODO: Hide the delete button if the current user is not the owner
    // You'll need the current user's ID for this.

    this._setEventListeners();
    return this._cardElement;
  }
}
