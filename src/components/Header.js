import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import styles from "./Header.module.css";

function Header() {
  const [roomnumber, setRoomnumber] = useState();

  // 컴포넌트가 마운트될 때 쿠키에서 방 번호를 가져온다.
  useEffect(() => {
    const savedRoomNumber = Cookies.get("roomnumber");
    if (savedRoomNumber) {
      setRoomnumber(savedRoomNumber);
    }
  }, []);

  useEffect(() => {
    if (roomnumber) {
      console.log(roomnumber);
    }
  }, [roomnumber]);

  return (
    <div className={styles.container}>
      <div className={styles.text}>ROOM #{roomnumber}</div>
    </div>
  );
}

export default Header;
