document.addEventListener("DOMContentLoaded", function () {
  const password1Input = document.getElementById("id_new_password1");
  const password2Input = document.getElementById("id_new_password2");
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
