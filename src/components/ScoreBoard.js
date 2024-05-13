import React from "react";

import styles from "./ScoreBoard.module.css";

function ScoreBoard() {
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const data1 = [
    {
      user: "유저1",
      field: 0,
      cage: 0,
      grain: 0,
      vegetable: 0,
      sheep: 0,
      boar: 0,
      cow: 0,
      blank: 0,
      fencedBarn: 0,
      dirtHouse: 0,
      stoneHouse: 0,
      family: 0,
      beggingCard: 0,
      cardScore: 0,
      extraPoints: 0,
    },
    {
      user: "유저2",
      field: 0,
      cage: 0,
      grain: 0,
      vegetable: 0,
      sheep: 0,
      boar: 0,
      cow: 0,
      blank: 0,
      fencedBarn: 0,
      dirtHouse: 0,
      stoneHouse: 0,
      family: 0,
      beggingCard: 0,
      cardScore: 0,
      extraPoints: 0,
    },
    {
      user: "유저3",
      field: 0,
      cage: 0,
      grain: 0,
      vegetable: 0,
      sheep: 0,
      boar: 0,
      cow: 0,
      blank: 0,
      fencedBarn: 0,
      dirtHouse: 0,
      stoneHouse: 0,
      family: 0,
      beggingCard: 0,
      cardScore: 0,
      extraPoints: 0,
    },
    {
      user: "유저4",
      field: 0,
      cage: 0,
      grain: 0,
      vegetable: 0,
      sheep: 0,
      boar: 0,
      cow: 0,
      blank: 0,
      fencedBarn: 0,
      dirtHouse: 0,
      stoneHouse: 0,
      family: 0,
      beggingCard: 0,
      cardScore: 0,
      extraPoints: 0,
    },
  ];

  return (
    <div className={styles.container}>
      점수 현황
      <div className={styles.box}>
        <div className={styles.box1}>
          {column.map((data, index) => (
            <div className={styles.box11}>{data}</div>
          ))}
          <div className={styles.box12}>합계</div>
        </div>
        {[...Array(4)].map((_, index) => (
          <div className={styles.box2}>
            {data[index].user}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {data.map((_, index) => (
                <div>dd</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScoreBoard;
