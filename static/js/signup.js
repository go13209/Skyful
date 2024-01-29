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
      .then((response) => response.json())
      .then((data) => {
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

document.addEventListener("DOMContentLoaded", function () {
  const password1Input = document.getElementById("id_password1");
  const password2Input = document.getElementById("id_password2");
  const mismatchMessageElement = document.getElementById(
    "passwordMismatchMessage"
  );

  function checkPasswordMatch() {
    const password1 = password1Input.value;
    const password2 = password2Input.value;

    if (password1 !== password2) {
      mismatchMessageElement.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> 두 비밀번호가 일치하지 않습니다.`;
      mismatchMessageElement.style.color = "red";
    } else {
      mismatchMessageElement.textContent = "";
    }
  }

  password1Input.addEventListener("input", checkPasswordMatch);
  password2Input.addEventListener("input", checkPasswordMatch);
});

document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("id_username");
  const usernameLengthCount = document.getElementById("username-length-count");
  const nicknameInput = document.getElementById("id_nickname");
  const nicknameLengthCount = document.getElementById("nickname-length-count");

  function usernameCheckLength() {
    const usernameLength = usernameInput.value.length;

    if (usernameLength <= 20) {
      usernameLengthCount.textContent = `(${usernameLength}/20)`;
      usernameLengthCount.style.color = "grey";
    } else {
      usernameLengthCount.textContent = `(${usernameLength}/20)`;
      usernameLengthCount.style.color = "red";
    }
  }

  function nicknameCheckLength() {
    const nicknameLength = nicknameInput.value.length;

    if (nicknameLength <= 20) {
      nicknameLengthCount.textContent = `(${nicknameLength}/20)`;
      nicknameLengthCount.style.color = "grey";
    } else {
      nicknameLengthCount.textContent = `(${nicknameLength}/20)`;
      nicknameLengthCount.style.color = "red";
    }
  }
  usernameInput.addEventListener("input", usernameCheckLength);
  nicknameInput.addEventListener("input", nicknameCheckLength);
});
