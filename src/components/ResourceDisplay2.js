// src/ResourceDisplay2.js


import React from "react";
import styles from "./ResourceDisplay.module.css";

import { useResources } from "../context/ResourceContext";

import branchIcon from "../assets/image/tree.png";
import seedIcon from "../assets/image/seed.png";
import clayIcon from "../assets/image/clay.png";
import rockIcon from "../assets/image/rock.png";
import reedIcon from "../assets/image/reed.png";
import vegetableIcon from "../assets/image/vegetable.png";
import houseIcon from "../assets/image/house.png";
import farmerIcon from "../assets/image/farmer.png";
import cardIcon from "../assets/cards/job/bricklayer.jpg";
import foodIcon from "../assets/image/food.png";
import fenceIcon from "../assets/image/fence.png";
import cowshedIcon from "../assets/image/house.png";

import pigIcon from "../assets/image/pig.png";
import cowIcon from "../assets/image/cow.png";
import sheepIcon from "../assets/image/sheep.png";
import begIcon from "../assets/image/beg.png";

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
  family : farmerIcon,
  fence: fenceIcon,
  cowshed: cowshedIcon,
};

const ResourceDisplay2 = ({ resources }) => {
  const { userResources } = useResources();

  // Split resources into two rows for display
  const Resources = [
    "wood",
    "grain",
    "clay",
    "stone",
    "weed",
    "vegetable",
    "sheep",
    "pig",
    "cow",
    "food",
    "family",
    "fence",
    "cowshed",
  ];

  const test = () => {
    console.log(userResources);
  };

  return (
    <div className={styles.resourceContainer} onClick={test}>
      <div className={styles.resourceRow}>
        {Resources.map(
          (resource) =>
            resourceIcons[resource] && (
              <div key={resource} className={styles.resource}>
                <img src={resourceIcons[resource]} alt={resource} />
                <span>{userResources[resource]}</span>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ResourceDisplay2;
