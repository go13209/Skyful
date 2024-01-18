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
