class FormValidator {
  constructor(options, formEl) {
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;

    this._form = formEl;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }

  _hideInputError(inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  }

  _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (this._hasInvalidInput(inputEls)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  _setEventListeners(formEl, options) {
    const { inputSelector, submitButtonSelector } = options;
    const inputEls = [this._form.querySelectorAll(this._inputSelector)];
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    toggleButtonState(inputEls, submitButton, options);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this._form, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  enableValidation(options) {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
  }
}

const editFormValidator = new FormValidator();
editFormValidator.enableValidation();

export default FormValidator;
