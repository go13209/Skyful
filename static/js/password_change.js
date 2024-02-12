function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
}

document.addEventListener("DOMContentLoaded", function () {
  const oldPasswordInput = document.getElementById("id_old_password");
  const password1Input = document.getElementById("id_new_password1");
  const password2Input = document.getElementById("id_new_password2");
  const validationMessageElement = document.getElementById(
    "passwordValidationMessage"
  );
  const mismatchMessageElement = document.getElementById(
    "passwordMismatchMessage"
  );
  const passwordUpdateButton = document.getElementById(
    "password-update-button"
  );

  // 모든 유효성 검사를 실행
  async function validateAll() {
    const isPasswordValid = await validatePasswordInput();
    const isPasswordMatch = checkPasswordMatch();

    // 모든 조건을 만족하면 버튼을 활성화
    if (isPasswordValid && isPasswordMatch) {
      passwordUpdateButton.removeAttribute("disabled");
    } else {
      passwordUpdateButton.setAttribute("disabled", true);
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

  // 새 비밀번호, 비밀번호 확인 일치 검사
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
      oldPasswordInput.value.trim() !== "" &&
      password1Input.value.trim() !== "" &&
      password2Input.value.trim() !== ""
    );
  }

  oldPasswordInput.addEventListener("input", () => {
    if (allInputsFilled()) {
      validateAll();
    } else {
      passwordUpdateButton.setAttribute("disabled", true);
    }
  });

  password1Input.addEventListener("input", () => {
    validatePasswordInput();
    if (allInputsFilled()) {
      validateAll();
    } else {
      passwordUpdateButton.setAttribute("disabled", true);
    }
  });

  password2Input.addEventListener("input", () => {
    checkPasswordMatch();
    if (allInputsFilled()) {
      validateAll();
    } else {
      passwordUpdateButton.setAttribute("disabled", true);
    }
  });

  password2Input.addEventListener("blur", () => {
    validateAll();
  });
});
