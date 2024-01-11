function previewImage(input) {
  const postImagePreview = document.querySelector(".Preview");
  if (input.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      postImagePreview.src = e.target.result;
      postImagePreview.style.display = "block";
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    postImagePreview.style.display = "none";
    postImagePreview.src = "";
  }
}

window.onload = function () {
  const postImagePreview = document.querySelector(".Preview");
  postImagePreview.style.display = "none";
  postImagePreview.src = "";
};
