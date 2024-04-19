import React from "react";

import styles from "./LogBoard.module.css";

import calenderIcon from "../assets/icons/calendar-add.png";
import settingIcon from "../assets/icons/setting.png";
import starIcon from "../assets/icons/star.png";
import rightArrowIcon from "../assets/icons/right-arrow.png";
import clockIcon from "../assets/icons/clock.png";

import coalImg from "../assets/objects/coal.png";
import foodImg from "../assets/objects/food.png";
import reedImg from "../assets/objects/reed.png";
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

// 일단 넣긴 했는데 이게 꼭 필요한 기능일까..?
const getCurrentTime = () => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 시간은 12시로 표시
  minutes = minutes < 10 ? "0" + minutes : minutes; // 분이 한 자리 숫자일 경우 앞에 0 붙이기
  const currentTime = hours + ":" + minutes + " " + ampm;
  return currentTime;
};

function LogBoard() {
  const clickCalendar = () => {
    console.log("click calender");
  };

  const clickStar = () => {
    console.log("click star");
  };

  const clickSetting = () => {
    console.log("click setting");
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

  // 현재 몇 번째 플레이어의 차례인지 표시한다.
  const turnNow = 0;

  // 각 플레이어의 남은 가족 수를 표시한다.
  const familyCount = [2, 2, 1, 4];

  // 남은 턴 시간을 표시한다.
  const time = 0;

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
        도움말
        <div className={styles.menu}>
          <div
            className={styles.iconBox}
            onClick={() => {
              clickCalendar();
            }}
          >
            <img src={calenderIcon} alt="calender" style={{ width: "100%" }} />
          </div>
          <div
            className={styles.iconBox}
            onClick={() => {
              clickStar();
            }}
          >
            <img src={starIcon} alt="star" style={{ width: "100%" }} />
          </div>
          <div
            className={styles.iconBox}
            onClick={() => {
              clickSetting();
            }}
          >
            <img src={settingIcon} alt="setting" style={{ width: "90%" }} />
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
              <div className={styles.profileBox}>
                <div className={styles.profileImg}></div>
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
          <div className={styles.clockText}>
            <img
              src={clockIcon}
              alt="clock"
              style={{ height: "80%", marginRight: "10%" }}
            />
            {time} 초
          </div>
          <div className={styles.clockBottom}>
            <div
              className={styles.clockButton}
              onClick={() => {
                clickTurnOff();
              }}
            >
              턴 종료
            </div>
          </div>
        </div>
      </div>
      <div className={styles.box3}>
        <div className={styles.box3Top}>
          <div
            className={styles.foodButton}
            onClick={() => clickFoodExchange()}
          >
            식량 교환
          </div>
          {getCurrentTime()}
        </div>
        <div className={styles.logBox}>
          {logData.map((data, index) => (
            <div key={index} className={styles.logText}>
              <span>{data.name}님이</span>
              {data.img.map((imgSrc, imgIndex) => (
                <React.Fragment key={imgIndex}>
                  <img src={imgSrc} alt="resource" />
                  <span>{data.number[imgIndex]}개</span>
                  {imgIndex !== data.img.length - 1 && <span>, </span>}
                </React.Fragment>
              ))}
              <span>를 가져갑니다.</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogBoard;