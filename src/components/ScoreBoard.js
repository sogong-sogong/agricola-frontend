import React, { useState } from "react";
import styles from "./ScoreBoard.module.css";

import { useResources } from "../context/ResourceContext";
import { useNavigate } from "react-router-dom";  // import useNavigate

import fieldImg from "../assets/objects/field_small.png";
import cageImg from "../assets/objects/cageland-small.png";
import grainImg from "../assets/objects/grain.png";
import vegitableImg from "../assets/objects/vege.png";
import sheepImg from "../assets/objects/sheep.png";
import pigImg from "../assets/objects/boar.png";
import cowImg from "../assets/objects/cow.png";
import blankImg from "../assets/objects/farmland.png";
import fencedCowshedImg from "../assets/objects/home.png";
import mudHouseImg from "../assets/objects/soil_home_small.png";
import stoneHouseImg from "../assets/objects/stone_home_small.png";
import familyBlueImg from "../assets/objects/family-blue.png";
import familyGreenImg from "../assets/objects/family-green.png";
import familyPurpleImg from "../assets/objects/family-purple.png";
import familyRedImg from "../assets/objects/family-red.png";
import beggingImg from "../assets/objects/begging.png";

function ScoreBoard() {
  const { score } = useResources();
  const navigate = useNavigate(); 

  const column = [
    "",
    "밭",
    "우리",
    "곡식",
    "채소",
    "양",
    "멧돼지",
    "소",
    "빈칸",
    "울타리 친 외양간",
    "흙집 방",
    "돌집 방",
    "가족 구성원",
    "구걸 카드",
    "카드 점수",
    "추가점수",
  ];

  const keys = [
    "field",
    "cage",
    "grain",
    "vegetable",
    "sheep",
    "pig",
    "cow",
    "blank",
    "fencedCowshed",
    "mudHouse",
    "stoneHouse",
    "family",
    "begging",
  ];

  // 색상을 유저 인덱스에 따라 설정
  const getColorByIndex = (index) => {
    switch (index) {
      case 0:
        return "red";
      case 1:
        return "blue";
      case 2:
        return "green";
      case 3:
        return "orange";
      default:
        return "black";
    }
  };

  const images = [
    fieldImg,
    cageImg,
    grainImg,
    vegitableImg,
    sheepImg,
    pigImg,
    cowImg,
    blankImg,
    fencedCowshedImg,
    mudHouseImg,
    stoneHouseImg,
    familyBlueImg,
    beggingImg,
  ];

    // 순위를 계산하는 함수
    const calculateRanks = () => {
      const sortedScores = [...score].sort((a, b) => b.score - a.score);
      return score.map((s) => ({
        ...s,
        rank: sortedScores.findIndex((sortedScore) => sortedScore.memberId === s.memberId) + 1,
      }));
    };
  
    const rankedScores = calculateRanks();
    

  // 방의 번호를 useState와 Cookie에 저장한다.
  const onClickLobbyroom = () => {
    navigate('/');  // navigate to the Lobby page
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>점수 현황</div>
      <div className={styles.box}>
        <div className={styles.box1}>
          {column.map((col, index) => (
            <div key={index} className={styles.box11}>
              {col}
            </div>
          ))}
          <div className={styles.box12}>합계</div>
          <div className={styles.box12}>순위</div> {/* 순위 컬럼 추가 */}
        </div>
        {rankedScores.map((item, index) => {
          const idStyle = { color: getColorByIndex(index) };
          return (
            <div key={index} className={styles.box2}>
              <div className={styles.box21} style={idStyle}>
                User{item.memberId}
              </div>
              {keys.map((key, idx) => (
                <div key={idx} className={styles.box21}>
                  <div className={styles.box211}>
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {}
                    </div>
                    <div
                      style={{
                        width: "50%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={images[idx]}
                        alt={key}
                        style={{ height: "70%" }}
                      />
                    </div>
                  </div>
                  <div className={styles.box211}>{item[key]}</div>
                </div>
              ))}
              <div className={styles.box21}>{score[index].card}</div>
              <div className={styles.box21}>{score[index].extra}</div>
              <div className={styles.box22}>{score[index].score}</div>
              <div className={styles.box22}>{item.rank}등</div> {/* 순위 표시 */}
            </div>
            
          );
        })}
      </div>
      <button className={styles.close} onClick={onClickLobbyroom}>종료하기</button>
    </div>
  );
}

export default ScoreBoard;
