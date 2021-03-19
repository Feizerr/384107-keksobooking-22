const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__user-pic');
const photoOfHouseChooser = document.querySelector('#images');
const wrapperForPhoto = document.querySelector('.ad-form__photo');

const createPhoto = () => {
  const photoOfHousePreview = document.createElement('img');
  photoOfHousePreview.classList.add('ad-form__picture');
  wrapperForPhoto.appendChild(photoOfHousePreview);
  return photoOfHousePreview;
}


const addAvatar = (inputFile, preview) => {
  const file = inputFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  };
};

avatarChooser.addEventListener('change', () => {
  addAvatar(avatarChooser, avatarPreview);
});

photoOfHouseChooser.addEventListener('change', () => {
  createPhoto();
  const photo = document.querySelector('.ad-form__picture');

  addAvatar(photoOfHouseChooser, photo);
});
