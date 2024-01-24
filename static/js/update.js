const profileInput = document.querySelector('input[type="file"]');
const profilePreview_1 = document.querySelector(".preview-1");
const profilePreview_2 = document.querySelector(".preview-2");

// 페이지 로드 시 프로필 이미지 가져오기
window.onload = function () {
  // 프로필 이미지가 설정되어 있는 경우
  if (profilePreview_1 && profilePreview_1.src) {
    profilePreview_1.style.display = "block";
  } else {
    profilePreview_2.style.display = "none";
  }
};

profileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  if (file) {
    reader.onload = function (e) {
      if (profilePreview_1) {
        profilePreview_1.src = e.target.result;
        profilePreview_1.style.display = "block";
      } else {
        profilePreview_2.src = e.target.result;
        profilePreview_2.style.display = "block";
      }
    };

    reader.readAsDataURL(file);
  } else {
    // 파일이 선택되지 않거나 취소된 경우 미리보기 이미지 숨기기
    if (profilePreview_1) {
      profilePreview_1.style.display = "none";
    } else {
      profilePreview_2.style.display = "none";
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const nicknameInput = document.getElementById("id_nickname");
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
        if (messageElement) {
          if (data[type].exists) {
            messageElement.innerHTML = `<i class="fa-regular fa-circle-xmark"></i> ${data[type].message}`;
            messageElement.style.color = "red";
          } else {
            messageElement.textContent = "";
          }
        }
      });
  }

  nicknameInput.addEventListener("blur", function () {
    checkDuplicate(nicknameInput, "nickname", nicknameMessageElement);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const nicknameInput = document.getElementById("id_nickname");
  const lengthCount = document.getElementById("length_count");

  function checkLength() {
    const nicknameLength = nicknameInput.value.length;

    if (nicknameLength <= 20) {
      lengthCount.textContent = `(${nicknameLength}/20)`;
      lengthCount.style.color = "grey";
    } else {
      lengthCount.textContent = `(${nicknameLength}/20)`;
      lengthCount.style.color = "red";
    }
  }

  nicknameInput.addEventListener("input", checkLength);
});