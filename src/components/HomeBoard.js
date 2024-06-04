import React, { useState, useContext } from "react";

import { useResources } from "../context/ResourceContext";
import ResourceDisplay2 from './ResourceDisplay2';

import styles from "./HomeBoard.module.css";
import ActBoard from "./ActBoard";


import emptyImg from "../assets/objects/empty.png";
import woodHomeImg from "../assets/objects/wood_home.jpg";
import soilHomeImg from "../assets/objects/soil_home.jpg";
import stoneHomeImg from "../assets/objects/stone_home.jpg";

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

function HomeBoard() {
  //const { setResourceData1 } = useContext(ResourceContext);
  const { userResources, setuserResources} = useResources();
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

  const resourceIcons = {
    wood: branchIcon,
    grain: seedIcon,
    clay: clayIcon,
    stone: rockIcon,
    weed: reedIcon,
    vegetable: vegetableIcon,
    sheep: sheepIcon,
    food: foodIcon,
    pig: pigIcon,
    cow: cowIcon,
  };
  /*
  const resourceData1 = Object.entries(UserresourceIcons).map(([key, value]) => ({
    img: [value],
    number: [initialUserResources[key]]
  }));
  
  const resourceData2 = Object.entries(animalresourceIcons).map(([key, value]) => ({
    img: [value],
    number: [initialUserResources[key]]
  }));
  
  const resourceData3 = Object.entries(farmresourceIcons).map(([key, value]) => ({
    img: [value],
    number: [initialUserResources[key]]
  }));
  
  */

  const handleFenceInstallation = (index) => {
    const updatedFarm = [...data.farm];

    if (updatedFarm[index] === "empty") {
      let requiredResources = 4;
      if (clickCount > 0) {
        requiredResources = 3;
      }

      if (userResources.branch < requiredResources) {
        setShowModal(true);
        return;
      }

      updatedFarm[index] = "fence2";
      setuserResources((prevResources) => ({
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
      updatedFarm[index] = "soil_home";
      updatedFarm[index + 5] = "soil_home";
      setuserResources((prevResources) => ({
        ...prevResources,
        branch: prevResources.branch - requiredResources,
        reed: prevResources.reed - requiredReeds,
      }));
    } else if (updatedFarm[index] === "soil_home") {
      if (userResources.rock < requiredResources) {
        setShowModal(true);
        return;
      }
      updatedFarm[index] = "stone_home";
      updatedFarm[index + 5] = "stone_home";
      setuserResources((prevResources) => ({
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
          <img
            key={index}
            src={emptyImg}
            alt="Empty"
            className={styles.pointerCursor}
            onClick={() => handleFenceInstallation(index)}
          />
        );
      case "wood_home":
        return (
          <img
            key={index}
            src={woodHomeImg}
            alt="WoodHome"
            className={styles.pointerCursor}
            onClick={() => upgradeHome(index)}
          />
        );
      case "soil_home":
        return (
          <img
            key={index}
            src={soilHomeImg}
            alt="SoilHome"
            className={styles.pointerCursor}
            onClick={() => upgradeHome(index)}
          />
        );
      case "wood_home":
        return <img src={woodHomeImg} alt="WoodHome" />;
      case "soil_home":
        return <img src={soilHomeImg} alt="SoilHome" />;
      case "stone_home":
        return <img src={stoneHomeImg} alt="StoneHome" />;
      case "fence2":
        return <img src={fence2Img} alt="Fence2" />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>개인 창고</div>
      <div className={styles.middleSection}>
        <ResourceDisplay2
          resources={userResources}
          resourceIcons={resourceIcons}
        />
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.farm}>
          {data.farm.map((slot, index) => renderFarm(slot, index))}
        </div>
      </div>
    </div>
  );
}

export default HomeBoard;
