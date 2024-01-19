document.addEventListener('DOMContentLoaded', function () {
  const sharedPostButton = document.getElementById('sharedPostButton');
  const commentButton = document.getElementById('commentButton');
  const findFriendButton = document.getElementById('findFriendButton');

  const content1 = document.querySelector('.content-1');
  const content2 = document.querySelector('.content-2');
  const content3 = document.querySelector('.content-3');

  content1.style.display = 'block';
  content2.style.display = 'none';
  content3.style.display = 'none';

  sharedPostButton.addEventListener('click', function () {
    content1.style.display = 'block';
    content2.style.display = 'none';
    content3.style.display = 'none';
  });

  commentButton.addEventListener('click', function () {
    content1.style.display = 'none';
    content2.style.display = 'block';
    content3.style.display = 'none';
  });

  findFriendButton.addEventListener('click', function () {
    content1.style.display = 'none';
    content2.style.display = 'none';
    content3.style.display = 'block';
  });
});

function searchFriends() {
  const searchInput = encodeURIComponent(document.getElementById("friendSearchInput").value);

  const url = `/accounts/search_friends/${searchInput}/`;
  fetch(url)
    .then(response => response.json())
    .then(data => displaySearchResults(data));
}

function displaySearchResults(results) {
  const resultsContainer = document.getElementById("friendSearchResults");
  resultsContainer.innerHTML = "";

  if (results.length > 0) {
    results.forEach((friend, index) => {
      const friendBox = document.createElement("div");
      friendBox.className = "friend-box";
      const isFollowing = friend.is_following;

      friendBox.innerHTML = `
        <div class="friend-info-box flex-grow-1">
          <img src="${friend.profile_img || '/static/img/user.png'}" alt="프로필 이미지">
          <span>${friend.nickname}(${friend.username})</span>
        </div>
        <form id="followForm${friend.pk}" action="/accounts/follow/${friend.pk}/" method="POST">
          <input type="hidden" name="csrfmiddlewaretoken" value="${getCookie("csrftoken")}">
          <button type="button" onclick="toggleFollow(${friend.pk})">${isFollowing ? '팔로우 취소' : '팔로우'}</button>
        </form>
      `;
      
      resultsContainer.appendChild(friendBox);
      
      if (index < results.length - 1) {
        const brTag = document.createElement("br");
        resultsContainer.appendChild(brTag);
      }
    });
  } else {
    resultsContainer.innerHTML = "<p>검색 결과가 없습니다.</p>";
  }
}

function toggleFollow(userId) {
  const followForm = document.getElementById("followForm" + userId);
  const url = followForm.getAttribute("action");

  fetch(url, { method: "POST", headers: { "X-CSRFToken": getCookie("csrftoken") } })
    .then(response => {
      if (response.ok) {
        // 서버 응답이 성공적이라면 페이지를 새로고침합니다.
        window.location.reload();
      } else {
        // 서버 응답이 실패하면 적절한 오류 처리를 수행합니다.
        console.error('팔로우 토글 실패');
      }
    });
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

