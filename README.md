# 아그리콜라 (Agricola)
<img src="https://github.com/dslov89/Agricola/assets/71018440/ad428ee1-36a8-47a8-9d1a-46aaff1bf165"  width=150 >


## 소개
팀명 : 소공소공

개발 기간 : 2024.04 ~ 2024.06

개발 인원 : 7명(프론트엔드 4명, 백엔드 3명)

소프트웨어공학 과목에서 팀 과제로 수행한 프로젝트

보드게임 아그리콜라에 대한 웹 기반 게임


## 디자인 설계
<img src="https://img.shields.io/badge/Figma-green?style=for-the-badge&logo=Figma&logoColor=white"/>

## 기술 스택
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"><img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 

## 커뮤니케이션
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=Notion&logoColor=white" alt="html"><img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=JiraSoftware&logoColor=white" alt="html">

## 프론트엔드 아키텍처
![image](https://github.com/sogong-sogong/agricola-frontend/assets/55482976/548b53c3-4518-4a92-b929-9540043101ed)

![image](https://github.com/sogong-sogong/agricola-frontend/assets/55482976/37d3073c-ffa4-4276-afb6-f48e74285ad4)

## 화면 구성
### 로비
![스크린샷 2024-06-09 020111](https://github.com/sogong-sogong/agricola-frontend/assets/55482976/051c06e5-aa1e-4d2d-a38a-473e6b1e22dd)

### 인게임
![스크린샷 2024-06-09 140009](https://github.com/sogong-sogong/agricola-frontend/assets/55482976/e69fa44e-9fd4-4b54-82a2-d48225721a86)

### 카드
![스크린샷 2024-06-09 140050](https://github.com/sogong-sogong/agricola-frontend/assets/55482976/905e48c5-1f25-41bf-93bc-ae838485a07d)
![스크린샷 2024-06-09 140156](https://github.com/sogong-sogong/agricola-frontend/assets/55482976/f924db30-5f4d-40a1-83af-872894b38575)

### 식량 교환
![스크린샷 2024-06-09 194950](https://github.com/sogong-sogong/agricola-frontend/assets/55482976/9932d94c-2893-4ae8-83c3-6cfdf8781908)


## 실행 방법

### 설치 및 백엔드
```
$ git clone https://github.com/sogong-sogong/agricola-server.git
$ cd agricola-server/
```

### 설치 & 프론트엔드
```
$ git clone https://github.com/sogong-sogong/agricola-frontend.git
$ cd agricola-frontend/

$ npm install 
$ npm start
```


## 주요 기능

### 로비
우측 하단 방만들기 버튼을 눌러 방 생성

다른 유저가 생성된 방을 클릭하면 방 입장

한 방에 최대 입장 가능한 인원 수는 4명

최대 인원 수인 4명이 모두 입장하면 게임 시작

### 인게임
게임 시작 후, 모든 인원은 보조설비 카드 7장 및 직업 카드 7장 획득

모든 행동하기 칸 구현

주요설비카드, 보조설비카드, 직업카드 기능 구현

타 플레이어의 프로필을 클릭하여 각 플레이어의 개인 자원 및 농장 상태 확인 가능

농장 내의 빈칸 클릭하여 울타리 설치 가능


## 기타 산출물
<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=JiraSoftware&logoColor=white" alt="html">

https://sogong-sogong.atlassian.net/jira/software/projects/SGSG/boards/1

