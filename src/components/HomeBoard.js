import React, { useState, useContext, useEffect } from "react";
import { ResourceContext } from "../context/ResourceContext";
// import { initialUserResources } from "./resources.js";
import ResourceDisplay from "./ResourceDisplay";
import ResourceDisplay2 from "./ResourceDisplay2";
import { useResources } from "../context/ResourceContext";
import styles from "./HomeBoard.module.css";
// import resources from "../components/resources";
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
import cowshedImg from "../assets/image/cowshed.png";

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
  updateFarmData,
  updateHouseData,
  inquiryHouse,
  memberId,
  updateCageData,
  inquiryUserStorage,
  sendUserData,
  sendCommonstorageData,
  roomnumber,
}) {
  //const { setResourceData1 } = useContext(ResourceContext);
  const {
    gameResources,
    userResources,
    updateGameResources,
    updateUserResources,
  } = useResources();
  // const [updatedUserResources, setUpdatedUserResources] =
  //   useState(initialUserResources);
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

  const profileStyle = [
    ["rgb(12, 169, 177)"],
    ["rgb(17, 100, 37)"],
    ["rgb(102, 4, 173)"],
    ["rgb(164, 5, 5)"],
  ];

  const handleFenceInstallation = (index) => {
    const updatedFarm = [...data.farm];
    if (index === 7) updatedFarm[index] = "plow";
    else if (updatedFarm[index] === "empty") {
      let requiredResources = 4;
      if (clickCount > 0) {
        requiredResources = 3;
      }
      if (userResources.wood > requiredResources) {
        updatedFarm[index] = "fence2";
        updateGameResources({
          wood: gameResources.wood + requiredResources,
        });
        updateUserResources({
          wood: userResources.wood - requiredResources,
        });
      }
      // setUserResources((prevResources) => ({
      //   ...prevResources,
      //   branch: prevResources.branch - requiredResources,
      // }));
      setClickCount(clickCount + 1);
    }
    setData({ farm: updatedFarm });
  };

  const handleCrops = (index) => {
    const updatedFarm = [...data.farm];
    if (updatedFarm[index] === "plow") {
      updatedFarm[index] = "plow_grain_3";
      updatedFarm[index + 1] = "plow_grain_3";
    } else if (updatedFarm[index] === "plow_grain_3") {
      updatedFarm[index] = "plow_grain_2";
      updatedFarm[index + 1] = "plow_grain_2";
    }
    setData({ farm: updatedFarm });
  };

  const upgradeHome = (index) => {
    const updatedFarm = [...data.farm];
    let requiredResources = 5;
    let requiredReeds = 2;

    if (index === 6) {
      if (userResources.branch < requiredResources) {
        setShowModal(true);
        return;
      }
      updatedFarm[index] = "stone_home";
      updatedFarm[index + 5] = "stone_home";
      /*
      setUserResources((prevResources) => ({
        ...prevResources,
        rock: prevResources.rock - requiredResources,
        reed: prevResources.reed - requiredReeds,
      }));
      */
    } else if (index === 11) {
      if (userResources.branch < requiredResources) {
        setShowModal(true);
        return;
      }
      updatedFarm[index] = "stone_home";
      updatedFarm[index - 5] = "stone_home";
      updateGameResources({
        rock: gameResources.rock + requiredResources,
      });
      updateGameResources({
        reed: gameResources.reed + requiredReeds,
      });
      updateUserResources({
        rock: userResources.rock - requiredResources,
      });
      updateUserResources({
        reed: userResources.reed - requiredReeds,
      });
    }
    setData({ farm: updatedFarm });
  };

  const onClickEmpty = async (index) => {
    console.log(index);
    if (index === 7 || index === 8) {
      console.log("농지");
      updateFarmData(true, 1, 1, index, 0); // 곡식 0개 곡식밭 생성
    } else if (index === 4 || index === 5) {
      console.log("외양간");
      updateCageData(true, 0, 1, 1, index, 0);
      const data = await inquiryUserStorage({ id: memberId, update: false });
      let doUpdate = false;
      if (currentShowUser === 0 || currentShowUser === myID) {
        doUpdate = true;
      }
      sendUserData({ data: { wood: data.wood - 2, cowshed: data.cowshed - 1 }, update: doUpdate });
      // 공동자원
      sendCommonstorageData({
        roomId: {
          id: roomnumber,
        },
        wood: gameResources.wood + 2
      });
    }else if (index === 12) {
      console.log("집");
      updateHouseData(true, 0, "wood", index, 0);
    } else if (index === 1) {
      console.log("울타리");
      updateCageData(true, 0, 0, 1, index, 0); // 빈 울타리 생성
      // 나무 자원 4개 소모
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
    }
  };

  const onClickWoodHome = (index) => {
    console.log(memberId);
    // 더블클릭 문제..
    inquiryHouse(memberId);

    houseData.forEach((item) => {
      if (item.xy) {
        updateHouseData(false, item.id, "stone", item.xy, 0);
      }
    });
  };

  const onClickFence = (index) => {
    console.log(cageData[0].cageId);
    updateCageData(false, cageData[0].cageId, 0, 1, index, 2);
  };

  const onClickPlow = (index) => {
    console.log(farmData);
    if (farmData[0].xy === 7) {
      updateFarmData(false, farmData[0].farmId, 1, 7, 3); // 곡식 3개
    }
    if (farmData[1].xy === 8) {
      updateFarmData(false, farmData[1].farmId, 1, 8, 3); // 곡식 3개
    }
  };

  const updateBoard = () => {
    setData((prevState) => {
      const updatedFarm = [
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
      ];

      farmData.forEach((item) => {
        if (item.crop === 0) {
          updatedFarm[item.xy] = "plow";
        } else if (item.crop === 1) {
          updatedFarm[item.xy] = "plow_grain_1";
        } else if (item.crop === 2) {
          updatedFarm[item.xy] = "plow_grain_2";
        } else if (item.crop === 3) {
          updatedFarm[item.xy] = "plow_grain_3";
        }
      });

      houseData.forEach((item) => {
        if (item.type === "wood") {
          updatedFarm[item.xy] = "wood_home";
        } else if (item.type === "mud") {
          updatedFarm[item.xy] = "soil_home";
        } else if (item.type === "stone") {
          updatedFarm[item.xy] = "stone_home";
        }
      });

      cageData.forEach((item) => {
        if (item.type === 0 && item.stock_cnt === 0) {
          updatedFarm[item.xy] = "fence2";
        } else if (item.type === 1 && item.stock_cnt === 0) {
          updatedFarm[item.xy] = "cowshed";
        } else if (item.stock_cnt === 2) {
          updatedFarm[item.xy] = "pig_2";
        } else if (item.stock_cnt === 3) {
          updatedFarm[item.xy] = "pig_3";
        }
      });

      return { ...prevState, farm: updatedFarm };
    });
  };

  const test = () => {};

  // family에 index가 있으면 표시
  const renderFamilyImage = (index) => {
    return familyPosition[currentShowUser - 1] &&
      (familyPosition[currentShowUser - 1].family[0].xy === index ||
        familyPosition[currentShowUser - 1].family[1].xy === index) ? (
      <img
        src={familyImages[currentShowUser - 1]}
        alt="family"
        className={styles.overlay}
      />
    ) : currentShowUser === 0 &&
      familyPosition[myID - 1] &&
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
                // handleFenceInstallation(index);
                // handleCrops(index);
                onClickEmpty(index);
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
              onClick={() => {
                //upgradeHome(index);
                onClickWoodHome(index);
              }}
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
              onClick={() => onClickFence(index)}
            />
          </div>
        );
      case "plow":
        return (
          <div key={index} className={styles.image}>
            <img
              src={plowImg}
              alt="Plow"
              className={styles.pointerCursor}
              onClick={() => onClickPlow(index)}
            />
          </div>
        );
      case "plow_grain_1":
        return (
          <div key={index} className={styles.image}>
            <img src={seedIcon} alt="family" className={styles.overlay} />
            <img
              src={plowImg}
              alt="PlowGrain1"
              className={styles.pointerCursor}
            />
          </div>
        );
      case "plow_grain_2":
        return (
          <div key={index} className={styles.image}>
            <img src={seedIcon} alt="family" className={styles.overlay} />
            <img src={seedIcon} alt="family" className={styles.overlay2} />
            <img
              src={plowImg}
              alt="PlowGrain2"
              className={styles.pointerCursor}
            />
          </div>
        );
      case "plow_grain_3":
        return (
          <div key={index} className={styles.image}>
            <img src={seedIcon} alt="family" className={styles.overlay} />
            <img src={seedIcon} alt="family" className={styles.overlay2} />
            <img src={seedIcon} alt="family" className={styles.overlay3} />
            <img
              src={plowImg}
              alt="PlowGrain3"
              className={styles.pointerCursor}
            />
          </div>
        );
      case "pig_2":
        return (
          <div key={index} className={styles.image}>
            <img src={pigIcon} alt="family" className={styles.overlay} />
            <img src={pigIcon} alt="family" className={styles.overlay2} />
            <img
              src={fence2Img}
              alt="Fence2"
              className={styles.pointerCursor}
              onClick={() => handleCrops(index)}
            />
          </div>
        );
        case "pig_3":
          return (
            <div key={index} className={styles.image}>
              <img src={pigIcon} alt="family" className={styles.overlay} />
              <img src={pigIcon} alt="family" className={styles.overlay2} />
              <img src={pigIcon} alt="family" className={styles.overlay3} />
              <img
                src={fence2Img}
                alt="Fence2"
                className={styles.pointerCursor}
                onClick={() => handleCrops(index)}
              />
            </div>
          );
          case "cowshed":
            return (
              <div key={index} className={styles.image}>
                <img
                  src={cowshedImg}
                  alt="cowshed"
                  className={styles.pointerCursor}
                  // onClick={() => handleCrops(index)}
                />
              </div>
            );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (farmData && houseData && cageData) {
      console.log("변경");
      updateBoard();
    }
  }, [farmData, houseData, cageData]);

  return (
    <div className={styles.container}>
      <div
        className={styles.topSection}
        onClick={test}
        style={
          currentShowUser === 0
            ? {
                backgroundColor: `${profileStyle[myID - 1]}`,
                color: "white",
                borderRadius: "10px",
              }
            : {
                backgroundColor: `${profileStyle[currentShowUser - 1]}`,
                color: "white",
                borderRadius: "10px",
              }
        }
      >
        User{currentShowUser === 0 ? myID : currentShowUser}의 개인 창고
      </div>
      <div className={styles.middleSection}>
        <ResourceDisplay2
          resources={userResources}
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
