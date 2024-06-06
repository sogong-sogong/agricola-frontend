import React, { useState, useContext } from "react";
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

function HomeBoard() {
  //const { setResourceData1 } = useContext(ResourceContext);
  const [userResources, setUserResources] = useState(initialUserResources);
  const [updatedUserResources, setUpdatedUserResources] =
    useState(initialUserResources);
  const [data, setData] = useState({
    farm: [
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

  const handleFenceInstallation = (index) => {
    const updatedFarm = [...data.farm];
    if (index === 6) {
      updatedFarm[index] = "plow";
    } else if (updatedFarm[index] === "empty") {
      let requiredResources = 4;
      if (clickCount > 0) {
        requiredResources = 3;
      }

      if (userResources.branch < requiredResources) {
        setShowModal(true);
        return;
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

  const upgradeHome = (index) => {
    const updatedFarm = [...data.farm];
    let requiredResources = 5;
    let requiredReeds = 2;

    if (updatedFarm[index] === "wood_home") {
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
    setData({ farm: updatedFarm });
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
              onClick={() => handleFenceInstallation(index)}
            />
          </div>
        );
      case "wood_home":
        return (
          <div key={index} className={styles.image}>
            <img src={familyBlueImg} alt="family" class={styles.overlay} />
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
            <img src={plowImg} alt="Plow" className={styles.pointerCursor} />
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
                const index = rowIndex * 5 + colIndex;
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
