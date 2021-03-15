import {
  disableFormElements
} from './form.js';

const filter = document.querySelector('.map__filters');
const filterElements = filter.querySelectorAll('select, fieldset');
disableFormElements(filter, filterElements);


export {
  filter,
  filterElements
}
