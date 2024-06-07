import React, { useState, useContext, useEffect } from "react";
import { ResourceContext } from "../context/ResourceContext";
import { initialUserResources } from "./resources.js";
import ResourceDisplay2 from "./ResourceDisplay2";
import styles from "./HomeBoard.module.css";
import resources from "../components/resources";
import ActBoard from "./ActBoard";

import emptyImg from "../assets/objects/empty.png";
import woodHomeImg from "../assets/objects/wood_home.jpg";
import soilHomeImg from "../assets/objects/soil_home.jpg";
import stoneHomeImg from "../assets/objects/stone_home.jpg";
import plowImg from "../assets/objects/plow.png";
import plowGrain1Img from "../assets/image/plow_grain1.png";
import plowGrain2Img from "../assets/image/plow_grain2.png";
import plowGrain3Img from "../assets/image/plow_grain3.png";

import fence2Img from "../assets/objects/fence2.png";

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
import beggingIcon from "../assets/image/begging.png";
import farmerIcon from "../assets/image/farmer.png";

import familyBlueImg from "../assets/objects/family-blue.png";
import familyGreenImg from "../assets/objects/family-green.png";
import familyPurpleImg from "../assets/objects/family-purple.png";
import familyRedImg from "../assets/objects/family-red.png";

const familyImages = [
  familyBlueImg,
  familyGreenImg,
  familyPurpleImg,
  familyRedImg,
];

