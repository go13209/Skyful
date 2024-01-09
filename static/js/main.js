const calendarDays = document.getElementById("calendarDays");
const currentMonthElement = document.getElementById("currentMonth");
const monthDropdown = document.getElementById("month");
const yearDropdown = document.getElementById("year");

function updateCalendar() {
  const selectedMonth = parseInt(monthDropdown.value, 10);
  const selectedYear = parseInt(yearDropdown.value, 10);
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1).getDay();

  calendarDays.innerHTML = "";
  currentMonthElement.textContent = `${selectedYear}년 ${selectedMonth}월`;

  // 요일 표시
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  // 일요일부터 토요일까지 요일을 표시
  for (let i = 0; i < 7; i++) {
    const dayHeader = document.createElement("div");
    dayHeader.classList.add("day");
    dayHeader.textContent = daysOfWeek[i];
    calendarDays.appendChild(dayHeader);
  }

  // 날짜 표시
  for (let i = 1; i <= daysInMonth + firstDayOfMonth; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");

    if (i > firstDayOfMonth && i <= daysInMonth + firstDayOfMonth) {
      const dayNumber = i - firstDayOfMonth;
      dayElement.textContent = dayNumber;

      const date = new Date(selectedYear, selectedMonth - 1, dayNumber);
      const dayOfWeek = date.getDay();

      if (dayOfWeek === 6) {
        // 토요일
        dayElement.classList.add("saturday");
      } else if (dayOfWeek === 0) {
        // 일요일
        dayElement.classList.add("sunday");
      }

      // 해당 날짜에 포스트가 있는지 확인하고 처리하는 함수
      const diaryDate = `${selectedYear}-${selectedMonth}-${dayNumber}`;
      checkPostAndHandleStyles(dayElement, userPk, diaryDate);
    }

    calendarDays.appendChild(dayElement);
  }
}

// 해당 날짜에 포스트가 있는지 확인하고 스타일을 적용하는 함수
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

function populateDropdowns() {
  const currentYear = new Date().getFullYear();
  const yearsRange = 5; // 앞뒤 5년까지 표시

  for (let i = -yearsRange; i <= yearsRange; i++) {
    const option = document.createElement("option");
    option.value = (currentYear + i).toString();
    option.textContent = (currentYear + i).toString();
    yearDropdown.appendChild(option);
  }

  for (let i = 1; i <= 12; i++) {
    const option = document.createElement("option");
    option.value = i.toString();
    option.textContent = i.toString() + "월";
    monthDropdown.appendChild(option);
  }

  // 초기 로딩 시 기본으로 현재 날짜의 달력 표시
  const currentMonth = new Date().getMonth() + 1;
  const currentYearValue = new Date().getFullYear().toString();
  monthDropdown.value = currentMonth.toString();
  yearDropdown.value = currentYearValue;
}

// 초기 로딩 시 달력 업데이트 및 드롭다운 메뉴 채우기
populateDropdowns();
updateCalendar();
