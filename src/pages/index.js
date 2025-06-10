import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Define an object to store all form validators
const formValidators = {};

// Function to enable validation for all forms
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

// DOM elements
const profileEditButton = document.querySelector("#profile-edit-button");
const profileAddButton = document.querySelector("#profile-add-button");
const profileNameInput = document.querySelector("#modal-input-name");
const profileDescriptionInput = document.querySelector(
  "#modal-input-description"
);

const api = new Api({
  baseUrl: "/v1",
  headers: {
    authorization: "83afc0e8-d580-48dd-9720-21d5eeda6616",
    "Content-Type": "application/json",
  },
});

/* -------------------------------------------------------------------------- */
/*                                  Functions                                   */
/* -------------------------------------------------------------------------- */

function handleImageClick(cardData) {
  imagePreviewPopup.open(cardData);
}

function handleCardDelete(cardId, cardElement) {
  deleteConfirmationPopup.open();

  deleteConfirmationPopup.setSubmitAction(() => {
    deleteConfirmationPopup.renderLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.removeCardElement();
        deleteConfirmationPopup.close();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      })
      .finally(() => {
        deleteConfirmationPopup.renderLoading(false);
      });
  });
}

function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleCardDelete
  );
  return card.getView();
}

/* -------------------------------------------------------------------------- */
/*                                  Class Instances                             */
/* -------------------------------------------------------------------------- */

const imagePreviewPopup = new PopupWithImage("#preview-card-modal");
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const cardSection = new Section(
  {
    items: [],
    renderer: renderCard,
  },
  ".gallery__cards"
);

const editProfilePopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    console.log("Profile form submitted:", formData);
    editProfilePopup.close();
  },
});

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (formData) => {
    console.log("Add card form submitted:", formData);
    addCardPopup.resetForm();
    addCardPopup.close();
  },
});

const deleteConfirmationPopup = new PopupWithConfirmation({
  popupSelector: "#delete-card-modal",
});

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                               */
/* -------------------------------------------------------------------------- */

imagePreviewPopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
deleteConfirmationPopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileNameInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.job;
  formValidators["profile-edit"].resetValidation();
  editProfilePopup.open();
});

profileAddButton.addEventListener("click", () => {
  formValidators["add-card"].resetValidation();
  addCardPopup.open();
});

/* -------------------------------------------------------------------------- */
/*                               Page Initialization                           */
/* -------------------------------------------------------------------------- */

enableValidation(validationConfig);

// Load initial user info and cards from the API
api
  .getAppInfo()
  .then(([userData, cardsData]) => {
    // Set user information
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });

    // Render initial cards
    cardSection.renderItems(cardsData);
  })
  .catch((err) => {
    console.error("Error loading initial data:", err);
  });

// Render initial cards (This will now render an empty array until API data is fetched)
// cardSection.renderItems();
