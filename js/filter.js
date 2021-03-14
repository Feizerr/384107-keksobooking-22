import {
  disableFormElements
} from './form.js';

const HOTELS = [
  'any',
  'palace',
  'flat',
  'house',
  'bungalow'
];

const filter = document.querySelector('.map__filters');
const filterHousingTypeOptions = filter.querySelectorAll('option');
const filterElements = filter.querySelectorAll('select, fieldset');
disableFormElements(filter, filterElements);


// const housingTypeValue = housingType.value;






export {
  filter,
  filterElements
}
