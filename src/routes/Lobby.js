import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import styles from "./Lobby.module.css";

function Lobby() {
  const [roomnumber, setRoomnumber] = useState();
  const navigate = useNavigate();

  // 방 생성 API 호출 함수
  const fetchData = async () => {
    try {
      const res = await axios.get("http://52.78.128.39:8080/room/create");
      return res.data;
    } catch (error) {
      console.error("Error creating room:", error);
      return null;
    }
  };

  // 방 만들기 버튼을 누르면 실행되는 함수
  const onClickMakeRoom = async () => {
    const data = await fetchData();
    if (data && data.roomId) {
      setRoomnumber(data.roomId);
      Cookies.set("roomnumber", data.roomId);
    }
  };

  // roomnumber가 변경되었을 때 링크로 이동
  useEffect(() => {
    if (roomnumber) {
      navigate(`/main/${roomnumber}`);
    }
  }, [roomnumber, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>AGRICOLA</div>
      <div className={styles.body}>
        <div className={styles.roomlist}>
          <div className={styles.list}></div>
        </div>
        <div className={styles.startbtn} onClick={onClickMakeRoom}>
          <div className={styles.button}>방만들기</div>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
