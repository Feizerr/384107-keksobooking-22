import {
  numWord
} from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const GUEST_VARIATION = [
  'гость',
  'гостя',
  'гостей',
];

const ROOMS_VARIATION = [
  'комната',
  'комнаты',
  'комнат',
];

const PHOTO_SIZE = {
  width: 45,
  height: 45,
};

const AVATAR_SIZE = {
  width: 70,
  height: 70,
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

    data.offer.features.forEach((value, index) => {
      let featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', 'popup__feature--' + data.offer.features[index]);
      featureElements.appendChild(featureElement);
    })
    return featureElements;
  }

  const createPhotos = (data) => {
    const photos = newCard.querySelector('.popup__photos');
    photos.textContent = '';

    data.offer.photos.forEach((value, i) => {
      let photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.src = data.offer.photos[i];
      photo.alt = 'Фотография жилья';
      photo.style.width = PHOTO_SIZE.width + 'px';
      photo.style.height = PHOTO_SIZE.height + 'px';
      photos.appendChild(photo);
    });

    return photos
  };

  if (data.offer.title) {
    cardTitle.textContent = data.offer.title;
  } else {
    cardTitle.remove();
  }

  if (data.offer.address) {
    cardAddress.textContent = data.offer.address;
  } else {
    cardAddress.remove();
  }

  if (data.offer.price) {
    cardPrice.textContent = data.offer.price + ' ₽/ночь';
  } else {
    cardPrice.remove();
  }

  if (data.offer.type) {
    cardType.textContent = data.offer.type;
  } else {
    cardType.remove();
  }

  if (data.offer.rooms && data.offer.guests) {
    cardRoomsAndGuests.textContent = data.offer.rooms + ' ' + numWord(data.offer.rooms, ROOMS_VARIATION) + ' для ' + data.offer.guests + ' ' + numWord(data.offer.guests, GUEST_VARIATION);
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

  if (data.offer.description) {
    cardDescription.textContent = data.offer.description;
  } else {
    cardDescription.remove();
  }

  if (data.offer.photos) {
    createPhotos(data);
  }

  if (data.author.avatar) {
    cardAvatar.src = data.author.avatar;
    cardAvatar.alt = 'Аватар пользователя';
    cardAvatar.style.width = AVATAR_SIZE.width + 'px';
    cardAvatar.style.height = AVATAR_SIZE.height + 'px';
  } else {
    cardAvatar.remove();
  }

  return newCard;
}

export {
  mapCanvas,
  createAdPopup
}
