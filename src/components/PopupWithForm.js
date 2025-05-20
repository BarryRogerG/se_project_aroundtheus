import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    // Get the form ID from the popup selector (removing the '#' prefix)
    const formId = this._popupElement.id;
    this._popupForm = document.forms[formId];
    // Store input elements with class 'modal__input' as a class field
    this._inputElements = Array.from(this._popupForm.elements).filter(
      (element) => element.classList.contains("modal__input")
    );
  }

  _getInputValues() {
    const inputValues = {};
    this._inputElements.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  // Method to reset form - should be called only after successful submission
  resetForm() {
    this._popupForm.reset();
  }
}
