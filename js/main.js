import {} from './popup.js';
import './ads.js';

import {
  map,
  createPopups,
  TOKIO_COORDINATES
} from './map.js';
import {
  form,
  formElements,
  enableFormElements,
  setFormSubmit
} from './form.js';

import {
  filter,
  filterElements
} from './filter.js'

import {
  showErrorMessage
} from './util.js'

import {
  getData
} from './api.js';

const LOAD_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';

getData (LOAD_DATA_URL,
  (data) => {
    window.offers = data;
    createPopups(data);
  },
  () => showErrorMessage('Не удалось загрузить данные. Обновите страницу'),
);

map.
  on('load', () => {
    enableFormElements(form, formElements);
    enableFormElements(filter, filterElements);
  })
  .setView({
    lat: TOKIO_COORDINATES.lat,
    lng: TOKIO_COORDINATES.lng,
  }, TOKIO_COORDINATES.scale);

setFormSubmit()
