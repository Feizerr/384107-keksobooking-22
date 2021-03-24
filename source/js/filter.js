/* global _:readonly */
import {
  updateMarkers
} from './map.js';

import {
  disableFormElements,
  enableFormElements
} from './util.js';

const ANY_FILTER_VALUE = 'any';
const LOW_PRICE = 'low';
const MIDDLE_PRICE = 'middle';
const HIGH_PRICE = 'high';
const RERENDER_DELAY = 500;
const MAX_COUNT_ADS = 10;

const PRICE = {
  'low': 10000,
  'high': 50000,
};

const filter = document.querySelector('.map__filters');
const filterElements = filter.querySelectorAll('select, fieldset');
const housingType = filter.querySelector('#housing-type');
const housingPrice = filter.querySelector('#housing-price');
const housingRooms = filter.querySelector('#housing-rooms');
const housingGuests = filter.querySelector('#housing-guests');
const housingFeatures = filter.querySelector('#housing-features');

let selectedHouse = housingType.value;
let selectedQuantityRooms = housingRooms.value;
let selectedQuantityGuests = housingGuests.value;
let selectedQuantityPrice = housingPrice.value;

const disableFilter = () => {
  filter.classList.add('map__filters--disabled');
  disableFormElements(filterElements);
};

const enableFilter = () => {
  filter.classList.remove('map__filters--disabled');
  enableFormElements(filterElements);
};

const filterByPrice = (ad, condition) => {
  return condition === ANY_FILTER_VALUE ||
    condition === MIDDLE_PRICE && ad.offer.price >= PRICE.low && ad.offer.price < PRICE.high ||
    condition === LOW_PRICE && ad.offer.price < PRICE.low ||
    condition === HIGH_PRICE && ad.offer.price >= PRICE.high;
};

const createFilteredArray = (offersArray, array, cb) => {
  for (let i = 0; i < offersArray.length; i++) {
    if (array.length === MAX_COUNT_ADS) {
      break
    } else if (cb(offersArray[i])) {
      array.push(offersArray[i])
    }
  }
};

const filterAds = () => {
  const checkedFeaturesArray = [...housingFeatures.querySelectorAll('.map__features input:checked')];
  const filteredArray = [];

  const filterObject = (object) => {
    const houseCondition = selectedHouse === ANY_FILTER_VALUE || object.offer.type === selectedHouse;
    const roomsCondition = selectedQuantityRooms === ANY_FILTER_VALUE || object.offer.rooms === Number(selectedQuantityRooms);
    const guestsCondition = selectedQuantityGuests === ANY_FILTER_VALUE || object.offer.guests === Number(selectedQuantityGuests);
    const priceCondition = filterByPrice(object, selectedQuantityPrice);
    const featuresCondition = checkedFeaturesArray.every(feature => object.offer.features.includes(feature.value));

    return roomsCondition && houseCondition && guestsCondition && priceCondition && featuresCondition;
  };

  createFilteredArray(window.offers, filteredArray, filterObject);
  updateMarkers(filteredArray);
};

housingType.addEventListener('change', (_.debounce((evt) => {
  selectedHouse = evt.target.value;
  filterAds();
}, RERENDER_DELAY)));

housingRooms.addEventListener('change', (_.debounce((evt) => {
  selectedQuantityRooms = evt.target.value;
  filterAds();
}, RERENDER_DELAY)));

housingGuests.addEventListener('change', (_.debounce((evt) => {
  selectedQuantityGuests = evt.target.value;
  filterAds();
}, RERENDER_DELAY)));

housingFeatures.addEventListener('change', (_.debounce(() => {
  filterAds();
}, RERENDER_DELAY)));

housingPrice.addEventListener('change', (_.debounce((evt) => {
  selectedQuantityPrice = evt.target.value;
  filterAds();
}, RERENDER_DELAY)));

const filterReset = () => {
  filter.reset();
  updateMarkers(window.offers);
};

export {
  filter,
  filterElements,
  disableFilter,
  enableFilter,
  filterReset
}
