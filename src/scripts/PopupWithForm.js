import Popup from "./Popup.js";

class popupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

const newCardPopup = new popupWithForm("#add-card-form", () => {});
newCardPopup.open();

newCardPopup.close();
