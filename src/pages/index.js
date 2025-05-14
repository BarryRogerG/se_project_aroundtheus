import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import Popup from "../components/Popup.js";
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

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

/* -------------------------------------------------------------------------------------------------------------------------*/
/*                                                    Profiles  Elements                                                                                                  */
/* -------------------------------------------------------------------------------------------------------------------------*/

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#modal-input-name");
const profileDescriptionInput = document.querySelector(
  "#modal-input-description"
);

/* -------------------------------------------------------------------------- */
/*                                Card Elements & Forms                          */
/* -------------------------------------------------------------------------- */

const profileAddButton = document.querySelector("#profile-add-button");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardModalForm = document.querySelector("#add-card-form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const cardTitleInput = document.querySelector("#modal-input-title");
const cardUrlInput = document.querySelector("#modal-input-url");

/* ------------------------------- validation ------------------------------- */

const options = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addCardFormValidator = new FormValidator(options, addCardModalForm);
addCardFormValidator.enableValidation();

const editFormValidator = new FormValidator(options, profileEditForm);
editFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  Class Instances                             */
/* -------------------------------------------------------------------------- */

const imagePreviewPopup = new PopupWithImage("#preview-card-modal");
const editProfilePopup = new Popup({ popupSelector: "#profile-edit-modal" });
const addCardPopup = new Popup({ popupSelector: "#add-card-modal" });

// Set up event listeners for all popups
imagePreviewPopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".gallery__cards"
);

/* -------------------------------------------------------------------------- */
/*                                  Functions                                   */
/* -------------------------------------------------------------------------- */

const handleImageClick = (cardData) => {
  imagePreviewPopup.open(cardData);
};

function createCard(cardData) {
  return new Card(cardData, "#card-template", handleImageClick).getView();
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                                */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  userInfo.setUserInfo({
    name: profileNameInput.value,
    job: profileDescriptionInput.value,
  });
  editProfilePopup.close();
}

function handleaddCardSubmit(e) {
  e.preventDefault();
  const newCard = {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };
  cardSection.addItem(createCard(newCard));
  addCardPopup.close();
  e.target.reset();
  addCardFormValidator.toggleButtonState();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                               */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileNameInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.job;
  editProfilePopup.open();
});

profileAddButton.addEventListener("click", () => {
  addCardPopup.open();
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardModalForm.addEventListener("submit", handleaddCardSubmit);

/* -------------------------------------------------------------------------- */
/*                               Page Initialization                           */
/* -------------------------------------------------------------------------- */

// Render initial cards
cardSection.renderItems();
