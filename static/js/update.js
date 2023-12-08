const profileInput = document.querySelector('input[type="file"]');
const profilePreview_1 = document.querySelector(".Preview_1");
const profilePreview_2 = document.querySelector(".Preview_2");

// 페이지 로드 시 프로필 이미지 가져오기
window.onload = function () {
  // 프로필 이미지가 설정되어 있는 경우
  if (profilePreview_1) {
    profilePreview_1.style.display = "block";
  } else {
    profilePreview_2.style.display = "none";
  }
};

profileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

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
});
