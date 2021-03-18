/* global _:readonly */
import {
  updateMarkers
} from './map.js';

import {
  disableFormElements,
  enableFormElements
} from './util.js';

const ANY_FILTER_VALUE = 'any';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const RERENDER_DELAY = 500;


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


//Блокировка фильтра

const disableFilter = () => {
  filter.classList.add('map__filters--disabled');
  disableFormElements(filterElements);
};

//Разблокировка фильтра

const enableFilter = () => {
  filter.classList.remove('map__filters--disabled');
  enableFormElements(filterElements);
};

const filterByPrice = (ad, condition) => {
  console.log(ad.offer.price);
  console.log()

  return condition === ANY_FILTER_VALUE ||
          condition === 'middle'&& ad.offer.price >= LOW_PRICE && ad.offer.price < HIGH_PRICE ||
          condition === 'low' && ad.offer.price < LOW_PRICE ||
          condition === 'high' && ad.offer.price >= HIGH_PRICE;
};

//Фильтр
const filterAds = () => {
  const filteredArray =
    window.offers
      .filter(offer => {
        const houseCondition = selectedHouse === ANY_FILTER_VALUE || offer.offer.type === selectedHouse;
        const roomsCondition = selectedQuantityRooms === ANY_FILTER_VALUE || offer.offer.rooms === Number(selectedQuantityRooms);
        const guestsCondition = selectedQuantityGuests === ANY_FILTER_VALUE || offer.offer.guests === Number(selectedQuantityGuests);
        const priceCondition = filterByPrice(offer, selectedQuantityPrice);

        return roomsCondition && houseCondition && guestsCondition && priceCondition;
      });
  updateMarkers(filteredArray);
}


housingType.addEventListener('change', (evt) => {
  selectedHouse = evt.target.value;
  filterAds (selectedHouse, selectedQuantityRooms, selectedQuantityGuests, selectedQuantityPrice)
});

housingRooms.addEventListener('change', (evt) => {
  selectedQuantityRooms = evt.target.value;
  filterAds (selectedHouse, selectedQuantityRooms, selectedQuantityGuests, selectedQuantityPrice)
});

housingGuests.addEventListener('change', (evt) => {
  selectedQuantityGuests = evt.target.value;

  filterAds (selectedHouse, selectedQuantityRooms, selectedQuantityGuests, selectedQuantityPrice)
});

housingPrice.addEventListener('change', (evt) => {
  selectedQuantityPrice = evt.target.value;
  filterAds (selectedHouse, selectedQuantityRooms, selectedQuantityGuests, selectedQuantityPrice)
})


























// housingType.addEventListener('change', (evt) => {
//   const selectedHouse = evt.target.value;
//   const selectedQuantityRooms = housingRooms.value;
//   const selectedQuantityGuests = housingGuests.value;
//   const selectedQuantityPrice = housingPrice.value;
//   filterAds (selectedHouse, selectedQuantityRooms, selectedQuantityGuests, selectedQuantityPrice)
// });

// housingRooms.addEventListener('change', (evt) => {
//   const selectedQuantityRooms = evt.target.value;
//   const selectedHouse = housingType.value;
//   const selectedQuantityGuests = housingGuests.value;
//   const selectedQuantityPrice = housingPrice.value;
//   filterAds (selectedHouse, selectedQuantityRooms, selectedQuantityGuests, selectedQuantityPrice)
// });

// housingGuests.addEventListener('change', (evt) => {
//   const selectedQuantityGuests = evt.target.value;
//   const selectedHouse = housingType.value;
//   const selectedQuantityRooms = housingRooms.value;
//   const selectedQuantityPrice = housingPrice.value;
//   filterAds (selectedHouse, selectedQuantityRooms, selectedQuantityGuests, selectedQuantityPrice)
// });

// housingPrice.addEventListener('change', (evt) => {
//   const selectedQuantityPrice = evt.target.value;
//   const selectedHouse = housingType.value;
//   const selectedQuantityRooms = housingRooms.value;
//   const selectedQuantityGuests = housingGuests.value;
//   filterAds (selectedHouse, selectedQuantityRooms, selectedQuantityGuests, selectedQuantityPrice)
// })

//-----------------------------------------------------------------------------------------------
//Фильтрация преимуществ

housingFeatures.addEventListener('change', (evt) => {

  const checkedFeaturesArray = [...housingFeatures.querySelectorAll('.map__features input:checked')].map((feature) => feature.value);
  console.log(checkedFeaturesArray);
  const createFilteredFeaturesArray = [];
  window.offers.forEach((element) => {
    console.log(element.offer.features);
    if (element.offer.features.includes(checkedFeaturesArray)) {
      createFilteredFeaturesArray.push(element);
    };
    return createFilteredFeaturesArray;
  });
  console.log(createFilteredFeaturesArray);

});

//----------------------------------------------------------------------------------------------


//Очистка фильтра
const filterReset = () => {
  filter.reset();
}

export {
  filter,
  filterElements,
  disableFilter,
  enableFilter,
  filterReset
}
