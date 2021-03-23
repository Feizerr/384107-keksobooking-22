const MESSAGE_PARAMETERS = {
  'color': 'red',
  'index': 100,
  'position': 'absolute',
  'positionInPx': 0,
  'paddings': '10px 5px',
  'fontSize': '30px',
  'textAlign': 'center',
}
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
  alertContainer.style.zIndex = MESSAGE_PARAMETERS.index;
  alertContainer.style.position = MESSAGE_PARAMETERS.position;
  alertContainer.style.left = MESSAGE_PARAMETERS.positionInPx;
  alertContainer.style.top = MESSAGE_PARAMETERS.positionInPx;
  alertContainer.style.right = MESSAGE_PARAMETERS.positionInPx;
  alertContainer.style.padding = MESSAGE_PARAMETERS.paddings;
  alertContainer.style.fontSize = MESSAGE_PARAMETERS.fontSize;
  alertContainer.style.textAlign = MESSAGE_PARAMETERS.textAlign;
  alertContainer.style.backgroundColor = MESSAGE_PARAMETERS.color;
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
