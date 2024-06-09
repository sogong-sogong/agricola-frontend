import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Stomp } from "@stomp/stompjs";
import styles from "./Lobby.module.css";

import userImage from "../assets/icons/user.png";

import { useResources } from "../context/ResourceContext";

function Lobby({ ipAddress, portNum }) {
  const { stompClient, roomnumber, setRoomnumber, memberId, setMemberId } =
    useResources();

  const [roomnum, setRoomnum] = useState(); // 방 번호를 저장할 임시 변수
  const [membernum, setMembernum] = useState();
  const [rooms, setRooms] = useState([]); // 전체 방 목록을 저장할 상태
  const navigate = useNavigate();

  stompClient.current = Stomp.over(
    () => new WebSocket(`ws://${ipAddress}:${portNum}/ws-stomp`)
  );

  // 방 만들기 버튼을 누르면 실행되는 함수
  // 방의 번호를 useState와 Cookie에 저장한다.
  const onClickMakeRoom = async () => {
    // 방 생성 API 호출
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://${ipAddress}:${portNum}/room/create`
        );
        return res.data;
      } catch (error) {
        console.error("Error creating room:", error);
        return null;
      }
    };

    const data = await fetchData();
    if (data && data.roomId) {
      setRoomnum(data.roomId);
      //Cookies.set("roomnumber", data.roomId);
      createMemberId();
    }
  };

  // 방 목록에서 선택한 방에 입장한다.
  const onClickEnterGameRoom = (room) => {
    setRoomnum(room.roomId);
    //Cookies.set("roomnumber", room.roomId);
    createMemberId();
  };

  // 멤버 Id를 생성하고 Cookie에 저장하는 함수.
  const createMemberId = async () => {
    // 사용자 생성 API 호출
    const fetchDataEnterRoom = async () => {
      try {
        const res = await axios.get(
          `http://${ipAddress}:${portNum}/member/create`
        );
        return res.data;
      } catch (error) {
        console.error("Error", error);
        return null;
      }
    };
    const data = await fetchDataEnterRoom();
    //Cookies.set("memberId", data.memberId);
    setMembernum(data.memberId);
  };

  // 컴포넌트 마운트 시 모든 방 조회하여 useState에 저장한다.
  useEffect(() => {
    // 모든 방 조회 API 호출
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://${ipAddress}:${portNum}/room/all`);
        return res.data;
      } catch (error) {
        console.error("Error fetching all rooms:", error);
        return null;
      }
    };
    // 방 정보를 useState에 저장
    const fetchRooms = async () => {
      const data = await fetchData();
      if (data) {
        setRooms(data);
      }
    };

    fetchRooms();
  }, []);

  // roomnumber 초기화
  useEffect(() => {
    setRoomnumber(null);
    setMemberId(null);
  }, []);

  // roomnumber가 변경되었을 때 해당 경로로 이동한다.
  useEffect(() => {
    if (roomnum && !roomnumber && membernum && !memberId) {
      setRoomnumber(roomnum);
      setMemberId(membernum);
      navigate(`/main/${roomnum}`);
    }
  }, [roomnum, membernum, navigate]);

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
