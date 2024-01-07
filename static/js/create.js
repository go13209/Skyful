document
  .querySelectorAll('.image-container input[type="file"]')
  .forEach(function (imageInput) {
    imageInput.style.display = "none";
    imageInput.addEventListener("change", function () {
      previewImage(this);
    });
  });

function previewImage(input) {
  const previewImage = input.parentElement.querySelector(".postImage");

  if (input.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    previewImage.style.display = "block";
    previewImage.src = "/static/img/add-image.png";
  }
}
