const postInput = document.querySelector('input[type="file"]');
const postPreview_1 = document.querySelector(".preview-1");
const postPreview_2 = document.querySelector(".preview-2");
const publicCheckbox = document.getElementById("public");
const friendCheck = document.querySelector(".friend-check");

// 페이지 로드 시 이미지 미리보기 초기화
window.onload = function () {
  updateImagePreview();
  updateFriendCheckDisplay();
};

// 이미지 미리보기 업데이트 함수
function updateImagePreview() {
  // 프로필 이미지가 설정되어 있는 경우
  if (postPreview_1 && postPreview_1.src) {
    postPreview_1.style.display = "block";
  } else {
    postPreview_2.style.display = "none";
  }
}

// 체크박스 스타일 업데이트 함수
function updateFriendCheckDisplay() {
  if (publicCheckbox.checked) {
    friendCheck.style.display = "block";
  } else {
    friendCheck.style.display = "none";
  }
}

postInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  if (file) {
    reader.onload = function (e) {
      if (postPreview_1) {
        postPreview_1.src = e.target.result;
        postPreview_1.style.display = "block";
      } else {
        postPreview_2.src = e.target.result;
        postPreview_2.style.display = "block";
      }
    };

    reader.readAsDataURL(file);
  } else {
    // 파일이 선택되지 않거나 취소된 경우 미리보기 이미지 숨기기
    if (postPreview_1) {
      postPreview_1.style.display = "none";
    } else {
      postPreview_2.style.display = "none";
    }
  }
});

publicCheckbox.addEventListener("change", updateFriendCheckDisplay);