function HomeBoard({
  farmData,
  houseData,
  cageData,
  inquiryFarm,
  familyPosition,
  currentShowUser,
  myID,
}) {
  //const { setResourceData1 } = useContext(ResourceContext);
  const [userResources, setUserResources] = useState(initialUserResources);
  const [updatedUserResources, setUpdatedUserResources] =
    useState(initialUserResources);
  const [data, setData] = useState({
    farm: [
      "0",
      "empty",
      "empty",
      "empty",
      "empty",
      "empty",
      "wood_home",
      "empty",
      "empty",
      "empty",
      "empty",
      "wood_home",
      "empty",
      "empty",
      "empty",
      "empty",
    ],
  });
  const [showModal, setShowModal] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [click, setClick] = useState(0);

  const UserresourceIcons = {
    branch: branchIcon,
    clay: clayIcon,
    rock: rockIcon,
    reed: reedIcon,
    seed: seedIcon,
    vegetable: vegetableIcon,
    food: foodIcon,
    begging: beggingIcon,
  };

  const animalresourceIcons = {
    sheep: sheepIcon,
    pig: pigIcon,
    cow: cowIcon,
  };

  const farmresourceIcons = {
    farmer: farmerIcon,
    fence: fenceIcon,
    house: houseIcon,
  };

  // const resourceData1 = Object.entries(UserresourceIcons).map(([key, value]) => ({
  //   img: [value],
  //   number: [initialUserResources[key]]
  // }));

  // const resourceData2 = Object.entries(animalresourceIcons).map(([key, value]) => ({
  //   img: [value],
  //   number: [initialUserResources[key]]
  // }));

  // const resourceData3 = Object.entries(farmresourceIcons).map(([key, value]) => ({
  //   img: [value],
  //   number: [initialUserResources[key]]
  // }));

  useEffect(() => {
    if (farmData) updateFarmData(farmData);
    if (houseData) updateFarmData(houseData);
    if (cageData) updateFarmData(cageData);
  }, [farmData, houseData, cageData]);

  const handleFenceInstallation = (index) => {
    const updatedFarm = [...data.farm];

    if (updatedFarm[index] === "empty") {
      let requiredResources = 4;
      if (clickCount > 0) {
        requiredResources = 3;
      }
      updatedFarm[index] = "fence2";
      setUserResources((prevResources) => ({
        ...prevResources,
        branch: prevResources.branch - requiredResources,
      }));
      setClickCount(clickCount + 1);
    }
    setData({ farm: updatedFarm });
  };

  const handleCrops = (index) =>{
    const updatedFarm = [...data.farm];
    if (updatedFarm[index] === "plow" ){
      updatedFarm[index] = "plow_grain_3";
      updatedFarm[index+1] = "plow_grain_3";
    }
    else if (updatedFarm[index] === "plow_grain_3" ){
      updatedFarm[index] = "plow_grain_2";
      updatedFarm[index+1] = "plow_grain_2";
    }
    setData({ farm: updatedFarm });
    };

  

  const upgradeHome = (index) => {
    const updatedFarm = [...data.farm];
    let requiredResources = 5;
    let requiredReeds = 2;

    if (index ===6) {
      if (userResources.branch < requiredResources) {
        setShowModal(true);
        return;
      }
      updatedFarm[index] = "stone_home";
      updatedFarm[index + 5] = "stone_home";
      setUserResources((prevResources) => ({
        ...prevResources,
        rock: prevResources.rock - requiredResources,
        reed: prevResources.reed - requiredReeds,
      }));
    }
    else if (index ===11) {
      if (userResources.branch < requiredResources) {
        setShowModal(true);
        return;
      }
      updatedFarm[index] = "stone_home";
      updatedFarm[index - 5] = "stone_home";
      setUserResources((prevResources) => ({
        ...prevResources,
        rock: prevResources.rock - requiredResources,
        reed: prevResources.reed - requiredReeds,
      }));
    }
    setData({ farm: updatedFarm });
  };

  const updateFarmData = (farmData) => {
    const updatedFarm = data.farm.map((field, index) => {
      const matchingField = farmData.find((item) => item.xy === index);
      if (matchingField) {
        switch (matchingField.type) {
          case 0:
            return "plow";
          case 1:
            return "plow_grain_1";
          default:
            return field;
        }
      } else {
        return field;
      }
    });
    setData((prevData) => ({ ...prevData, farm: updatedFarm }));
  };

  const updateHouseData = (houseData) => {
    const updatedFarm = [...data.farm];
    houseData.forEach(({ xy, type }) => {
      switch (type) {
        case "wood":
          updatedFarm[xy] = "wood";
          break;
        case "mud":
          updatedFarm[xy] = "mud";
          break;
        case "stone":
          updatedFarm[xy] = "stone";
          break;
        default:
          break;
      }
    });
    setData((prevData) => ({ ...prevData, farm: updatedFarm }));
  };

  const updateCageData = (cageData) => {
    const updatedFarm = [...data.farm];
    cageData.forEach(({ xy, type }) => {
      switch (type) {
        case 0:
          updatedFarm[xy] = "fence2";
          break;
        default:
          break;
      }
    });
    setData((prevData) => ({ ...prevData, farm: updatedFarm }));
  };

  const test = () => {
    console.log(familyPosition[myID - 1].family);
    console.log(currentShowUser);
  };

  const renderFamilyImage = (index) => {
    return familyPosition[currentShowUser - 1] &&
      (familyPosition[currentShowUser - 1].family[0].xy === index ||
        familyPosition[currentShowUser - 1].family[1].xy === index) ? (
      <img
        src={familyImages[currentShowUser - 1]}
        alt="family"
        className={styles.overlay}
      />
    ) : familyPosition[myID - 1] &&
      (familyPosition[myID - 1].family[0].xy === index ||
        familyPosition[myID - 1].family[1].xy === index) ? (
      <div>
        <img
          src={familyImages[myID - 1]}
          alt="family"
          className={styles.overlay}
        />
      </div>
    ) : (
      ""
    );
  };

  const renderFarm = (slot, index) => {
    switch (slot) {
      case "empty":
        return (
          <div key={index} className={styles.image}>
            <img
              src={emptyImg}
              alt="Empty"
              className={styles.pointerCursor}
              onClick={() => {
                handleFenceInstallation(index);
                // handleCrops(index);
                test();
              }}
            />
          </div>
        );
      case "wood_home":
        return (
          <div key={index} className={styles.image}>
            {renderFamilyImage(index)}
            <img
              key={index}
              src={woodHomeImg}
              alt="WoodHome"
              className={styles.pointerCursor}
              onClick={() => upgradeHome(index)}
            />
          </div>
        );
      case "soil_home":
        return (
          <div key={index} className={styles.image}>
            {renderFamilyImage(index)}
            <img
              key={index}
              src={soilHomeImg}
              alt="SoilHome"
              className={styles.pointerCursor}
              onClick={() => upgradeHome(index)}
            />
          </div>
        );
      case "stone_home":
        return (
          <div key={index} className={styles.image}>
            {renderFamilyImage(index)}
            <img
              src={stoneHomeImg}
              alt="StoneHome"
              className={styles.pointerCursor}
            />
          </div>
        );
      case "fence2":
        return (
          <div key={index} className={styles.image}>
            <img
              src={fence2Img}
              alt="Fence2"
              className={styles.pointerCursor}
            />
          </div>
        );
      case "plow":
        return (
          <div key={index} className={styles.image}>
            <img src={plowImg} alt="Plow" className={styles.pointerCursor}
            onClick={() => handleCrops(index)}
            />
          </div>
          
        );
      case "plow_grain_1":
        return (
          <div key={index} className={styles.image}>
            <img
              src={plowGrain1Img}
              alt="PlowGrain1"
              className={styles.pointerCursor}
            />
          </div>
        );
      case "plow_grain_2":
        return (
          <div key={index} className={styles.image}>
            <img
              src={plowGrain2Img}
              alt="PlowGrain2"
              className={styles.pointerCursor}
              onClick={() => handleCrops(index)}
            />
          </div>
        );
      case "plow_grain_3":
        return (
          <div key={index} className={styles.image}>
            <img
              src={plowGrain3Img}
              alt="PlowGrain3"
              className={styles.pointerCursor}
              onClick={() => handleCrops(index)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>개인 창고</div>
      <div className={styles.middleSection}>
        <ResourceDisplay2
          resources={updatedUserResources}
          resourceIcons={UserresourceIcons}
        />
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.farm}>
          {[...Array(3)].map((_, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {[...Array(5)].map((_, colIndex) => {
                const index = rowIndex * 5 + colIndex + 1;
                return renderFarm(data.farm[index], index);
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeBoard;
