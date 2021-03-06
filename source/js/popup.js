const templateSuccessPopup = document.querySelector('#success').content.querySelector('.success');
const templateErrorPopup = document.querySelector('#error').content.querySelector('.error');
const page = document.querySelector('main');

const onDocumentKeydown = (evt) => {
  if (evt.keyCode === 27) {
    const popup = document.querySelector('.alert-popup');
    popup.remove();
  }

  document.removeEventListener('keydown', onDocumentKeydown);
};

const onPopupClickHandler = () => {
  const popup = document.querySelector('.alert-popup');
  popup.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  popup.removeEventListener('click', onPopupClickHandler);
};

const showPopup = (popupTemplate) => {
  page.append(popupTemplate.cloneNode(true));
  const popup = document.querySelector('.alert-popup');

  if (popup) {
    document.addEventListener('keydown', onDocumentKeydown);
    popup.addEventListener('click', onPopupClickHandler);
  }
};

export {
  showPopup,
  templateSuccessPopup,
  templateErrorPopup
}
