import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

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

/* -------------------------------------------------------------------------- */
/*                                  Functions                                   */
/* -------------------------------------------------------------------------- */

function handleImageClick(cardData) {
  imagePreviewPopup.open(cardData);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
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
    items: initialCards,
    renderer: renderCard,
  },
  ".gallery__cards"
);

const editProfilePopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo({
      name: formData.name,
      job: formData.description,
    });
    editProfilePopup.close();
  },
});

const addCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: (formData) => {
    const newCard = {
      name: formData.title,
      link: formData.url,
    };
    cardSection.addItem(renderCard(newCard));
    addCardPopup.close();
  },
});

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                               */
/* -------------------------------------------------------------------------- */

// Set up event listeners for all popups
imagePreviewPopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

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

// Enable validation for all forms
enableValidation(validationConfig);

// Render initial cards
cardSection.renderItems();
