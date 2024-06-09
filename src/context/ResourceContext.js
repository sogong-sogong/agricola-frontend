import React, { createContext, useState, useContext, useRef } from "react";

import woodImg from "../assets/objects/wood.png";
import soilImg from "../assets/objects/soil.png";
import coalImg from "../assets/objects/coal.png";
import reedImg from "../assets/objects/reed.png";
import grainImg from "../assets/objects/grain.png";
import vegeImg from "../assets/objects/vege.png";
import foodImg from "../assets/objects/food.png";
import beggingImg from "../assets/objects/begging.png";

import sheepImg from "../assets/objects/sheep.png";
import boarImg from "../assets/objects/boar.png";
import cowImg from "../assets/objects/cow.png";

import farmerImg from "../assets/objects/farmer.png";
import fenceImg from "../assets/objects/fence.png";
import homeImg from "../assets/objects/home.png";

// Context 생성
const ResourceContext = createContext();

export const ResourceProvider = ({ children }) => {
  // API 호출 주소
  const ipAddress = "localhost";
  //const ipAddress = "172.17.74.133";
  const portNum = "8080";

  // STOMP 클라이언트를 위한 ref. 웹소켓 연결을 유지하기 위해 사용
  const stompClient = useRef(null);

  const [roomnumber, setRoomnumber] = useState(null); // 방 번호
  const [memberId, setMemberId] = useState(null); // 멤버 아이디
  const [gameStart, setGameStart] = useState(false); // 게임 시작 여부
  const [currentShowUser, setCurrentShowUser] = useState(0); // 현재 행동판에 보이는 유저 번호 (1 ~ 4)

  // 공동창고 자원
  const [gameResources, setGameResources] = useState({
    wood: 0,
    grain: 0,
    clay: 0,
    stone: 0,
    weed: 0,
    vegetable: 0,
    sheep: 0,
    pig: 0,
    cow: 0,
    food: 0,
  });

  const [userResources, setUserResources] = useState({
    wood: 0,
    grain: 0,
    clay: 0,
    stone: 0,
    weed: 0,
    vegetable: 0,
    sheep: 0,
    pig: 0,
    cow: 0,
    food: 0,
    family: 0,
    fence: 0,
    cowshed: 0,
  });

  // 점수판 초기화
  const initialScore = {
    begging: 0,
    blank: 0,
    cage: 0,
    card: 0,
    cow: 0,
    extra: 0,
    family: 0,
    fencedCowshed: 0,
    field: 0,
    grain: 0,
    memberId: 0,
    mudHouse: 0,
    pig: 0,
    score: 0,
    sheep: 0,
    stoneHouse: 0,
    vegetable: 0,
  };

  const [score, setScore] = useState(Array(4).fill(initialScore));

  // 공동창고 자원 업데이트
  const updateGameResources = (newData) => {
    setGameResources((prevResources) => ({
      wood: newData.wood ?? prevResources.wood,
      grain: newData.grain ?? prevResources.grain,
      clay: newData.clay ?? prevResources.clay,
      stone: newData.stone ?? prevResources.stone,
      weed: newData.weed ?? prevResources.weed,
      vegetable: newData.vegetable ?? prevResources.vegetable,
      sheep: newData.sheep ?? prevResources.sheep,
      pig: newData.pig ?? prevResources.pig,
      cow: newData.cow ?? prevResources.cow,
      food: newData.food ?? prevResources.food,
    }));
  };

  // 유저 자원 업데이트
  const updateUserResources = (newData) => {
    setUserResources((prevResources) => ({
      wood: newData.wood ?? prevResources.wood,
      grain: newData.grain ?? prevResources.grain,
      clay: newData.clay ?? prevResources.clay,
      stone: newData.stone ?? prevResources.stone,
      weed: newData.weed ?? prevResources.weed,
      vegetable: newData.vegetable ?? prevResources.vegetable,
      sheep: newData.sheep ?? prevResources.sheep,
      pig: newData.pig ?? prevResources.pig,
      cow: newData.cow ?? prevResources.cow,
      food: newData.food ?? prevResources.food,
      family: newData.family ?? prevResources.family,
      fence: newData.fence ?? prevResources.fence,
      cowshed: newData.cowshed ?? prevResources.cowshed,
    }));
  };

  return (
    <ResourceContext.Provider
      value={{
        ipAddress,
        portNum,
        stompClient,
        gameResources,
        userResources,
        updateGameResources,
        updateUserResources,
        score,
        setScore,
        roomnumber,
        setRoomnumber,
        gameStart,
        setGameStart,
        currentShowUser,
        setCurrentShowUser,
        memberId,
        setMemberId,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

export const useResources = () => {
  return useContext(ResourceContext);
};
