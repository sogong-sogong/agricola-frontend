import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import styles from "./Main.module.css";

import ActBoard from "../components/ActBoard";
import HomeBoard from "../components/HomeBoard";
import CardBoard from "../components/CardBoard";
import LogBoard from "../components/LogBoard";

function Main() {
  const [roomnumber, setRoomnumber] = useState();

  // 컴포넌트가 마운트될 때 쿠키에서 방 번호를 가져온다.
  useEffect(() => {
    const savedRoomNumber = Cookies.get("roomnumber");
    if (savedRoomNumber) {
      setRoomnumber(savedRoomNumber);
    }
  }, []);

  // 방 이름을 출력한다.
  useEffect(() => {
    if (roomnumber) {
      console.log(roomnumber);
    }
  }, [roomnumber]);

  return (
    <div className={styles.container}>
      <div className={styles.leftBoard}>
        <div className={styles.header}>
          <div className={styles.text}>ROOM #{roomnumber}</div>
        </div>
        <div className={styles.gameBoard}>
          <div className={styles.actBoard}>
            <ActBoard />
          </div>
          <div className={styles.rightBoard}>
            <div className={styles.homeBoard}>
              <HomeBoard />
            </div>
            <div className={styles.cardBoard}>
              <CardBoard />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.logBoard}>
        <LogBoard />
      </div>
    </div>
  );
}

export default Main;
