const templateSuccessPopup = document.querySelector('#success').content.querySelector('.success');
const templateErrorPopup = document.querySelector('#error').content.querySelector('.error');
const page = document.querySelector('main');

const onDocumentKeydown = (evt) => {
  if (evt.keyCode === 27) {
    const popup = document.querySelector('.alert-popup');
    popup.remove();
  }

  document.removeEventListener(onDocumentKeydown);
};

const showPopup = (popupTemplate) => {
  page.append(popupTemplate.cloneNode(true));

  const popup = document.querySelector('.alert-popup');

  if (popup) {
    document.addEventListener('keydown', onDocumentKeydown);

    popup.addEventListener('click', () => {
      popup.remove();
    });
  }
};

export {
  showPopup,
  templateSuccessPopup,
  templateErrorPopup
}
