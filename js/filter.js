

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
const MIDDLE_PRICE = {
  min: 10000,
  max: 50000
}


const filter = document.querySelector('.map__filters');
const filterElements = filter.querySelectorAll('select, fieldset');

const housingType = filter.querySelector('#housing-type');
const housingPrice = filter.querySelector('#housing-price');
console.log(housingPrice);
const housingRooms = filter.querySelector('#housing-rooms');
const housingGuests = filter.querySelector('#housing-guests');
const housingFeatures = filter.querySelector('#housing-features');

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

// //Фильтрация по типу дома

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

const changeOfHousingPrice = (ad, inputValue) => {
  const priceOfHouse = ad.offer.price;

  if ( inputValue === 'low') {
    return ad.offer.price <= LOW_PRICE;
  } else if (inputValue === 'middle') {
    return ad.offer.price >= MIDDLE_PRICE.min && ad.offer.price <= MIDDLE_PRICE.max;
  } else if (inputValue === 'high') {
    return ad.offer.price >= HIGH_PRICE;
  } else if (inputValue === ANY_FILTER_VALUE) {
    return true
  }
}

housingPrice.addEventListener('change', () => {
  const priceValue = housingPrice.value

  //Создается переменная, которая содержит массив, полученный в результате применения фильтра к исходному (определенному ранее массиву)

  const filteredArray =
    window.offers
      .filter(ad => {
        if(changeOfHousingPrice(ad, priceValue)) {
          return true
        } else {
          return false
        }
      })

    updateMarkers(filteredArray);
})

//Фильтрация по комнатам
housingRooms.addEventListener('change', (evt) => {
  const selectedQuantityRooms = evt.target.value;
  const filteredArray =
    window.offers
      .filter(offer => {
        const housingRoomsCondition = selectedQuantityRooms === ANY_FILTER_VALUE || offer.offer.rooms === Number(selectedQuantityRooms);
        return housingRoomsCondition;
      });
  updateMarkers(filteredArray);

});

//Фильтрация по количеству гостей
housingGuests.addEventListener('change', (evt) => {
  const selectedQuantityGuests = evt.target.value;
  const filteredArray =
    window.offers
      .filter(offer => {
        const housingGuestsCondition = selectedQuantityGuests === ANY_FILTER_VALUE || offer.offer.guests === Number(selectedQuantityGuests);
        return housingGuestsCondition;
      });
  updateMarkers(filteredArray);
});

// housingPrice.addEventListener('change', (evt) => {
//   const selectedQuantityPrice = evt.target.value;
//   const filteredArray =
//     window.offers
//       .filter(offer => {
//         const housingPriceCondition = selectedQuantityPrice === ANY_FILTER_VALUE || (offer.offer.price >= 10000 && offer.offer.price < 50000) || (offer.offer.price < 10000) ||
//         return housingGuestsCondition;
//       });
//   updateMarkers(filteredArray);
// });




//Фильтрация по стоимости
// housingPrice.addEventListener('change', (evt) => {
//   const selectedQuantityPrice = evt.target.value;

//   if (evt.target.value === 'middle') {
//   const filteredArray =
//     window.offers
//       .filter(offer => {
//         const housingPriceCondition = selectedQuantityPrice === ANY_FILTER_VALUE || (offer.offer.price >= 10000 && offer.offer.price < 50000);
//         return housingPriceCondition;
//       });
//       updateMarkers(filteredArray);
//     } else if (evt.target.value === 'low') {
//       const filteredArray =
//       window.offers
//         .filter(offer => {
//           const housingPriceCondition = selectedQuantityPrice === ANY_FILTER_VALUE || offer.offer.price < 10000;
//           return housingPriceCondition;
//         });
//       updateMarkers(filteredArray);
//   } else if (evt.target.value === 'high') {
//       const filteredArray =
//       window.offers
//         .filter(offer => {
//          const housingPriceCondition = selectedQuantityPrice === ANY_FILTER_VALUE || offer.offer.price >50000;
//           return housingPriceCondition;
//         });
//       updateMarkers(filteredArray);
//     }
// })



// housingPrice.addEventListener('change', (evt) => {
//   const selectedQuantityPrice = evt.target.value;
//   const filteredArray =
//     window.offers
//       .filter(offer => {
//         const housingPriceCondition = (evt.target.value < 'middle') ? selectedQuantityPrice === ANY_FILTER_VALUE || (offer.offer.price >= 10000 && offer.offer.price < 50000) :
//         (evt.target.value === 'low') ? selectedQuantityPrice === ANY_FILTER_VALUE || offer.offer.price < 10000 :
//         selectedQuantityPrice === ANY_FILTER_VALUE || offer.offer.price >50000;
//         return housingPriceCondition;
//         });
//       updateMarkers(filteredArray);
// })






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
