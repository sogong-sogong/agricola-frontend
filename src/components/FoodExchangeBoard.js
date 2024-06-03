import React, { useState } from "react";
import styles from "./FoodExchangeBoard.module.css";

import { initialUserResources } from "./resources";

function FoodExchangeBoard() {
  const clickButton = () => {
    console.log("update food");
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>식량 교환</div>

      <div className={styles.box1}>
        <div className={styles.box11}>구걸하기</div>
        <div className={styles.box12}></div>
        <div className={styles.box13}>나의 보유량</div>
      </div>
      <div className={styles.box2}>
        <div className={styles.box21}>
          <div className={styles.box22}>식량</div>
          <div className={styles.box22}></div>
          <div className={styles.box22}></div>
        </div>
        <div className={styles.box21}>
          <div className={styles.box22}>곡식</div>
          <div className={styles.box22}></div>
          <div className={styles.box22}></div>
        </div>
        <div className={styles.box21}>
          <div className={styles.box22}>채소</div>
          <div className={styles.box22}></div>
          <div className={styles.box22}></div>
        </div>
      </div>
      <div className={styles.box3}>0/8</div>
      <div className={styles.box4}>
        <div className={styles.button} onClick={clickButton}>
          완료
        </div>
      </div>
    </div>
  );
}

export default FoodExchangeBoard;
