import './popup.js';
import './photo.js';
import './ads.js';

import {
  map,
  createPopups,
  TOKIO_COORDINATES
} from './map.js';

import {
  enableForm,
  disableForm,
  setFormSubmit
} from './form.js';

import {
  disableFilter
} from './filter.js';

import {
  showErrorMessage
} from './util.js';

import {
  getData
} from './api.js';

const LOAD_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const ERROR_MESSAGE_TEXT = 'Не удалось загрузить данные. Обновите страницу';

disableFilter();
disableForm();

map.
  on('load', () => {
    enableForm();
  })
  .setView({
    lat: TOKIO_COORDINATES.lat,
    lng: TOKIO_COORDINATES.lng,
  }, TOKIO_COORDINATES.scale);

getData(LOAD_DATA_URL,
  (data) => {
    window.offers = data;
    createPopups(data);
  },
  () => showErrorMessage(ERROR_MESSAGE_TEXT),
);

setFormSubmit();
