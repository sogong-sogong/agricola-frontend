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
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=Notion&logoColor=white" alt="html"><img src="https://img.shields.io/badge/jirasoftware-0052CC?style=for-the-badge&logo=jirasoftware&logoColor=white"> 

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
