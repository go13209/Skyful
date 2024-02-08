function updateCalendar() {
  const selectedMonth = parseInt(document.getElementById("month").value, 10);
  const selectedYear = parseInt(document.getElementById("year").value, 10);
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1).getDay();

  const calendarDays = document.getElementById("calendarDays");
  calendarDays.innerHTML = "";

  const currentMonthElement = document.getElementById("currentMonth");
  currentMonthElement.textContent = `${selectedYear}년 ${selectedMonth}월`;

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  // 요일 추가
  for (let i = 0; i < 7; i++) {
    const dayHeader = document.createElement("div");
    dayHeader.classList.add("day", "day-of-week");
    dayHeader.textContent = daysOfWeek[i];
    calendarDays.appendChild(dayHeader);
  }

  // 첫째 날짜가 몇 번째 요일인지에 따라 빈 칸 채우기
  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyDayElement = document.createElement("div");
    emptyDayElement.classList.add("day", "empty");
    calendarDays.appendChild(emptyDayElement);
  }

  // 해당 월의 날짜 추가
  for (let i = 1; i <= daysInMonth; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = i;

    const formattedDate = `${selectedYear}-${selectedMonth}-${i
      .toString()
      .padStart(2, "0")}`;
    checkPostAndHandleStyles(dayElement, userPk, formattedDate);
    calendarDays.appendChild(dayElement);
  }
}

function checkPostAndHandleStyles(dayElement, userPk, post_date) {
  const emptyCloudImageUrl = "../../static/img/empty_cloud.png";
  const cloudImageUrl = "../../static/img/cloud.png";

  fetch(`/posts/check_post/${post_date}/`)
    .then((response) => response.json())
    .then((data) => {
      if (data.has_post) {
        // 포스트가 있으면 구름 이미지 설정
        dayElement.style.backgroundImage = `url(${cloudImageUrl})`;
      } else {
        // 포스트가 없으면 빈 구름 이미지 설정
        dayElement.style.backgroundImage = `url(${emptyCloudImageUrl})`;
      }

      // 스타일 공통 설정
      dayElement.style.backgroundRepeat = "no-repeat";
      dayElement.style.backgroundPosition = "center";
      dayElement.style.backgroundSize = "contain";

      // 클릭 이벤트 설정
      dayElement.addEventListener("click", () => {
        if (data.has_post) {
          window.location.href = `/posts/detail/${userPk}/${post_date}/`;
        } else {
          window.location.href = `/posts/create/${post_date}/`;
        }
      });
    })
    .catch((error) => console.error("Error:", error));
}

// 초기 로딩 시 달력 업데이트
updateCalendar();
