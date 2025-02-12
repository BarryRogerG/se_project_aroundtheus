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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const previewCardCloseButton = previewCardModal.querySelector(".modal__close");
const previewModalCaptionEl = previewCardModal.querySelector(".modal__caption");
const nameInput = profileEditModal.querySelector("#modal-input-name");
const cardTitleInput = document.querySelector("#modal-input-title");
const cardUrlInput = document.querySelector("#modal-input-url");
/* -------------------------------------------------------------------------- */
/*                                  functions                                 */
/* -------------------------------------------------------------------------- */

function closePopup(popup) {
  popup.classList.remove("modal_opened");
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  const trashButton = cardElement.querySelector(".card__trash-button");
  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  cardImageEl.addEventListener("click", () => {
    openPopup(previewCardModal);
    previewModalImageEl.src = cardData.link;
    previewModalImageEl.alt = cardData.name;
    previewModalCaptionEl.textContent = cardData.name;
  });

  return cardElement;
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
  closePopup(profileEditModal);
}

function handleaddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, galleryCardsEl);
  closePopup(addCardModal);
  e.target.reset();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listener                               */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileAddButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

addCardModalCloseButton.addEventListener("click", () => {
  closePopup(addCardModal);
});

previewCardCloseButton.addEventListener("click", () => {
  closePopup(previewCardModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardModalForm.addEventListener("submit", handleaddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, galleryCardsEl));
