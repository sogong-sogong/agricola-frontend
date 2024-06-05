import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import styles from "./LogBoard.module.css";

import ScoreBoardComponent from "../components/ScoreBoard";

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

import scorecardImg from "../assets/objects/scorecard.png";
import FoodExchangeBoard from "./FoodExchangeBoard";

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

const scorecardStyles = {
  content: {
    backgroundColor: "white",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function LogBoard({ memberId, userInfos, inquiryScore }) {
  const [scorecardIsOpen, setScorecardIsOpen] = useState(false);
  const [scoreBoardIsOpen, setScoreBoardIsOpen] = useState(false);
  const [foodExchangeIsOpen, setFoodExchangeIsOpen] = useState(false);

  const starter = findStarterNumber() - 1; // 자신의 선턴 상태

  const myID = findMemberInfo(memberId).number; // 자신의 number

  const closeScorecard = () => {
    setScorecardIsOpen(false);
  };

  const openScorecard = () => {
    setScorecardIsOpen(true);
  };

  const closeScoreBoard = () => {
    setScoreBoardIsOpen(false);
  };

  const openScoreBoard = () => {
    inquiryScore();
    setScoreBoardIsOpen(true);
  };

  const clickProfile = (id) => {
    console.log("click profile " + memberId);
  };

  const clickTurnOff = () => {
    console.log("click turn off");
  };

  const openFoodExchange = () => {
    setFoodExchangeIsOpen(true);
  };

  const closeFoodExchange = () => {
    setFoodExchangeIsOpen(false);
  };

  // 멤버 ID로 number, sterter 정보를 찾는다.
  function findMemberInfo(memberId) {
    const memberInfo = userInfos.find((member) => member.memberId === memberId);
    return memberInfo
      ? memberInfo
      : `Member with memberId ${memberId} not found`;
  }

  // starter 멤버를 찾는다.
  function findStarterNumber() {
    const starterInfo = userInfos.find((member) => member.starter === true);
    return starterInfo ? starterInfo.number : "No starter found";
  }

  const profileStyle = [
    ["rgb(12, 169, 177)"],
    ["rgb(17, 100, 37)"],
    ["rgb(102, 4, 173)"],
    ["rgb(164, 5, 5)"],
  ];

  // 남은 가족 수
  const familyCount = [2, 2, 2, 2];

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
      <Modal
        isOpen={scorecardIsOpen}
        onRequestClose={closeScorecard}
        style={scorecardStyles}
        contentLabel="scorecard"
      >
        <div className={styles.modal}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "5%",
              width: "100%",
              borderBottom: "1px solid #000",
            }}
          >
            참조표
          </div>
          <img src={scorecardImg} alt="scorecard" style={{ height: "80vh" }} />
        </div>
      </Modal>
      <Modal
        isOpen={scoreBoardIsOpen}
        onRequestClose={closeScoreBoard}
        style={scorecardStyles}
        contentLabel="scorecard"
      >
        <div className={styles.modal}>
          <ScoreBoardComponent />
        </div>
      </Modal>
      <Modal
        isOpen={foodExchangeIsOpen}
        onRequestClose={closeFoodExchange}
        style={scorecardStyles}
        contentLabel="food exchange"
      >
        <div className={styles.modal}>
          <FoodExchangeBoard />
        </div>
      </Modal>
      <div className={styles.box1}>
        도움판
        <div className={styles.menu}>
          <div
            className={styles.iconBox}
            onClick={() => {
              openScorecard();
            }}
          >
            <img src={calenderIcon} alt="calender" style={{ width: "80%" }} />
          </div>
          <div
            className={styles.iconBox}
            onClick={() => {
              openScoreBoard();
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
                {starter === index && (
                  <img src={turnImg} alt="turn" style={{ height: "90%" }} />
                )}
              </div>
            ))}
          </div>
          <div className={styles.profile}>
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={styles.profileBox}
                onClick={() => {
                  clickProfile(index);
                }}
              >
                {userInfos[index] ? (
                  <div className={styles.profileBox}>
                    <div
                      className={styles.profileImg}
                      style={
                        myID === index + 1
                          ? {
                              border: `3px solid ${profileStyle[index]}`,
                              backgroundColor: `${profileStyle[index]}`,
                              color: "white",
                            }
                          : { border: `3px solid ${profileStyle[index]}` }
                      }
                    >
                      {myID === index + 1 ? "나" : index + 1}
                    </div>
                    <div className={styles.family}>
                      {renderFamilyImages(index, familyCount, familyImages)}
                    </div>
                  </div>
                ) : (
                  ""
                )}
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
          <div className={styles.foodButton} onClick={() => openFoodExchange()}>
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
