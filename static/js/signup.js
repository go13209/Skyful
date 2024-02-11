const profileImagePreview = document.querySelector(".preview");

function previewImage(input) {
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

function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
}

document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("id_username");
  const nicknameInput = document.getElementById("id_nickname");
  const password1Input = document.getElementById("id_password1");
  const password2Input = document.getElementById("id_password2");
  const usernameLengthCount = document.getElementById("username-length-count");
  const nicknameLengthCount = document.getElementById("nickname-length-count");
  const usernameMessageElement = document.getElementById("username-message");
  const nicknameMessageElement = document.getElementById("nickname-message");
  const validationMessageElement = document.getElementById(
    "passwordValidationMessage"
  );
  const mismatchMessageElement = document.getElementById(
    "passwordMismatchMessage"
  );
  const signUpButton = document.getElementById("signup-button");

  profileImagePreview.style.display = "none";
  profileImagePreview.src = "";

  // 중복 검사
  async function checkDuplicate(input, type, messageElement) {
    const value = input.value.trim();

    if (value === "") {
      messageElement.textContent = "";
      return false;
    }

    const formData = new FormData();
    formData.append(type, value);

    const response = await fetch("/accounts/check_duplicate/", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data[type].exists) {
      messageElement.innerHTML = `(${data[type].message})`;
      messageElement.style.color = "red";
      return false;
    } else {
      messageElement.textContent = "";
      return true;
    }
  }

  // 모든 유효성 검사를 실행
  async function validateAll() {
    const isUsernameValid =
      (await checkDuplicate(
        usernameInput,
        "username",
        usernameMessageElement
      )) && checkLength(usernameInput, usernameLengthCount);
    const isNicknameValid =
      (await checkDuplicate(
        nicknameInput,
        "nickname",
        nicknameMessageElement
      )) && checkLength(nicknameInput, nicknameLengthCount);
    const isPasswordValid = await validatePasswordInput();
    const isPasswordMatch = checkPasswordMatch();

    // 모든 조건을 만족하면 버튼을 활성화
    if (
      isUsernameValid &&
      isNicknameValid &&
      isPasswordValid &&
      isPasswordMatch
    ) {
      signUpButton.removeAttribute("disabled");
    } else {
      signUpButton.setAttribute("disabled", true);
    }
  }

  // 아이디, 닉네임 길이 검사
  function checkLength(input, lengthCount) {
    const length = input.value.length;

    if (length <= 20) {
      lengthCount.textContent = `(${length}/20)`;
      lengthCount.style.color = "grey";
      return true;
    } else {
      lengthCount.textContent = `(${length}/20)`;
      lengthCount.style.color = "red";
      return false;
    }
  }

  // 비밀번호 유효성 검사
  async function validatePasswordInput() {
    const password = password1Input.value;

    if (!validatePassword(password)) {
      // 비밀번호가 유효하지 않을 경우 사용자에게 알려줌
      validationMessageElement.textContent =
        "(비밀번호는 최소 8자 이상의 길이로, 알파벳, 숫자, 특수문자(@$!%*#?&)를 포함해야 합니다.)";
      validationMessageElement.style.color = "red";
      return false;
    } else {
      validationMessageElement.textContent = "";
      return true;
    }
  }

  // 비밀번호, 비밀번호 입력 일치 검사
  function checkPasswordMatch() {
    const password1 = password1Input.value;
    const password2 = password2Input.value;

    if (password1 !== password2) {
      mismatchMessageElement.innerHTML = "(비밀번호가 일치하지 않습니다.)";
      mismatchMessageElement.style.color = "red";
      return false;
    } else {
      mismatchMessageElement.textContent = "";
      return true;
    }
  }

  function allInputsFilled() {
    return (
      usernameInput.value.trim() !== "" &&
      nicknameInput.value.trim() !== "" &&
      password1Input.value.trim() !== "" &&
      password2Input.value.trim() !== ""
    );
  }

  // 이벤트 리스너
  usernameInput.addEventListener("blur", () => {
    checkDuplicate(usernameInput, "username", usernameMessageElement);
    checkLength(usernameInput, usernameLengthCount);
    if (allInputsFilled()) {
      validateAll();
    } else {
      signUpButton.setAttribute("disabled", true);
    }
  });

  nicknameInput.addEventListener("blur", () => {
    checkDuplicate(nicknameInput, "nickname", nicknameMessageElement);
    checkLength(nicknameInput, nicknameLengthCount);
    if (allInputsFilled()) {
      validateAll();
    } else {
      signUpButton.setAttribute("disabled", true);
    }
  });

  usernameInput.addEventListener("input", () => {
    checkLength(usernameInput, usernameLengthCount);
    if (allInputsFilled()) {
      validateAll();
    } else {
      signUpButton.setAttribute("disabled", true);
    }
  });

  nicknameInput.addEventListener("input", () => {
    checkLength(nicknameInput, nicknameLengthCount);
    if (allInputsFilled()) {
      validateAll();
    } else {
      signUpButton.setAttribute("disabled", true);
    }
  });

  password1Input.addEventListener("input", () => {
    validatePasswordInput();
    if (allInputsFilled()) {
      validateAll();
    } else {
      signUpButton.setAttribute("disabled", true);
    }
  });

  password2Input.addEventListener("input", () => {
    checkPasswordMatch();
    if (allInputsFilled()) {
      validateAll();
    } else {
      signUpButton.setAttribute("disabled", true);
    }
  });

  password2Input.addEventListener("blur", () => {
    validateAll();
  });
});
