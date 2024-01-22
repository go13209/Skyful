function previewImage(input) {
  const profileImagePreview = document.querySelector(".preview");
  if (input.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImagePreview.src = e.target.result;
      profileImagePreview.style.display = "block";
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    profileImagePreview.style.display = "none";
    profileImagePreview.src = "";
  }
}

window.onload = function () {
  const profileImagePreview = document.querySelector(".preview");
  profileImagePreview.style.display = "none";
  profileImagePreview.src = "";
};

document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("id_username");
  const nicknameInput = document.getElementById("id_nickname");
  const usernameMessageElement = document.getElementById("username-message");
  const nicknameMessageElement = document.getElementById("nickname-message");

  function checkDuplicate(input, type, messageElement) {
    const value = input.value.trim();

    if (value === "") {
      messageElement.textContent = "";
      return;
    }

    const formData = new FormData();
    formData.append(type, value);

    fetch("/accounts/check_duplicate/", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data[type].exists) {
          messageElement.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> ${data[type].message}`;
          messageElement.style.color = "red";
        } else {
          messageElement.textContent = "";
        }
      });
  }

  usernameInput.addEventListener("blur", function () {
    checkDuplicate(usernameInput, "username", usernameMessageElement);
  });

  nicknameInput.addEventListener("blur", function () {
    checkDuplicate(nicknameInput, "nickname", nicknameMessageElement);
  });
});
