const templateSuccessPopup = document.querySelector('#success').content.querySelector('.success');
const templateErrorPopup = document.querySelector('#error').content.querySelector('.error');
const page = document.querySelector('main');

const addEventListenerToPopup = (popup) => {
  popup.addEventListener('click', () => {
    popup.remove();
  });
};

const addEventListenerToDocument = (popup) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      popup.remove();
    }
  }, {once: true});
};

const removeEventListenerToDocument = (popup) => {
  document.removeEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      popup.remove();
    }
  });
}

const showPopup = (popupTemplate) => {
  page.append(popupTemplate.cloneNode(true));

  const popup = document.querySelector('.alert-popup');

  if (popup) {
    addEventListenerToPopup(popup);
    addEventListenerToDocument(popup);
  }

  popup.removeEventListener('click', addEventListenerToPopup);
  removeEventListenerToDocument();
};


// const showPopup = (popupTemplate) => {
//   page.append(popupTemplate.cloneNode(true));

//   const popup = document.querySelector('.alert-popup');

//   if (popup) {
//     document.addEventListener('keydown', (evt) => {
//       if (evt.keyCode === 27) {
//         popup.remove();
//       }
//     }, {once: true});

//     popup.addEventListener('click', () => {
//       popup.remove();
//     });
//   }
//   document.removeEventListener('keydown', );
// };

export {
  showPopup,
  templateSuccessPopup,
  templateErrorPopup
}
