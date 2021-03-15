

import {
  updateMarkers
} from './map.js';

import {
  disableFormElements,
  enableFormElements
} from './util.js';

const ANY_FILTER_VALUE = 'any';

const filter = document.querySelector('.map__filters');
const filterElements = filter.querySelectorAll('select, fieldset');

const housingType = filter.querySelector('#housing-type');

const disableFilter = () => {
  filter.classList.add('map__filters--disabled');
  disableFormElements(filterElements);
};

const enableFilter = () => {
  filter.classList.remove('map__filters--disabled');
  enableFormElements(filterElements);
};

housingType.addEventListener('change', (evt) => {
  const selectedHouse = evt.target.value;
  const filteredArray =
    window.offers
      .filter(offer => {
        const typeHouseCondition = selectedHouse === ANY_FILTER_VALUE || offer.offer.type === selectedHouse;
          return typeHouseCondition;

      });

  updateMarkers(filteredArray);
});

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
