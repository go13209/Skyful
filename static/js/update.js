const profileInput = document.querySelector('input[type="file"]');
const profilePreview_1 = document.querySelector(".preview-1");
const profilePreview_2 = document.querySelector(".preview-2");
const nicknameInput = document.getElementById("id_nickname");
const nicknameMessageElement = document.getElementById("nickname-message");
const lengthCount = document.getElementById("length_count");
const updateButton = document.getElementById("update-button");

// 페이지 로드 시 실행되는 함수
window.onload = function () {
  displayProfilePreview();
};

// 프로필 이미지 미리보기 관련 함수
function displayProfilePreview() {
  if (profilePreview_1 && profilePreview_1.src) {
    profilePreview_1.style.display = "block";
  } else {
    profilePreview_2.style.display = "none";
  }
}

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
    hideProfilePreview();
  }
});

// 프로필 이미지 숨기는 함수
function hideProfilePreview() {
  if (profilePreview_1) {
    profilePreview_1.style.display = "none";
  } else {
    profilePreview_2.style.display = "none";
  }
}

// 닉네임 중복 확인 함수
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
      if (messageElement) {
        if (data[type].exists) {
          messageElement.innerHTML = `(${data[type].message})`;
          messageElement.style.color = "red";
          updateButton.disabled = true;
        } else {
          messageElement.textContent = "";
          checkEmptyNickname();
        }
      }
    });
}

// 닉네임 길이 체크 함수
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

// 닉네임 입력칸이 비어있을 때 버튼 비활성화
function checkEmptyNickname() {
  const nickname = nicknameInput.value.trim();

  if (nickname === "") {
    updateButton.disabled = true;
  } else {
    updateButton.disabled = false;
  }
}

// 닉네임 입력칸이 변경될 때마다 실행되는 함수
function checkNicknameValidity() {
  const enteredNickname = nicknameInput.value.trim();

  if (enteredNickname !== currentUserNickname) {
    checkDuplicate(nicknameInput, "nickname", nicknameMessageElement);
  } else {
    checkEmptyNickname();
  }
}

// 이벤트 리스너 등록
nicknameInput.addEventListener("blur", checkNicknameValidity);
nicknameInput.addEventListener("input", checkEmptyNickname);
