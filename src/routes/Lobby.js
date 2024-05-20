import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import styles from "./Lobby.module.css";

import userImage from "../assets/icons/user.png";

function Lobby() {
  const [roomnumber, setRoomnumber] = useState();
  const [rooms, setRooms] = useState([]); // 전체 방 목록을 저장할 상태
  const navigate = useNavigate();

  // 방 생성 API 호출 함수
  const fetchDataCreateRoom = async () => {
    try {
      const res = await axios.get("http://52.78.128.39:8080/room/create");
      return res.data;
    } catch (error) {
      console.error("Error creating room:", error);
      return null;
    }
  };

  // 모든 방 조회 API 호출 함수
  const fetchDataAllRooms = async () => {
    try {
      const res = await axios.get("http://52.78.128.39:8080/room/all");
      return res.data;
    } catch (error) {
      console.error("Error fetching all rooms:", error);
      return null;
    }
  };

  // 방 만들기 버튼을 누르면 실행되는 함수
  const onClickMakeRoom = async () => {
    const data = await fetchDataCreateRoom();
    if (data && data.roomId) {
      setRoomnumber(data.roomId);
      Cookies.set("roomnumber", data.roomId);
    }
  };

  // 선택한 방에 입장한다.
  const onClickEnterGameRoom = (room) => {
    setRoomnumber(room.roomId);
    Cookies.set("roomnumber", room.roomId);
  };

  // 컴포넌트 마운트 시 모든 방 조회
  useEffect(() => {
    const fetchRooms = async () => {
      const data = await fetchDataAllRooms();
      if (data) {
        setRooms(data);
      }
    };

    fetchRooms();
    //console.log(rooms);
  }, []);

  // roomnumber가 변경되었을 때 링크로 이동
  useEffect(() => {
    if (roomnumber) {
      navigate(`/main/${roomnumber}`);
    }
  }, [roomnumber, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerText}>AGRICOLA</div>
      </div>
      <div className={styles.body}>
        <div className={styles.roomlist}>
          <div className={styles.listName}>전체 방</div>
          <div className={styles.scrollableList}>
            {rooms
              .reduce((acc, room, index) => {
                if (index % 2 === 0) {
                  acc.push(rooms.slice(index, index + 2));
                }
                return acc;
              }, [])
              .map((roomPair, index) => (
                <div key={index} className={styles.row}>
                  {roomPair.map((room) => (
                    <div
                      key={room.roomId}
                      className={styles.list}
                      onClick={() => onClickEnterGameRoom(room)}
                    >
                      <div className={styles.roomnum}>ROOM #{room.roomId}</div>
                      <div className={styles.usernum}>
                        {room.number}/4 <img src={userImage} alt="Icon" />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
        <div className={styles.startbox}>
          <div className={styles.startbtn}>
            <div className={styles.button} onClick={onClickMakeRoom}>
              방만들기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lobby;
