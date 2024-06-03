import React, { useState } from "react";
import styles from "./ScoreBoard.module.css";

import { initialUserResources } from "./resources";

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
  // UseState변수에 데이터 저장하며 반영

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

  const data = [
    {
      id: 1,
      score: 0,
      field: 0,
      cage: 0,
      grain: 0,
      vegetable: 0,
      sheep: 0,
      pig: 0,
      cow: 0,
      blank: 0,
      fenced_cowshed: 0,
      mud_house: 0,
      stone_house: 0,
      family: 0,
      begging: 0,
      card: 0,
      extra: 0,
    },
    {
      id: 2,
      score: 0,
      field: 0,
      cage: 0,
      grain: 0,
      vegetable: 0,
      sheep: 0,
      pig: 0,
      cow: 0,
      blank: 0,
      fenced_cowshed: 0,
      mud_house: 0,
      stone_house: 0,
      family: 0,
      begging: 0,
      card: 0,
      extra: 0,
    },
    {
      id: 3,
      score: 0,
      field: 0,
      cage: 0,
      grain: 0,
      vegetable: 0,
      sheep: 0,
      pig: 0,
      cow: 0,
      blank: 0,
      fenced_cowshed: 0,
      mud_house: 0,
      stone_house: 0,
      family: 0,
      begging: 0,
      card: 0,
      extra: 0,
    },
    {
      id: 4,
      score: 0,
      field: 0,
      cage: 0,
      grain: 0,
      vegetable: 0,
      sheep: 0,
      pig: 0,
      cow: 0,
      blank: 0,
      fenced_cowshed: 0,
      mud_house: 0,
      stone_house: 0,
      family: 0,
      begging: 0,
      card: 0,
      extra: 0,
    },
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
    "fenced_cowshed",
    "mud_house",
    "stone_house",
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
        </div>
        {data.map((item, index) => {
          const idStyle = { color: getColorByIndex(index) };
          return (
            <div key={index} className={styles.box2}>
              <div className={styles.box21} style={idStyle}>
                User{data[index].id}
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
                      {data[index][key]}
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
                  <div className={styles.box211}>{data[index][key]}</div>
                </div>
              ))}
              <div className={styles.box21}>{data[index].card}</div>
              <div className={styles.box21}>{data[index].extra}</div>
              <div className={styles.box22}>sum</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScoreBoard;
