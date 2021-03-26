import {
  getNumWord
} from './util.js';

const GUEST_VARIATIONS = [
  'гостя',
  'гостей',
  'гостей',
];

const ROOMS_VARIATIONS = [
  'комната',
  'комнаты',
  'комнат',
];

const HOUSE_TYPES = {
  'house': 'Дом',
  'palace': 'Дворец',
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
};

const PHOTO_SIZES = {
  width: 45,
  height: 45,
};

const AVATAR_SIZES = {
  width: 70,
  height: 70,
};

const PHOTO_ALT = 'Фотография жилья';
const CARD_AVATAR_ALT = 'Аватар пользователя';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const createPopupDescription = (key, card) => {
  if (key) {
    card.textContent = key;
  } else {
    card.remove();
  }
};

const createFeatures = (keys, card) => {
  keys.forEach((value, index) => {
    let featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', 'popup__feature--' + keys[index]);
    card.appendChild(featureElement);
  })
  return card;
};

const createPhotosCard = (keys, card) => {
  keys.forEach((value, i) => {
    let photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.src = keys[i];
    photo.alt = PHOTO_ALT;
    photo.style.width = PHOTO_SIZES.width + 'px';
    photo.style.height = PHOTO_SIZES.height + 'px';
    card.appendChild(photo);
  });

  return card;
};

const createAdPopup = (data) => {
  const newCard = cardTemplate.cloneNode(true);
  const cardTitle = newCard.querySelector('.popup__title');
  const cardAddress = newCard.querySelector('.popup__text--address');
  const cardPrice = newCard.querySelector('.popup__text--price');
  const cardType = newCard.querySelector('.popup__type');
  const cardRoomsAndGuests = newCard.querySelector('.popup__text--capacity');
  const cardTime = newCard.querySelector('.popup__text--time');
  const cardDescription = newCard.querySelector('.popup__description');
  const cardAvatar = newCard.querySelector('.popup__avatar');

  const createFeaturesElements = (data) => {
    const featureElements = newCard.querySelector('.popup__features');
    featureElements.textContent = '';

    createFeatures(data.offer.features, featureElements)
  };

  const createPhotos = (data) => {
    const photos = newCard.querySelector('.popup__photos');
    photos.textContent = '';

    createPhotosCard(data.offer.photos, photos)
  };

  if (data.offer.type) {
    cardType.textContent = HOUSE_TYPES[data.offer.type];
  } else {
    cardType.remove();
  }

  if (data.offer.price) {
    cardPrice.textContent = data.offer.price + ' ₽/ночь';
  } else {
    cardPrice.remove();
  }

  if (data.offer.rooms && data.offer.guests) {
    cardRoomsAndGuests.textContent = data.offer.rooms + ' ' + getNumWord(data.offer.rooms, ROOMS_VARIATIONS) + ' для ' + data.offer.guests + ' ' + getNumWord(data.offer.guests, GUEST_VARIATIONS);
  } else {
    cardRoomsAndGuests.remove();
  }

  if (data.offer.checkin && data.offer.checkout) {
    cardTime.textContent = 'Заезд после ' + data.offer.checkin + ', ' + 'выезд до ' + data.offer.checkout;
  } else {
    cardTime.remove();
  }

  if (data.offer.features) {
    createFeaturesElements(data);
  }

  if (data.offer.photos) {
    createPhotos(data);
  }

  if (data.author.avatar) {
    cardAvatar.src = data.author.avatar;
    cardAvatar.alt = CARD_AVATAR_ALT;
    cardAvatar.style.width = AVATAR_SIZES.width + 'px';
    cardAvatar.style.height = AVATAR_SIZES.height + 'px';
  } else {
    cardAvatar.remove();
  }

  createPopupDescription(data.offer.address, cardAddress);
  createPopupDescription(data.offer.description, cardDescription);
  createPopupDescription(data.offer.title, cardTitle);

  return newCard;
};

export {
  createAdPopup
}
