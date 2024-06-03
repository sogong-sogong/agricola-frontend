import React, { createContext, useState, useContext } from "react";

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
  // 공동창고 자원
  const [gameResources, setGameResources] = useState({
    wood: 30,
    grain: 18,
    clay: 18,
    stone: 16,
    weed: 14,
    vegetable: 12,
    sheep: 18,
    pig: 15,
    cow: 13,
    food: 20,
  });

  const [userResources, setUserResources] = useState({
    branch: 0,
    clay: 0,
    rock: 0,
    reed: 0,
    seed: 0,
    vegetable: 0,
    food: 0,
    beg: 0,
    sheep: 0,
    pig: 0,
    cow: 0,
    mark: 0,
    fence: 0,
    house: 0,
    family: 2,
  });

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
  return (
    <ResourceContext.Provider
      value={{
        gameResources,
        userResources,
        updateGameResources,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

export const useResources = () => {
  return useContext(ResourceContext);
};
