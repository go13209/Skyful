const markAsReadButtons = document.querySelectorAll(".mark-as-read-btn");
const notificationContainer = document.querySelector(".dropdown-menu");

function markAsRead(event) {
  event.preventDefault();
  const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
  const button = event.target.closest("button");
  const notificationId = button.dataset.notificationId;
  const notificationItem = button.closest("li");
  const notificationIcon = document.querySelector(".dropdown-toggle");

  fetch(`/accounts/mark_as_read/${notificationId}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        notificationItem.style.display = "none";
        if (data.unread_count < 1) {
          notificationIcon.innerHTML = `<i class="fa-regular fa-bell"></i>`;
          notificationContainer.innerHTML =
            "<li><div>새로운 알림이 없습니다.</div></li>";
        }
      }
    });
}

document.addEventListener("DOMContentLoaded", function () {
  markAsReadButtons.forEach((button) => {
    button.addEventListener("click", markAsRead);
  });
});
