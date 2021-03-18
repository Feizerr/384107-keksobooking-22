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
const MIDDLE_PRICE = 'middle'
const HIGH_PRICE = 'high';
const RERENDER_DELAY = 500;

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

const filterAds = () => {
  const checkedFeaturesArray = [...housingFeatures.querySelectorAll('.map__features input:checked')].map((feature) => feature.value);
  const filteredArray =
    window.offers
      .filter(offer => {
        const houseCondition = selectedHouse === ANY_FILTER_VALUE || offer.offer.type === selectedHouse;
        const roomsCondition = selectedQuantityRooms === ANY_FILTER_VALUE || offer.offer.rooms === Number(selectedQuantityRooms);
        const guestsCondition = selectedQuantityGuests === ANY_FILTER_VALUE || offer.offer.guests === Number(selectedQuantityGuests);
        const priceCondition = filterByPrice(offer, selectedQuantityPrice);
        const featuresCondition = checkedFeaturesArray.every(feature => offer.offer.features.includes(feature));

        return roomsCondition && houseCondition && guestsCondition && priceCondition && featuresCondition;
      });
  updateMarkers(filteredArray);
};

housingType.addEventListener('change', (_.debounce((evt) => {
  selectedHouse = evt.target.value;
  filterAds (selectedHouse, selectedQuantityRooms, selectedQuantityGuests, selectedQuantityPrice)
}, RERENDER_DELAY)));

housingRooms.addEventListener('change', (_.debounce((evt) => {
  selectedQuantityRooms = evt.target.value;
  filterAds (selectedHouse, selectedQuantityRooms, selectedQuantityGuests, selectedQuantityPrice)
}, RERENDER_DELAY)));

housingGuests.addEventListener('change', (_.debounce((evt) => {
  selectedQuantityGuests = evt.target.value;

  filterAds (selectedHouse, selectedQuantityRooms, selectedQuantityGuests, selectedQuantityPrice)
}, RERENDER_DELAY)));


housingFeatures.addEventListener('change', (_.debounce((evt) => {
  filterAds (selectedHouse, selectedQuantityRooms, selectedQuantityGuests, selectedQuantityPrice);
}, RERENDER_DELAY)));

housingPrice.addEventListener('change', (_.debounce((evt) => {
  selectedQuantityPrice = evt.target.value;
  filterAds (selectedHouse, selectedQuantityRooms, selectedQuantityGuests, selectedQuantityPrice)
}, RERENDER_DELAY)));

const filterReset = () => {
  filter.reset();
};

export {
  filter,
  filterElements,
  disableFilter,
  enableFilter,
  filterReset
}
