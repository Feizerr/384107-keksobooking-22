import {
  resetMap
} from './map.js';

import {
  sendData
} from './api.js';

import {
  showPopup,
  templateErrorPopup,
  templateSuccessPopup
} from './popup.js';

import {
  disableFormElements,
  enableFormElements
} from './util.js';

import {
  filterReset
} from './filter.js';

import {
  loadPreviousAvatar,
  resetPhoto
} from './photo.js';

const MIN_PRICES = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const ADDRESS_FLOAT_LENGTH = 5;
const PALACE_OPTION_VALUE = '0';
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_ROOMS_COUNT = 100;
const MAX_ROOMS_VALUE = 0;
const MIN_ROOMS_VALUE = 1;
const NOT_FOR_GUESTS_CAPACITY = 3;
const SEND_FORM_URL = 'https://22.javascript.pages.academy/keksobooking';
const MAX_PRICE_MESSAGE = 'Максимальная стоимость жилья — 1 000 000 руб.';

const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('fieldset');
const inputAddress = form.querySelector('#address');
const housingType = form.querySelector('#type');
const housingPrice = form.querySelector('#price');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const formTitle = form.querySelector('#title');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const capacities = form.querySelectorAll('#capacity option');
const buttonReset = form.querySelector('.ad-form__reset');
const buttonSubmit = form.querySelector('.ad-form__submit');

formTitle.addEventListener('input', () => {
  const titleLength = formTitle.value.length;
  if (titleLength < MIN_TITLE_LENGTH) {
    formTitle.setCustomValidity('Введите еще ' + (MIN_TITLE_LENGTH - titleLength) + ' симв.');
  } else if (titleLength > MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity('Удалите ' + (titleLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
});

housingPrice.addEventListener('input', () => {
  if (housingPrice.validity.rangeOverflow) {
    housingPrice.setCustomValidity(MAX_PRICE_MESSAGE);
  } else {
    housingPrice.setCustomValidity('');
  }
});

const setRoomCapacity = () => {
  const roomsCount = Number(roomNumber.value);
  capacity.value = MIN_ROOMS_VALUE;
  capacities.forEach((element) => {
    element.disabled = false;
  });

  if (roomsCount === MAX_ROOMS_COUNT) {
    capacity.value = MAX_ROOMS_VALUE;
    capacities.forEach((element) => {
      if (element.value !== PALACE_OPTION_VALUE) {
        element.disabled = true;
      }
    });
  } else {
    capacities[NOT_FOR_GUESTS_CAPACITY].disabled = true;

    capacities.forEach((element) => {
      if (element.value > roomNumber.value) {
        element.disabled = true
      }
    });
  }
};

const onRoomNumberChange = () => {
  setRoomCapacity();
};

roomNumber.addEventListener('change', onRoomNumberChange);

const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};

const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

timeIn.addEventListener('change', onTimeInChange);

timeOut.addEventListener('change', onTimeOutChange);

const setMinPrices = () => {
  const minPrice = MIN_PRICES[housingType.value];
  housingPrice.min = minPrice;
  housingPrice.placeholder = minPrice;
};

const onHousingTypeChange = () => {
  setMinPrices();
};

housingType.addEventListener('change', onHousingTypeChange);

const setAddressValue = (lat, lng) => {
  inputAddress.value = lat.toFixed(ADDRESS_FLOAT_LENGTH) + ', ' + lng.toFixed(ADDRESS_FLOAT_LENGTH);
};

const disableForm = () => {
  form.classList.add('ad-form--disabled');
  disableFormElements(formElements);
};

const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  enableFormElements(formElements);
};

const formReset = () => {
  form.reset();
  setMinPrices();
  resetMap();
  setRoomCapacity();
  loadPreviousAvatar();
  resetPhoto();
};

const onFormSubmitSuccess = () => {
  formReset();
  filterReset();
  loadPreviousAvatar();
  resetPhoto();
  showPopup(templateSuccessPopup);
};

const onFormSubmitError = () => {
  showPopup(templateErrorPopup);
};

const setFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);

    sendData(formData, SEND_FORM_URL, onFormSubmitSuccess, onFormSubmitError);
  });
};

buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  formReset();
  filterReset();
});

setRoomCapacity();
setMinPrices();

export {
  form,
  formElements,
  setAddressValue,
  enableForm,
  setFormSubmit,
  buttonSubmit,
  disableForm
}
