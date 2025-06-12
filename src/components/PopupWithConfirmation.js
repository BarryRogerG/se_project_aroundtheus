import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupForm.querySelector(".button");
  }

  setSubmitAction(callback) {
    this._handleFormSubmit = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  // Add a loading state method (optional but good practice)
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Deleting..."; // Or change text to indicate loading
    } else {
      this._submitButton.textContent = "Yes"; // Revert button text
    }
  }
}
