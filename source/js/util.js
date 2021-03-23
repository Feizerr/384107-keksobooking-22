const ALERT_SHOW_TIME = 6000;

const getNumWord = (value, words) => {
  value = Math.abs(value) % 100;
  let num = value % 10;
  if (value > 10 && value < 20) {
    return words[2]
  } else if (num > 1 && num < 5) {
    return words[1];
  } else if (Number(num) === 1) {
    return words[0];
  } else {
    return words[2];
  }
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

const disableFormElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = true;
  });
};

const enableFormElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = false;
  });
};

export {
  getNumWord,
  showErrorMessage,
  disableFormElements,
  enableFormElements
};
