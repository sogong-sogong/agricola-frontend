import React, { useEffect, useState } from "react";
import styles from "./FoodExchangeBoard.module.css";

import { initialUserResources } from "./resources";

import foodIcon from "../assets/image/food.png";
import seedIcon from "../assets/image/seed.png";
import vegetableIcon from "../assets/image/vegetable.png";

function FoodExchangeBoard({
  inquiryUserStorage,
  memberId,
  closeFoodExchange,
  currentShowUser,
  myID,
  sendUserData,
}) {
  const [countFood, setCountFood] = useState(0);
  const [countGrain, setCountGrain] = useState(0);
  const [countVegitable, setCountVegitable] = useState(0);

  const [data, setData] = useState({
    food: 0,
    grain: 0,
    vegetable: 0,
    family: 0,
  });

  const minus = (func) => {
    func((prev) => prev - 1);
  };

  const plus = (func) => {
    func((prev) => prev + 1);
  };

  const clickButton = async () => {
    console.log("update food");
    const data = await inquiryUserStorage({ id: memberId, update: false });
    let doUpdate = false;
    if (currentShowUser === 0 || currentShowUser === myID) {
      doUpdate = true;
    }
    sendUserData({
      data: {
        food: data.food + countFood,
        grain: data.grain + countGrain,
        vegetable: data.vegetable + countVegitable,
      },
      update: doUpdate,
    });
    closeFoodExchange();
  };

  const test = async () => {
    const data = await inquiryUserStorage({ id: memberId, update: false });
    setData(data);
  };

  useEffect(() => {
    const test = async () => {
      const data = await inquiryUserStorage({ id: memberId, update: false });
      setData(data);
    };
    test();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title} onClick={test}>
        식량 교환
      </div>

      <div className={styles.box1}>
        <div className={styles.box11}>구걸하기</div>
        <div className={styles.box12}></div>
        <div className={styles.box13}>나의 보유량</div>
      </div>
      <div className={styles.box2}>
        <div className={styles.box21}>
          <div className={styles.box22}>
            식량
            <img src={foodIcon} alt="food" className={styles.image} />
          </div>
          <div className={styles.box22}>
            <div
              className={styles.minusplus}
              onClick={() => {
                minus(setCountFood);
              }}
            >
              -
            </div>
            <div>{countFood}</div>
            <div
              className={styles.minusplus}
              onClick={() => {
                plus(setCountFood);
              }}
            >
              +
            </div>
          </div>
          <div className={styles.box22}>{data.food}</div>
        </div>
        <div className={styles.box21}>
          <div className={styles.box22}>
            곡식
            <img src={seedIcon} alt="food" className={styles.image} />
          </div>
          <div className={styles.box22}>
            <div
              className={styles.minusplus}
              onClick={() => {
                minus(setCountGrain);
              }}
            >
              -
            </div>
            <div>{countGrain}</div>
            <div
              className={styles.minusplus}
              onClick={() => {
                plus(setCountGrain);
              }}
            >
              +
            </div>
          </div>
          <div className={styles.box22}>{data.grain}</div>
        </div>
        <div className={styles.box21}>
          <div className={styles.box22}>
            채소
            <img src={vegetableIcon} alt="food" className={styles.image} />
          </div>
          <div className={styles.box22}>
            <div
              className={styles.minusplus}
              onClick={() => {
                minus(setCountVegitable);
              }}
            >
              -
            </div>
            <div>{countVegitable}</div>
            <div
              className={styles.minusplus}
              onClick={() => {
                plus(setCountVegitable);
              }}
            >
              +
            </div>
          </div>
          <div className={styles.box22}>{data.vegetable}</div>
        </div>
      </div>
      <div className={styles.box3}>
        <img src={foodIcon} alt="food" className={styles.image} />
        {data.food + countFood}/{data.family * 2}
      </div>
      <div className={styles.box4}>
        <div className={styles.button} onClick={clickButton}>
          완료
        </div>
      </div>
    </div>
  );
}

export default FoodExchangeBoard;
