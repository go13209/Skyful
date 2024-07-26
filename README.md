# 당신의 하늘(Skyful)

<p align="center"><img src=".\skyful_readme_img\logo.png" width="200"></p>

## 프로젝트 정보

- 개인 프로젝트: 당신의 하늘(Skyful)
- 개발기간: 2023.7 ~ 2024.2
- 깃허브 저장소 주소: https://github.com/go13209/Skyful

## 프로젝트 소개

"당신의 하늘"은 일기를 작성하고 공유할 수 있는 웹사이트입니다. 혼자만의 일기를 작성할 수도, 원하는 사람과 원하는 날의 일기를 공유할 수도 있습니다. 친구와 댓글을 통해 서로 소통하고 이야기도 나눌 수 있습니다.

### 주요 기술

- 언어: Python, JavaScript
- 프레임워크: Django
- 라이브러리: Axios, Bootstrap
- 프론트엔드: HTML, CSS, JavaScript
- 버전 관리: GitHub
- 데이터베이스: SQLite

### 개발 사항

- 회원 관리: 사용자의 로그인, 로그아웃, 회원가입, 회원정보 수정, 비밀번호 변경, 회원탈퇴 기능 구현
- 유저 간 소셜 기능: 팔로우, 회원 찾기, 알림 기능을 통해 유저 간의 상호작용 강화
- 일기 관리: 일기의 작성, 수정, 삭제 기능 및 일기 공유, 댓글 작성 기능 구현
- 디자인: 연도별, 월별 달력 페이지에서 일기 작성 여부를 한눈에 확인할 수 있는 디자인 구현
- 배포: 클라우드타입을 이용한 배포

### 화면 구성 및 주요 기능

- 메인 페이지

  - 연도별, 월별 달력 표시
  - 일기 작성 여부에 따른 아이콘 별도 표시
  - 일기를 작성한 날의 경우 일기 세부 페이지로 이동
  - 일기를 작성하지 않은 날의 경우 일기 작성 페이지로 이동  
    <img src=".\skyful_readme_img\main.png">

- 회원가입 / 회원정보 수정 / 비밀번호 변경 / 회원탈퇴

  - 아이디 및 닉네임 중복 확인
  - 아이디 및 닉네임 글자 수 자동 체크
  - 필수 입력 칸이 채워질 경우 자동 버튼 활성화
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

  - 메인 페이지에서 일기 작성 페이지로 이동 시 클릭한 날짜 자동 입력
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

### 프로젝트를 통해 배운 점

- 풀스택 개발 경험: 프론트엔드와 백엔드 모두를 다루며 전반적인 웹 애플리케이션 개발 과정을 체험
- 데이터베이스 관리: SQLite를 사용하며 데이터베이스 모델링과 쿼리 최적화
- UI/UX 디자인: 사용자 경험을 고려한 디자인의 중요성
- 버전 관리: GitHub를 통해 버전 관리를 체험
- 문제 해결 능력: 다양한 트러블슈팅 과정을 통해 문제 해결 능력을 향상
- 배포 과정 이해: 클라우드타입을 사용하여 애플리케이션 배포 과정을 경험

### 프로젝트 후기

이 프로젝트는 치열하게 살아가는 현대인이 하루 한 번쯤은 하늘을 올려다보고 자기를 위로하고 돌아보는 시간을 가졌으면 하는 바람에서 시작한 개인 프로젝트입니다. 처음 상상했던 것에 비해 다소 심심하고 단순한 일기 작성 페이지가 된 것 같아 아쉽지만, 평소에 만들어 보고 싶었던 일기장 사이트를 만든 것에 큰 의의를 두고 있습니다. 혼자서 진행하다 보니 개발 속도가 다소 느렸지만, 프로젝트 완수에 자부심을 느낍니다.
