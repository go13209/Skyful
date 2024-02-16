# 당신의 하늘(Skyful)

<p align="center"><img src=".\skyful_readme_img\logo.png" height="200"></p>

# 프로젝트 정보

- 개인 프로젝트: 당신의 하늘(Skyful)
- 개발기간: 2023.7 ~ 2024.2
- 깃허브 저장소 주소: https://github.com/go13209/Skyful
- 사이트 주소: https://port-0-skyful-azyqdr152alrt9fy8f.sel5.cloudtype.app/
- 기술 스택  
  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white">
  <img src="https://img.shields.io/badge/sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

## 팀 소개

### 🍊 팀원: 김규리 (https://github.com/go13209)

<img src=".\skyful_readme_img\profile.gif" height="200">

- 역할: 풀스택
- 기술 스택  
  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white">
  <img src="https://img.shields.io/badge/sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

- 담당
  - 앱 accounts 모델 작성 및 관련 기능 구현
    - 로그인 / 로그아웃
    - 회원가입 / 회원정보 수정 / 회원탈퇴
    - 유저간 팔로우
    - 회원 찾기
    - 알림
  - 앱 posts 모델 작성 및 관련 기능 구현
    - 일기 작성 / 수정 / 삭제
    - 일기 공유
    - 일기에 대한 댓글 작성 / 수정 / 삭제
  - 모든 페이지 디자인
  - 클라우드타입을 이용한 배포
- 프로젝트 후기  
  치열하게 살아가는 현대인이 하루 한번쯤은 하늘을 올려다보고 자기를 위로하고 돌아보는 시간을 가졌으면 해서 시작한 개인 프로젝트입니다. 처음 시작할 때 상상했던 것에 비해 다소 심심하고 단순한 일기 작성 페이지가 된 것 같아서 아쉽습니다. 그리고 혼자서 진행하다보니 속도가 나지 않아 페이지 자체가 가진 기능에 비해 개발 기간이 오래 걸렸지만 평소에 만들어 보고 싶었던 일기장 사이트를 만든 것에 의의를 두고 싶습니다.

# 프로젝트 소개

## 화면 구성 및 주요 기능

- 메인 페이지

  - 년도별, 월별 달력 표시
  - 일기 작성 여부에 따른 아이콘 별도 표시
  - 일기를 작성한 날의 경우 일기 세부 페이지로 이동
  - 일기를 작성하지 않은 날의 경우 일기 작성 페이지로 이동  
    <img src=".\skyful_readme_img\main.png">

- 회원가입 / 회원정보 수정 / 비밀번호 변경

  - 아이디 및 닉네임 중복 확인
  - 아이디 및 닉네임 글자 수 자동 체크
  - 필수 입력칸이 채워질 경우 자동 버튼 활성화
    <img src=".\skyful_readme_img\accounts_signup_(1).png">
    <img src=".\skyful_readme_img\accounts_signup_(2).png">
    <img src=".\skyful_readme_img\accounts_update.png">
    <img src=".\skyful_readme_img\accounts_password_change.png">

- 마이페이지

  - 유저간 팔로우
  - 팔로워 / 팔로잉 수 표시
    - 팔로워 / 팔로잉 모달창
  - 공유하거나 공유받은 일기 표시
  - 내가 댓글을 쓴 일기와 댓글이 달린 나의 일기 표시
  - 아이디 및 닉네임을 통한 유저 찾기
    <img src=".\skyful_readme_img\accounts_mypage_(1).png">
    <img src=".\skyful_readme_img\accounts_mypage_(2).png">
    <img src=".\skyful_readme_img\accounts_mypage_(3).png">

- 일기 작성 / 수정 페이지

  - 메인 페이지에서 일기 작성 페이지로 이동시 클릭한 날짜 자동 입력
  - 날짜, 일기 제목, 내용, 사진 작성
  - 서로 팔로우 중인 유저에 한해 일기 공유 가능
    <img src=".\skyful_readme_img\post_create.png">

- 일기 세부 페이지

  - 일기 수정 / 삭제
  - 댓글 작성 / 수정 / 삭제
    <img src=".\skyful_readme_img\posts_detail.png">

- 알림
  - 내가 쓴 일기에 댓글이 달린 경우 알림
  - 다른 유저가 나를 팔로우할 시 알림
    <img src=".\skyful_readme_img\alarm_(1).png">
    <img src=".\skyful_readme_img\alarm_(2).png">
