import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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
/*                                like buttons                                */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                Card Elements &  Forms                          */
/* -------------------------------------------------------------------------- */

const profileAddButton = document.querySelector("#profile-add-button");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardModalForm = document.querySelector("#add-card-form");
const galleryCardsEl = document.querySelector(".gallery__cards");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const trashButton = document.querySelectorAll(".card__trash-button");
const previewCardModal = document.querySelector("#preview-card-modal");
const previewModalImageEl = previewCardModal.querySelector(".modal__image");

const previewCardCloseButton = previewCardModal.querySelector(".modal__close");
const previewModalCaptionEl = previewCardModal.querySelector(".modal__caption");
const nameInput = profileEditModal.querySelector("#modal-input-name");
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
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */
const handleImageClick = (cardData) => {
  previewModalImageEl.src = cardData.link;
  previewModalImageEl.alt = cardData.name;
  previewModalCaptionEl.textContent = cardData.name;
  openModal(previewCardModal);
  console.log(cardData);
};

function getCardElement(cardData) {
  return new Card(cardData, "#card-template", handleImageClick).getView();
}

function renderCard(cardData, galleryCardsEl) {
  const cardElement = getCardElement(cardData);
  galleryCardsEl.prepend(cardElement);
}
/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleaddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, galleryCardsEl);
  closeModal(addCardModal);
  e.target.reset();
  addCardFormValidator.toggleButtonState();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listener                               */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileAddButton.addEventListener("click", () => {
  openModal(addCardModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardModalForm.addEventListener("submit", handleaddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, galleryCardsEl));

const modals = document.querySelectorAll(".modal");

const handleModalClose = (evt) => {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    // evt.currentTarget is the element on which the listener was set
    closeModal(evt.currentTarget);
  }
};

modals.forEach((modal) => {
  modal.addEventListener("mousedown", handleModalClose);
});

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}
