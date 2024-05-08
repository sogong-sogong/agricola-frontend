import React from "react";

import styles from "./LogBoard.module.css";

import calenderIcon from "../assets/icons/calendar-add.png";
import starIcon from "../assets/icons/star.png";

import coalImg from "../assets/objects/coal.png";
import foodImg from "../assets/objects/food.png";
//import reedImg from "../assets/objects/reed.png";
import soilImg from "../assets/objects/soil.png";
import turnImg from "../assets/objects/turn.png";

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

const renderFamilyImages = (idx, count, imgSrc) => {
  return [...Array(4)].map(
    (_, index) =>
      count[idx] - index - 1 >= 0 && (
        <img
          key={index}
          src={imgSrc[idx]}
          alt="turn"
          style={{ width: "25%" }}
        />
      )
  );
};

function LogBoard() {
  const clickCalendar = () => {
    console.log("click calender");
  };

  const clickStar = () => {
    console.log("click star");
  };

  const clickProfile = (id) => {
    console.log("click profile " + id);
  };

  const clickTurnOff = () => {
    console.log("click turn off");
  };

  const clickFoodExchange = () => {
    console.log("click food exchange");
  };

  // 자신의 아이디
  const myID = 2;

  // 현재 턴인 유저
  const turnNow = 0;

  const profileStyle = [
    ["rgb(12, 169, 177)"],
    ["rgb(17, 100, 37)"],
    ["rgb(102, 4, 173)"],
    ["rgb(164, 5, 5)"],
  ];

  // 남은 가족 수
  const familyCount = [2, 2, 1, 4];

  // 로그 임시 데이터
  const logData = [
    {
      name: "player1",
      img: [soilImg, coalImg],
      number: [2, 3],
    },
    {
      name: "player1",
      img: [soilImg, coalImg],
      number: [2, 3],
    },
    {
      name: "player1",
      img: [soilImg, coalImg],
      number: [2, 3],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        도움판
        <div className={styles.menu}>
          <div
            className={styles.iconBox}
            onClick={() => {
              clickCalendar();
            }}
          >
            <img src={calenderIcon} alt="calender" style={{ width: "80%" }} />
          </div>
          <div
            className={styles.iconBox}
            onClick={() => {
              clickStar();
            }}
          >
            <img src={starIcon} alt="star" style={{ width: "80%" }} />
          </div>
        </div>
      </div>
      <div className={styles.box2}>
        유저
        <div className={styles.player}>
          <div className={styles.turn}>
            {[...Array(4)].map((_, index) => (
              <div className={styles.turnIcon} key={index}>
                {turnNow === index && (
                  <img src={turnImg} alt="turn" style={{ height: "90%" }} />
                )}
              </div>
            ))}
          </div>
          <div className={styles.profile}>
            {[...Array(4)].map((_, index) => (
              <div key={index} className={styles.profileBox}>
                <div
                  className={styles.profileImg}
                  style={
                    myID === index + 1
                      ? {
                          border: `3px solid ${profileStyle[index]}`,
                          backgroundColor: `${profileStyle[index]}`,
                          color: "white",
                        }
                      : { border: `3px solid ${profileStyle[indexedDB]}` }
                  }
                >
                  {myID === index + 1 ? "나" : index + 1}
                </div>
                <div
                  className={styles.family}
                  onClick={() => {
                    clickProfile(index);
                  }}
                >
                  {renderFamilyImages(index, familyCount, familyImages)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.clock}>
          <div
            className={styles.clockButton}
            onClick={() => {
              clickTurnOff();
            }}
          >
            내 턴 종료하기
          </div>
        </div>
      </div>
      <div className={styles.box3}>
        <div className={styles.box3Top}>
          <div
            className={styles.foodButton}
            onClick={() => clickFoodExchange()}
          >
            <img src={foodImg} alt="food exchange" />
            <span>식량 교환</span>
          </div>
        </div>
        <div className={styles.logBox}>
          전체 로그
          {logData.map((data, index) => (
            <div key={index} className={styles.logText}>
              <span>{data.name}님이</span>
              {data.img.map((imgSrc, imgIndex) => (
                <React.Fragment key={imgIndex}>
                  <img src={imgSrc} alt="resource" />
                  <span>{data.number[imgIndex]}</span>
                  {imgIndex !== data.img.length - 1 && <span>, </span>}
                </React.Fragment>
              ))}
              <span>을 가져갑니다.</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogBoard;
