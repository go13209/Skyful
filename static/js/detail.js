document.addEventListener("DOMContentLoaded", function () {
  const updateButtons = document.querySelectorAll(".comment-update-button");

  updateButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const updateFormBox = document.querySelector(".update-comment-form-box")
      updateFormBox.style.display = "block";
    });
  });
});
