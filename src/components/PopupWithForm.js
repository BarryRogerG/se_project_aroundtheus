import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    // Get the form ID from the popup selector (removing the '#' prefix)
    const formId = this._popupSelector.id;
    this._popupForm = document.forms[formId];
  }

  _getInputValues() {
    const formElements = this._popupForm.elements;
    const inputValues = {};
    // Convert to array and filter only input elements
    Array.from(formElements)
      .filter((element) => element.classList.contains("modal__input"))
      .forEach((input) => {
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

  close() {
    this._popupForm.reset();
    super.close();
  }
}
