const ALERT_SHOW_TIME = 6000;

const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0) {
    throw Error('Ошибка. Пожалуйста, введите число от 0 и больше');
  }

  if (min >= max) {
    throw Error('Ошибка. Пожалуйста, введите другое значение. Минимальное число должно быть меньше максимального');
  }
  return Math.trunc(Math.random() * (max - min + 1) + min);
};

const getRandomFloatNumber = (min, max, floatLength) => {
  if (min < 0 || max < 0) {
    throw Error('Ошибка. Пожалуйста, введите число от 0 и больше');
  }

  if (min >= max) {
    throw Error('Ошибка. Пожалуйста, введите другое значение. Минимальное число должно быть меньше максимального');
  }
  return Number((Math.random() * (max - min) + min).toFixed(floatLength));
};

const chooseRandomElement = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

const createRandomArray = (array) => {
  const quantityElements = getRandomNumber(0, array.length - 1);
  const newArray = [];

  for (let i = 0; i <= quantityElements; i++) {
    const getRandomArrayElement = array[getRandomNumber(0, array.length - 1)];
    newArray.push(getRandomArrayElement);
  }
  return newArray;
};

const mixArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const getRamdomObjectValue = (object) => {
  const arrayObjectKeys = Object.keys(object);
  const randomKey = chooseRandomElement(arrayObjectKeys);
  const keyValue = object[randomKey];
  return keyValue
};

const numWord = (value, words) => {
  value = Math.abs(value) % 100;
  let num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
};

const showErrorMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 5px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export {
  getRandomNumber,
  getRandomFloatNumber,
  chooseRandomElement,
  createRandomArray,
  mixArray,
  getRamdomObjectValue,
  numWord,
  showErrorMessage
};
