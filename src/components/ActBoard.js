import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./ActBoard.module.css";
import ResourceDisplay from "./ResourceDisplay";
import { useResources } from "../context/ResourceContext";

import bush1 from "../assets/image/1_bush.png";
import farmEx2 from "../assets/image/2_farm_expending.png";
import forest7 from "../assets/image/7_forest.png";
import get8 from "../assets/image/8_Gethering.png";
import forest9 from "../assets/image/9_forests.png";
import rsc13 from "../assets/image/13_resource_market.png";
import grain14 from "../assets/image/14_grainz_storage.png";
import clay19 from "../assets/image/19_getting_clay.png";
import farmGet20 from "../assets/image/20_farm_getting.png";
import clay21 from "../assets/image/21_clay_getting.png";
import study25 from "../assets/image/25_study.png";
import studay26 from "../assets/image/26_study.png";
import reed27 from "../assets/image/27_reed_yard.png";
import show31 from "../assets/image/31_show.png";
import sell32 from "../assets/image/32_selling.png";
import fish33 from "../assets/image/33_fishing.png";

import round1 from "../assets/image/number1.png";
import round2 from "../assets/image/number2.png";
import round3 from "../assets/image/number3.png";
import round4 from "../assets/image/number4.png";
import round5 from "../assets/image/number5.png";
import round6 from "../assets/image/number6.png";

import round1a from "../assets/image/1-1.png";
import round1b from "../assets/image/1-2.png";
import round1c from "../assets/image/1-3.png";
import round1d from "../assets/image/1-4.png";
import round2a from "../assets/image/2-1.png";
import round2b from "../assets/image/2-2.png";
import round2c from "../assets/image/2-3.png";
import round3a from "../assets/image/3-1.png";
import round3b from "../assets/image/3-2.png";
import round4a from "../assets/image/4-1.png";
import round4b from "../assets/image/4-2.png";
import round5a from "../assets/image/5-1.png";
import round5b from "../assets/image/5-2.png";
import round6a from "../assets/image/6-1.png";

import branchIcon from "../assets/image/tree.png";
import seedIcon from "../assets/image/seed.png";
import clayIcon from "../assets/image/clay.png";
import rockIcon from "../assets/image/rock.png";
import reedIcon from "../assets/image/reed.png";
import vegetableIcon from "../assets/image/vegetable.png";
import houseIcon from "../assets/image/house.png";
import turnIcon from "../assets/image/turn.png";
import cardIcon from "../assets/cards/job/bricklayer.jpg";
import foodIcon from "../assets/image/food.png";
import fenceIcon from "../assets/image/fence.png";

import pigIcon from "../assets/image/pig.png";
import cowIcon from "../assets/image/cow.png";
import sheepIcon from "../assets/image/sheep.png";
import begIcon from "../assets/image/beg.png";

import mark from "../assets/image/farmer_blue.png";
import mark_blue from "../assets/objects/family-blue.png";
import mark_green from "../assets/objects/family-green.png";
import mark_purple from "../assets/objects/family-purple.png";
import mark_red from "../assets/objects/family-red.png";

const familyImages = [mark_blue, mark_green, mark_purple, mark_red];

