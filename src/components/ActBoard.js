import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
import round3a2 from "../assets/image/3-12.png";

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
import { isDisabled } from "@testing-library/user-event/dist/utils";

const familyImages = [mark_blue, mark_green, mark_purple, mark_red];

const ModalStyles = {
  content: {
    backgroundColor: "white",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const ActBoard = ({
  inquiryFamilyPosition,
  updateFamilyPosition,
  userInfos,
  familyPosition,
  inquiryCommonstorage,
  sendCommonstorageData,
  sendUserData,
  inquiryUserStorage,
  myID,
  updateTurn,
  visibleButtons,
  setVisibleButtons,
  updateRound,
  updateFarmData,
  updateCageData,
  initializeFamilyPosition,
  familyCount,
  setFamilyCount,
  findMemberInfo,
  familyID,
  farmData,
  cageData,
  inquiryFarm,
}) => {
  const { roomnumber, currentShowUser, memberId, gameResources } =
    useResources();

  const [grainIsOpen, setGrainIsOpen] = useState(false);
  const [roundState, setRoundState] = useState(0); // 라운드 상태를 관리하는 useState 훅
  const navigate = useNavigate();

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
  const handleButton16 = async () => {
    console.log("덤불 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({ data: { wood: data.wood + 1 }, update: doUpdate });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      wood: gameResources.wood - 1,
    });
  };

  //농장확장
  const handleButton22 = async () => {
    console.log("농장확장 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({
      data: { wood: data.wood - 5, weed: data.weed - 2 },
      update: doUpdate,
    });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      stone: gameResources.wood + 5,
      weed: gameResources.weed + 2,
    });
  };

  //양시장
  const handleButton32 = async () => {
    console.log("양시장 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({ data: { sheep: data.sheep + 1 }, update: doUpdate });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      sheep: gameResources.sheep - 1,
    });
  };

  //울타리
  //+ 개수 선택 모달 + 농장판 선택 연결필요
  const handleButton33 = async () => {
    console.log("울타리 클릭");
    /*
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({ data: { wood: data.wood - 4 }, update: doUpdate });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      wood: gameResources.wood + 4,
    });
    */
  };

  //곡식활용
  //+ 농장판 선택 연결필요
  const handleButton34 = async () => {
    console.log("곡식활용 클릭");
    opencard();
  };

  //주요설비
  // + 카드 모달창 연결 필요
  const handleButton35 = async () => {
    console.log("주요설비 클릭");
    /*
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({ data: { clay: data.clay - 2 }, update: doUpdate });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      clay: gameResources.clay + 2,
    });
    */
  };

  //수풀
  const handleButton17 = async () => {
    console.log("수풀 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({ data: { wood: data.wood + 2 }, update: doUpdate });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      wood: gameResources.wood - 2,
    });
  };

  //회합장소
  //+ 설비 카드 모달 창, 선턴 얻는 거 추가 필요
  const handleButton23 = () => {
    console.log("회합장소 클릭");
    updateTurn(myID);
  };

  //숲
  const handleButton28 = async () => {
    console.log("숲 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({ data: { wood: data.wood + 3 }, update: doUpdate });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      wood: gameResources.wood - 3,
    });
  };

  //가족늘리기
  const handleButton36 = () => {
    console.log("가족늘리기 클릭");
  };

  //서부채석장
  const handleButton37 = async () => {
    console.log("서부채석장 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({ data: { stone: data.stone + 1 }, update: doUpdate });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      stone: gameResources.stone - 1,
    });
  };

  //집개조
  const handleButton38 = async () => {
    console.log("집개조 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({
      data: { weed: data.weed - 1, stone: data.stone - 2 },
      update: doUpdate,
    });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      weed: gameResources.weed + 1,
      stone: gameResources.stone + 2,
    });
    //+ 추가하기, 주요/설비카드 모달
  };

  //자원시장
  const handleButton18 = async () => {
    console.log("자원시장 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({
      data: { weed: data.weed + 1, stone: data.stone + 1, food: data.food + 1 },
      update: doUpdate,
    });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      weed: gameResources.weed - 1,
      stone: gameResources.stone - 1,
      food: gameResources.food - 1,
    });
  };

  //곡식종자
  const handleButton24 = async () => {
    console.log("곡식종자 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({
      data: { grain: data.grain + 1 },
      update: doUpdate,
    });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      grain: gameResources.grain - 1,
    });
  };

  //흙 채굴장
  const handleButton29 = async () => {
    console.log("흙 채굴장 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({
      data: { clay: data.clay + 1 },
      update: doUpdate,
    });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      clay: gameResources.clay - 1,
    });
  };

  //돼지시장
  const handleButton39 = async () => {
    console.log("돼지시장 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({
      data: { pig: data.pig + 2 },
      update: doUpdate,
    });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      pig: gameResources.pig - 2,
    });
  };

  //채소종자
  const handleButton40 = async () => {
    console.log("채소종자 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({
      data: { vegetable: data.vegetable + 1 },
      update: doUpdate,
    });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      vegetable: gameResources.vegetable - 1,
    });
  };

  //점토채굴장
  const handleButton19 = async () => {
    console.log("점토채굴장 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({
      data: { clay: data.clay + 2 },
      update: doUpdate,
    });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      clay: gameResources.clay - 2,
    });
  };

  //농지
  const handleButton25 = () => {
    console.log("농지 클릭");
    //추가하기, farm id 하나를 선택하게 하고, 그걸 type 2 (농지)로 바꿔주기
  };

  //갈대밭
  const handleButton30 = async () => {
    console.log("갈대밭 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({
      data: { weed: data.weed + 1 },
      update: doUpdate,
    });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      weed: gameResources.weed - 1,
    });
  };

  //소시장
  const handleButton41 = async () => {
    console.log("소시장 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({
      data: { cow: data.cow + 1 },
      update: doUpdate,
    });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      cow: gameResources.cow - 1,
    });
  };

  //동부채석장
  const handleButton42 = async () => {
    console.log("동부채석장 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({
      data: { stone: data.stone + 1 },
      update: doUpdate,
    });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      stone: gameResources.stone + 1,
    });
  };

  //교습1
  const handleButton20 = async () => {
    console.log("교습1 클릭");

    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({ data: { food: data.food - 2 }, update: doUpdate });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      food: gameResources.food + 2,
    });
    //추가하기, + 직업카드 모달열고 1개 선택
  };

  //교습2
  // 처음에는 무료
  const handleButton26 = async () => {
    console.log("교습2 클릭");
    /*
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({ data: { food: data.food - 1 }, update: doUpdate });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      food: gameResources.food + 1,
    });
    */
    //추가하기, + 직업카드 모달열고 1개 선택
  };

  //낚시
  const handleButton31 = async () => {
    console.log("낚시 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({ data: { food: data.food + 1 }, update: doUpdate });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      food: gameResources.food - 1,
    });
  };

  //급한가족늘리기
  const handleButton43 = () => {
    console.log("급한가족늘리기 클릭");
  };

  //밭농사
  const handleButton44 = () => {
    //추가하기, farm id 하나를 선택하게 하고, 그걸 type 2 (농지)로 바꿔주기
    //그리고 또는 farm id 하나를 선택하게 하고, grain, vegetable 씨뿌리기
    console.log("밭농사 클릭");
  };

  //농장개조
  const handleButton45 = () => {
    //+ 추가하기, 만약 farmID 1~15중에 type 이 2인 방이 있다면 (돌집),
    console.log("농장개조 클릭");
  };

  //유랑극단
  const handleButton21 = async () => {
    console.log("유랑극단 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({ data: { food: data.food + 1 }, update: doUpdate });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      food: gameResources.food - 1,
    });
  };

  //날품팔이
  const handleButton27 = async () => {
    console.log("날품팔이 클릭");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    console.log("개인 자원: ", data);
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({ data: { food: data.food + 2 }, update: doUpdate });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      food: gameResources.food - 2,
    });
  };

  //데모 라운드 점프 버튼
  const handleRound = () => {
    updateRound();
    setRoundState((prevState) => (prevState + 1) % 16);
  };

  //데모 수확 점프 버튼
  //자원 조정, 라운드 카드 가려놨던 거 6라운드카드까지 다 뒤집기
  const harvest = async () => {
    console.log("수확");
    console.log(myID);
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    // 수확 단계
    if (myID === 3) {
      const fdata = await inquiryFarm(memberId, false);
      console.log(fdata);
      fdata.forEach((item) => {
        if (item.xy) {
          updateFarmData(false, item.id, 1, item.xy, 2);
        }
      });
      // 곡식 증가
      sendUserData({
        data: { grain: data.grain + 2 },
        update: doUpdate,
      });
    }
    // 먹이기
    sendUserData({
      data: { food: data.food - 4 },
      update: doUpdate,
    });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      food: gameResources.food + 4,
    });
    // 번식
    if (myID === 1) {
      console.log(cageData);
      updateCageData(false, cageData[0].cageId, 0, 9, 1, 3);
    }
  };

  const handleDemo = () => {
    if (roundState === 1) {
      console.log("1라운드 종료");
      initializeFamilyPosition();

      handleRound();
    } else if (roundState <= 14) {
      initializeFamilyPosition();
      handleRound();
    } else {
      harvest();
    }
  };

  const round61 = () => {
    let doUpdate = false;
    if (
      currentShowUser === 0 ||
      currentShowUser === findMemberInfo(Number(memberId)).number
    ) {
      doUpdate = true;
    }
    let data = {
      wood: 0,
    };
    if (findMemberInfo(Number(memberId)).number === 1) {
      data = {
        wood: 2,
        clay: 3,
        stone: 2,
        weed: 2,
        food: 5,
      };
    } else if (findMemberInfo(Number(memberId)).number === 2) {
      data = {
        wood: 2,
        clay: 3,
        stone: 2,
        weed: 2,
        food: 3,
      };
    } else if (findMemberInfo(Number(memberId)).number === 3) {
      data = {
        wood: 2,
        grain: 6,
        clay: 3,
        stone: 2,
        weed: 2,
        food: 5,
      };
    } else if (findMemberInfo(Number(memberId)).number === 4) {
      data = {
        wood: 15,
        clay: 3,
        stone: 7,
        weed: 4,
        food: 2,
      };
    }

    sendUserData({
      data: data,
      update: doUpdate,
    });

    if (findMemberInfo(Number(memberId)).number === 1) {
      updateCageData(true, 0, 0, 1, 1, 0);
    }

    // Change the image of id: "45" button
    setButtonsData((prevButtonsData) =>
      prevButtonsData.map((button) =>
        button.id === "39" ? { ...button, src: round3a2 } : button
      )
    ); // 바뀜
  };

  const onClickLobbyroom = () => {
    console.log("종료");
    navigate(`/`);
  };

  // 테스트 함수
  const test = async (id) => {
    console.log(`Button with id ${id} clicked`);
    console.log(findMemberInfo(Number(memberId)).number);
    //console.log(familyPosition[0].family[0].xy);
  };

  // 행동판 버튼 정보 저장
  const [buttonsData, setButtonsData] = useState([
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
    { handler: isDisabled },
    { id: "19", src: clay19, handler: handleButton19 },
    { id: "25", src: farmGet20, handler: handleButton25 },
    { id: "30", src: reed27, handler: handleButton30 },
    { id: "41", src: round4a, handler: handleButton41 },
    { id: "42", src: round4b, handler: handleButton42 },
    { handler: isDisabled },
    { id: "20", src: study25, handler: handleButton20 },
    { id: "26", src: studay26, handler: handleButton26 },
    { id: "31", src: fish33, handler: handleButton31 },
    { id: "43", src: round5a, handler: handleButton43 },
    { id: "44", src: round5b, handler: handleButton44 },
    { id: "45", src: round6a, handler: handleButton45 },
    { id: "21", src: show31, handler: handleButton21 },
    { id: "27", src: sell32, handler: handleButton27 },
  ]); // 바뀜

  // 상태에 따라 버튼에 표시될 텍스트를 결정하는 함수
  const getButtonText = (state) => {
    switch (state) {
      case 0:
        return "시작";
      case 1:
        return "Round 1";
      case 2:
        return "Round 1-2";
      case 3:
        return "Round 1-3";
      case 4:
        return "Round 1-4";
      case 5:
        return "Round 2-1";
      case 6:
        return "Round 2-2";
      case 7:
        return "Round 2-3";
      case 8:
        return "Round 3-1";
      case 9:
        return "Round 3-2";
      case 10:
        return "Round 4-1";
      case 11:
        return "Round 4-2";
      case 12:
        return "Round 5-1";
      case 13:
        return "Round 5-2";
      case 14:
        return "Round 6-1";
      case 15:
        return "수확";
      default:
        return "";
    }
  };

  const closecard = async () => {
    setGrainIsOpen(false);
    // 자원 업데이트
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({ data: { grain: data.grain - 2 }, update: doUpdate });
    // 공동자원
    sendCommonstorageData({
      roomId: {
        id: roomnumber,
      },
      grain: gameResources.grain + 2,
    });
    // 농장 업데이트
    console.log(farmData);
    if (farmData[0].xy === 7) {
      updateFarmData(false, farmData[0].farmId, 1, 7, 3); // 곡식 3개
    }
    if (farmData[1].xy === 8) {
      updateFarmData(false, farmData[1].farmId, 1, 8, 3); // 곡식 3개
    }
  };

  const opencard = () => {
    setGrainIsOpen(true);
  };

  return (
    <div className={styles.container}>
      <Modal
        isOpen={grainIsOpen}
        onRequestClose={closecard}
        contentLabel="grain"
        style={ModalStyles}
      >
        <div className={styles.modal}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "5%",
              width: "100%",
              borderBottom: "1px solid #000",
            }}
          ></div>
          <img
            src={seedIcon}
            alt="aa"
            onClick={closecard}
            style={{ height: "20%" }}
          />
          <img src={vegetableIcon} alt="aa" style={{ height: "20%" }} />
        </div>
      </Modal>
      <div className={styles.right}>
        <button onClick={handleDemo}>{getButtonText(roundState)}</button>
        <button onClick={round61}>자원 업데이트</button>
        <button className={styles.close} onClick={onClickLobbyroom}>
          종료
        </button>
      </div>
      <div className={styles.grid}>
        {buttonsData.map((button) => (
          <div
            key={button.id}
            className={styles.button}
            id={button.id}
            onClick={() => {
              button.handler();

              if (familyCount < 2) {
                updateFamilyPosition(familyID[familyCount], button.id);
                setFamilyCount((prev) => prev + 1);
              }
              test(button.id);
            }}
          >
            {button.src && <img src={button.src} alt={button.id} />}
            {visibleButtons.has(parseInt(button.id)) && (
              <div className={styles.overlay} />
            )}
            {familyPosition.map(
              (family, index) =>
                family &&
                (family.family[0].xy === Number(button.id) ||
                  family.family[1].xy === Number(button.id)) && (
                  <div
                    key={`${button.id}-${index}`}
                    className={styles.userMark}
                  >
                    <img
                      src={
                        familyImages[
                          findMemberInfo(Number(family.memberId)).number - 1
                        ]
                      }
                      alt="User Mark"
                    />
                  </div>
                )
            )}
          </div>
        ))}
      </div>
      <div className={styles.resources}>
        <ResourceDisplay
          resources={gameResources}
          resourceIcons={resourceIcons}
        />
      </div>
    </div>
  );
};

export default ActBoard;
