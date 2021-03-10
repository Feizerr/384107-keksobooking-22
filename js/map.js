/* global L:readonly */
import {
  setAddressValue
} from './form.js';

import {
  createAdPopup
} from './ads.js';


const TOKIO_COORDINATES = {
  lat: 35.68950,
  lng: 139.69171,
  scale: 12,
}

const TOKIO_COORDINATES_CENTER = {
  lat: 35.70843,
  lng: 139.76526,
}

const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker({
  lat: TOKIO_COORDINATES_CENTER.lat,
  lng: TOKIO_COORDINATES_CENTER.lng,
}, {
  draggable: true,
  icon: mainPinIcon,
});

mainMarker.addTo(map);

setAddressValue(TOKIO_COORDINATES_CENTER.lat, TOKIO_COORDINATES_CENTER.lng);

const setCoordinateValue = () => {
  mainMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    setAddressValue(coordinates.lat, coordinates.lng)
  });
}

setCoordinateValue()

const createPopups = (ads) => {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  })

  ads.forEach((element) => {
    const marker = L.marker({
      lat: element.location.lat,
      lng: element.location.lng,
    }, {
      icon,
    });
    marker
      .addTo(map)
      .bindPopup(createAdPopup(element));
  });
}

const resetMap = () => {
  map.panTo(new L.LatLng(TOKIO_COORDINATES_CENTER.lat, TOKIO_COORDINATES_CENTER.lng));
  mainMarker.setLatLng(L.latLng(TOKIO_COORDINATES_CENTER.lat, TOKIO_COORDINATES_CENTER.lng));
  setAddressValue(TOKIO_COORDINATES_CENTER.lat, TOKIO_COORDINATES_CENTER.lng);
}

export {
  map,
  createPopups,
  TOKIO_COORDINATES,
  mainMarker,
  TOKIO_COORDINATES_CENTER,
  setCoordinateValue,
  resetMap
};
