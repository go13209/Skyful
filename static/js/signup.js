function previewImage(input) {
  const profileImagePreview = document.querySelector('.preview');
  if (input.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImagePreview.src = e.target.result;
      profileImagePreview.style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    profileImagePreview.style.display = 'none';
    profileImagePreview.src = '';
  }
}

window.onload = function () {
  const profileImagePreview = document.querySelector('.preview');
  profileImagePreview.style.display = 'none';
  profileImagePreview.src = '';
};