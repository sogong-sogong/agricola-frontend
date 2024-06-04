import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./ActBoard.module.css";
import { initialGameResources, initialUserResources } from "./resources.js";
import ResourceDisplay from "./ResourceDisplay";

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
}) => {
  const [userResources, setUserResources] = useState(initialUserResources);
  const [gameResources, setGameResources] = useState(initialGameResources);
  const [selectedCards, setSelectedCards] = useState([]);

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

  /*동현님
  const UserresourceIcons = {
    branch: branchIcon,
    clay: clayIcon,
    rock: rockIcon,
    reed: reedIcon,
    seed: seedIcon,
    vegetable: vegetableIcon,
    food: foodIcon,
    beg: begIcon
  };

  const animalresourceIcons = {
    pig: pigIcon,
    cow: cowIcon,
  };
  */

  const cards = [
    { id: 16, image: bush1, resources: { branch: 1 } },
    { id: 22, image: farmEx2, resources: { branch: -2, barn: 1 } },
    { id: 32, image: round1a },
    { id: 33, image: round1b },
    { id: 34, image: round1c },
    { id: 35, image: round1d },

    { id: 17, image: forest7, resources: { branch: 2 } },
    { id: 23, image: get8, resources: { turn: 1, card: 1 } },
    { id: 28, image: forest9, resources: { branch: 3 } },
    { id: 36, image: round2a },
    { id: 37, image: round2b },
    { id: 38, image: round2c },

    { id: 18, image: rsc13, resources: { reed: 1, rock: 1, food: 1 } },
    { id: 24, image: grain14, resources: { seed: 1 } },
    { id: 100 },
    { id: 39, image: round3a },
    { id: 40, image: round3b },
    { id: 101 },

    { id: 19, image: clay19, resources: { clay: 2 } },
    { id: 25, image: farmGet20, resources: { reed: 1, rock: 1, food: 1 } },
    { id: 29, image: clay21, resources: { seed: 1 } },
    { id: 41, image: round4a },
    { id: 42, image: round4b },
    { id: 102 },

    { id: 20, image: study25, resources: { food: -2, card: 1 } },
    { id: 26, image: studay26, resources: { food: -1, card: 1 } },
    { id: 30, image: reed27, resources: { reed: 1 } },
    { id: 43, image: round5a },
    { id: 44, image: round5b },
    { id: 45, image: round6a },

    { id: 21, image: show31, resources: { food: 1 } },
    { id: 27, image: sell32, resources: { food: 2 } },
    { id: 31, image: fish33, resources: { food: 1 } },

    // Add more cards if needed
  ];

  const handleCardClick = (card) => {
    if (!selectedCards.includes(card.id)) {
      setSelectedCards([...selectedCards, card.id]);

      // Update user resources
      const updatedUserResources = { ...userResources };
      const updatedGameResources = { ...gameResources };

      Object.keys(card.resources).forEach((resource) => {
        // Update user resources
        updatedUserResources[resource] =
          (updatedUserResources[resource] || 0) + card.resources[resource];

        // Update game resources
        updatedGameResources[resource] =
          (updatedGameResources[resource] || 0) - card.resources[resource];
      });

      setUserResources(updatedUserResources);
      setGameResources(updatedGameResources);

      console.log("Updated User Resources:", updatedUserResources);
      console.log("Updated Game Resources:", updatedGameResources);
    }
  };

  // 테스트 함수
  const test = async () => {
    //inquiryFamilyPosition();
    console.log(familyCount);
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {cards.map((card) => (
          <button
            key={card.id}
            className={styles.card}
            onClick={() => {
              //handleCardClick(card);
              console.log(card.id);
              if (familyCount < 2) {
                updateFamilyPosition(memberId * 2 - familyCount, card.id);
                setFamilyCount((prev) => prev + 1);
              }
              test();
            }}
          >
            {card.image && <img src={card.image} alt={`Card ${card.id}`} />}
            {familyPosition[0] &&
              (familyPosition[0].family[0].xy === card.id ||
                familyPosition[0].family[1].xy === card.id) && (
                <div className={styles.userMark}>
                  <img src={familyImages[0]} alt="User Mark" />
                </div>
              )}
            {familyPosition[1] &&
              (familyPosition[1].family[0].xy === card.id ||
                familyPosition[1].family[1].xy === card.id) && (
                <div className={styles.userMark}>
                  <img src={familyImages[1]} alt="User Mark" />
                </div>
              )}
            {familyPosition[2] &&
              (familyPosition[2].family[0].xy === card.id ||
                familyPosition[2].family[1].xy === card.id) && (
                <div className={styles.userMark}>
                  <img src={familyImages[2]} alt="User Mark" />
                </div>
              )}
            {familyPosition[3] &&
              (familyPosition[3].family[0].xy === card.id ||
                familyPosition[3].family[1].xy === card.id) && (
                <div className={styles.userMark}>
                  <img src={familyImages[3]} alt="User Mark" />
                </div>
              )}
          </button>
        ))}
      </div>
      <div className={styles.resources}>
        <ResourceDisplay
          resources={gameResources}
          resourceIcons={resourceIcons}
        />
        {/* 동현님
        <h3>User Resources</h3>

        <ResourceDisplay resources={userResources} resourceIcons={UserresourceIcons} />
        <h3>animal Resources</h3>
        <ResourceDisplay resources={userResources} resourceIcons={animalresourceIcons} />
        */}
      </div>
    </div>
  );
};

export default ActBoard;
