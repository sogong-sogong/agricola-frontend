import React, { createContext, useState } from 'react';


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

const ResourceContext = createContext();

const ResourceProvider = ({ children }) => {
  const [resourceData1, setResourceData1] = useState([
    {
      name: "leftBox",
      img: [woodImg, soilImg, coalImg, reedImg, grainImg, vegeImg, foodImg, beggingImg],
      number: [9, 8, 10, 7, 3, 2, 2, 0],
    },
  ]);

  const [resourceData2, setResourceData2] = useState([
    {
      name: "middleBox",
      img: [sheepImg, boarImg, cowImg],
      number: [3, 3, 4],
    },
  ]);

  const [resourceData3, setResourceData3] = useState([
    {
      name: "rightBox",
      img: [farmerImg, fenceImg, homeImg],
      number: [2, 2, 2],
    },
  ]);

  return (
    <ResourceContext.Provider value={{ resourceData1, setResourceData1, resourceData2, setResourceData2, resourceData3, setResourceData3 }}>
      {children}
    </ResourceContext.Provider>
  );
};

export { ResourceContext, ResourceProvider };