const ActBoard = ({
  roomnumber,
  memberId,
  inquiryFamilyPosition,
  updateFamilyPosition,
  userInfos,
  familyPosition,
  sendCommonstorageData,
  sendUserData,
}) => {
  const [selectedButton, setSelectedButton] = useState(false);
  const {
    gameResources,
    userResources,
    updateGameResources,
    updateUserResources,
  } = useResources();
  const [showButtons, setShowButtons] = useState(false); // State to manage button visibility

  const [familyCount, setFamilyCount] = useState(0); // 가족 몇 명이 행동판에 올라갔는지 센다.

  const resourceIcons = {
    branch: branchIcon,
    seed: seedIcon,
    clay: clayIcon,
    rock: rockIcon,
    reed: reedIcon,
    sheep: sheepIcon,
    turn: turnIcon,
    card: cardIcon,
    food: foodIcon,
    vegetable: vegetableIcon,
    pig: pigIcon,
    cow: cowIcon,
  };

  //덤불
  const handleButton16 = () => {
    //updateGameResources({ wood: gameResources.wood - 1 });
    //updateUserResources({ wood: userResources.wood + 1 });
    setSelectedButton(true);
    sendUserData({
      roomId: { id: roomnumber },
      wood: userResources.wood - 1,
    });
  };

  //농장확장
  const handleButton22 = () => {
    updateGameResources({
      wood: gameResources.wood + 5,
      weed: gameResources.weed + 2,
    });
    updateUserResources({
      wood: userResources.wood - 5,
      weed: userResources.weed - 2,
    });
  };

  //양시장
  const handleButton32 = () => {
    updateGameResources({ sheep: gameResources.sheep - 1 });
    updateUserResources({ sheep: userResources.sheep + 1 });
  };

  //울타리
  //+ 개수 선택 모달 + 농장판 선택 연결필요
  const handleButton33 = () => {
    updateGameResources({ wood: gameResources.wood + 1 });
    updateUserResources({ fence: userResources.fence - 1 });
  };

  //곡식활용
  //+ 농장판 선택 연결필요
  const handleButton34 = () => {
    updateGameResources({ wood: gameResources.wood - 1 });
  };

  //주요설비
  // + 카드 모달창 연결 필요
  const handleButton35 = () => {
    updateGameResources({ wood: gameResources.wood - 1 });
  };

  //수풀
  const handleButton17 = () => {
    updateGameResources({ wood: gameResources.wood - 2 });
    updateUserResources({ wood: userResources.wood + 2 });
  };

  //회합장소
  //+ 설비 카드 모달 창, 선턴 얻는 거 추가 필요
  const handleButton23 = () => {
    updateGameResources({ wood: gameResources.wood - 1 });
  };

  //숲
  const handleButton28 = () => {
    updateGameResources({ wood: gameResources.wood - 3 });
    updateUserResources({ wood: userResources.wood + 3 });
  };

  //가족늘리기
  const handleButton36 = () => {
    //+ 추가하기,만약 farmID 1~15중에 type 이 0인 방이 있다면
    updateUserResources({ family: userResources.family + 1 });
  };

  //서부채석장
  const handleButton37 = () => {
    updateGameResources({ stone: gameResources.stone - 1 });
    updateUserResources({ stone: userResources.stone + 1 });
  };

  //집개조
  const handleButton38 = () => {
    //+ 추가하기, 만약 farmID 1~15중에 type 이 2인 방이 있다면 (돌집)
    updateGameResources({
      weed: gameResources.weed + 1,
      clay: gameResources.clay + 1,
    });
    updateUserResources({
      weed: userResources.weed - 1,
      clay: userResources.clay - 1,
    });
    //+ 추가하기, 주요/설비카드 모달
  };

  //자원시장
  const handleButton18 = () => {
    updateGameResources({
      weed: gameResources.weed - 1,
      clay: gameResources.clay - 1,
      food: gameResources.food - 1,
    });
    updateUserResources({
      weed: userResources.weed + 1,
      clay: userResources.clay + 1,
      food: userResources.food + 1,
    });
  };

  //곡식종자
  const handleButton24 = () => {
    updateGameResources({ grain: gameResources.grain - 1 });
    updateUserResources({ grain: userResources.grain + 1 });
  };

  //흙 채굴장
  const handleButton29 = () => {
    updateGameResources({ clay: gameResources.clay - 1 });
    updateUserResources({ clay: userResources.clay + 1 });
  };

  //돼지시장
  const handleButton39 = () => {
    updateGameResources({ pig: gameResources.pig - 1 });
    updateUserResources({ pig: userResources.pig + 1 });
  };

  //채소종자
  const handleButton40 = () => {
    updateGameResources({ vegetable: gameResources.vegetable - 1 });
    updateUserResources({ vegetable: userResources.vegetable + 1 });
  };

  //점토채굴장
  const handleButton19 = () => {
    updateGameResources({ clay: gameResources.clay - 2 });
    updateUserResources({ clay: userResources.clay + 2 });
  };

  //농지
  const handleButton25 = () => {
    //추가하기, farm id 하나를 선택하게 하고, 그걸 type 2 (농지)로 바꿔주기
  };

  //갈대밭
  const handleButton30 = () => {
    updateGameResources({ weed: gameResources.weed - 1 });
    updateUserResources({ weed: userResources.weed + 1 });
  };

  //소시장
  const handleButton41 = () => {
    updateGameResources({ cow: gameResources.cow - 1 });
    updateUserResources({ cow: userResources.cow + 1 });
  };

  //동부채석장
  const handleButton42 = () => {
    updateGameResources({ stone: gameResources.stone - 1 });
    updateUserResources({ stone: userResources.stone + 1 });
  };

  //교습1
  const handleButton20 = () => {
    updateGameResources({ food: gameResources.food + 2 });
    updateUserResources({ food: userResources.food - 2 });
    //추가하기, + 직업카드 모달열고 1개 선택
  };

  //교습2
  const handleButton26 = () => {
    updateGameResources({ food: gameResources.food + 2 });
    updateUserResources({ food: userResources.food - 1 });
    //추가하기, + 직업카드 모달열고 1개 선택
  };

  //낚시
  const handleButton31 = () => {
    updateGameResources({ food: gameResources.food - 1 });
    updateUserResources({ food: userResources.food + 1 });
  };

  //급한가족늘리기
  const handleButton43 = () => {
    updateUserResources({ family: userResources.family + 1 });
  };

  //밭농사
  const handleButton44 = () => {
    //추가하기, farm id 하나를 선택하게 하고, 그걸 type 2 (농지)로 바꿔주기
    //그리고 또는 farm id 하나를 선택하게 하고, grain, vegetable 씨뿌리기
    updateGameResources({ wood: gameResources.wood - 1 });
  };

  //농장개조
  const handleButton45 = () => {
    //+ 추가하기, 만약 farmID 1~15중에 type 이 2인 방이 있다면 (돌집),
    updateGameResources({
      weed: gameResources.weed + 1,
      clay: gameResources.clay + 1,
    });
    updateUserResources({
      weed: userResources.weed - 1,
      clay: userResources.clay - 1,
    });
    // wood 개수 선택해서 펜스 구매하는 모달
    updateGameResources({ wood: gameResources.wood + 1 });
    updateUserResources({ fence: userResources.fence - 1 });
  };

  //유랑극단
  const handleButton21 = () => {
    updateGameResources({ food: gameResources.food - 1 });
    updateUserResources({ food: userResources.food + 1 });
  };

  //날품팔이
  const handleButton27 = () => {
    updateGameResources({ food: gameResources.food - 2 });
    updateUserResources({ food: userResources.food + 2 });
  };

  //데모 라운드5 점프 버튼
  //자원 조정, 라운드 카드 가려놨던 거 5라운드카드까지 다 뒤집기
  const Lound5 = () => {
    setShowButtons(true);
  };

  //데모 라운드6 점프 버튼
  //자원 조정, 라운드 카드 가려놨던 거 6라운드카드까지 다 뒤집기
  const Lound6 = () => {
    updateGameResources({ food: gameResources.food - 2 });
    updateUserResources({ food: userResources.food + 2 });
  };

  //데모 수확 점프 버튼
  //자원 조정, 라운드 카드 가려놨던 거 6라운드카드까지 다 뒤집기
  const harvest = () => {
    updateGameResources({ food: gameResources.food - 2 });
    updateUserResources({ food: userResources.food + 2 });
  };

  // 테스트 함수
  const test = async (id) => {
    console.log(`Button with id ${id} clicked`);
    //console.log(familyPosition[0].family[0].xy);
  };

  // 행동판 버튼 정보 저장
  const buttonsData = [
    { id: "16", src: bush1, handler: handleButton16 },
    { id: "22", src: farmEx2, handler: handleButton22 },
    { id: "32", src: round1a, handler: handleButton32 },
    { id: "33", src: round1b, handler: handleButton33 },
    { id: "34", src: round1c, handler: handleButton34 },
    { id: "35", src: round1d, handler: handleButton35 },
    { id: "17", src: forest7, handler: handleButton17 },
    { id: "23", src: get8, handler: handleButton23 },
    { id: "28", src: forest9, handler: handleButton28 },
    { id: "36", src: round2a, handler: handleButton36 },
    { id: "37", src: round2b, handler: handleButton37 },
    { id: "38", src: round2c, handler: handleButton38 },
    { id: "18", src: rsc13, handler: handleButton18 },
    { id: "24", src: grain14, handler: handleButton24 },
    { id: "29", src: clay21, handler: handleButton29 },
    { id: "39", src: round3a, handler: handleButton39 },
    { id: "40", src: round3b, handler: handleButton40 },
    { id: "19", src: clay19, handler: handleButton19 },
    { id: "25", src: farmGet20, handler: handleButton25 },
    { id: "30", src: reed27, handler: handleButton30 },
    { id: "41", src: round4a, handler: handleButton41 },
    { id: "42", src: round4b, handler: handleButton42 },
    { id: "20", src: study25, handler: handleButton20 },
    { id: "26", src: studay26, handler: handleButton26 },
    { id: "31", src: fish33, handler: handleButton31 },
    { id: "43", src: round5a, handler: handleButton43 },
    { id: "44", src: round5b, handler: handleButton44 },
    { id: "45", src: round6a, handler: handleButton45 },
    { id: "21", src: show31, handler: handleButton21 },
    { id: "27", src: sell32, handler: handleButton27 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {buttonsData.map((button) => (
          <button
            key={button.id}
            className={styles.button}
            id={button.id}
            onClick={() => {
              button.handler();
              if (familyCount < 2) {
                updateFamilyPosition(memberId * 2 - familyCount, button.id);
                setFamilyCount((prev) => prev + 1);
              }
              test(button.id);
            }}
          >
            <img src={button.src} alt={button.id} />
            {familyPosition[0] &&
              (familyPosition[0].family[0].xy === Number(button.id) ||
                familyPosition[0].family[1].xy === Number(button.id)) && (
                <div className={styles.userMark}>
                  <img src={familyImages[0]} alt="User Mark" />
                </div>
              )}
            {familyPosition[1] &&
              (familyPosition[1].family[0].xy === Number(button.id) ||
                familyPosition[1].family[1].xy === Number(button.id)) && (
                <div className={styles.userMark}>
                  <img src={familyImages[1]} alt="User Mark" />
                </div>
              )}
            {familyPosition[2] &&
              (familyPosition[2].family[0].xy === Number(button.id) ||
                familyPosition[2].family[1].xy === Number(button.id)) && (
                <div className={styles.userMark}>
                  <img src={familyImages[2]} alt="User Mark" />
                </div>
              )}
            {familyPosition[3] &&
              (familyPosition[3].family[0].xy === Number(button.id) ||
                familyPosition[3].family[1].xy === Number(button.id)) && (
                <div className={styles.userMark}>
                  <img src={familyImages[3]} alt="User Mark" />
                </div>
              )}
          </button>
        ))}
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.resources}>
        <ResourceDisplay
          resources={gameResources}
          resourceIcons={resourceIcons}
        />
      </div>
      <div className={styles.right}>
        <button onClick={Lound5}>Lound 5-2</button>
        <button onClick={Lound6}>Lound 6-1</button>
        <button onClick={harvest}>수확</button>
      </div>
    </div>
  );
};

export default ActBoard;
